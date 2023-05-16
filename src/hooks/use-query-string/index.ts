import { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import { isEqual } from 'lodash';
// Types
import { IQuery, IObjKeys, IUseQueryString, IResult } from './types';

/**
 * Returns new object with keys from params
 * @param {Object} obj an object that should be filtered
 * @param {Object} tabKeys an object where a prop is the name of the query,
 * the value of prop is a string or an array of strings
 * @param {Object} listKeys an array with strings, that shouldn't be removed
 * from URL and can keep any values
 */
const pick = (obj: IObjKeys, tabKeys: IObjKeys | null, listKeys: string[] | null): IObjKeys => {
  const keys = tabKeys ? Object.keys(tabKeys) : [];
  let filtered: IObjKeys = {};
  if (Array.isArray(keys) && keys.length) {
    filtered = keys.reduce((acc: IObjKeys, key) => {
      if (tabKeys && tabKeys[key]?.length && obj[key]) {
        if (Array.isArray(obj[key]) && obj[key]?.length) {
          for (let i = 0; i < obj[key].length; i += 1) {
            if (tabKeys[key].indexOf(obj[key][i].toString()) !== -1) {
              acc[key] = obj[key][i];
              break;
            }
          }
        } else if (tabKeys[key].indexOf(obj[key].toString()) !== -1) {
          acc[key] = obj[key];
        }
      }
      return acc;
    }, {});
  }

  if (Array.isArray(listKeys)) {
    filtered = {
      ...filtered,
      ...listKeys.reduce((acc: IObjKeys, key) => {
        if (obj[key]) {
          if (Array.isArray(obj[key]) && obj[key]?.length)
            // eslint-disable-next-line prefer-destructuring
            acc[key] = obj[key][0];
          else acc[key] = obj[key];
        }
        return acc;
      }, {}),
    };
  }

  return filtered;
};

/**
 * Returns a new object without the key param
 * @param {String} key that sould be removed
 * @param {Object} obj an object that should be filtered
 */
const omitSingle = (key: string, { [key]: _, ...obj }) => obj;

/**
 * Returns a new object without keys param
 * @param {Array} keys that sould be removed
 * @param {Object} obj an object that should be filtered
 */
const omitMultiple = (keys: string[], obj: IObjKeys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

const update = (path: string) => {
  window.history.pushState(null, document.title, path);
};

const initParseOptions = {
  parseNumbers: false,
  parseBooleans: false,
};

/**
 * @param {Array} tabKeys an object with queries
 * @param {Object} listKeys an array with strings, that shouldn't be removed
 * from URL and can keep any values
 * @param {Object} parseOptions an object with pars options
 * @param {Object} initValues an object with initial values of queries
 * @returns {Array} [query, querySet, queryRemove]
 * Hook for functional component returns a cortege
 * @param {Object} query an object with queries in url
 * @param {Function} querySet a function to change queries
 * @param {Function} queryRemove a function to remove queries
 */
const useQueryString = ({
  location,
  tabKeys = null,
  listKeys = null,
  parseOptions = initParseOptions,
  initValues = null,
}: IUseQueryString): IResult => {
  const isFirst = useRef(true);
  const loc = location || window.location;
  const [query, setQuery] = useState<IQuery>({
    ...(queryString.parse(loc.search, parseOptions) as IQuery),
  });

  const { pathname } = loc;

  useEffect(() => {
    if (!tabKeys && !listKeys) {
      setQuery(query);
      return;
    }
    const state = pick(query, tabKeys, listKeys);
    if (initValues && isEqual(state, initValues)) setQuery({});
    else setQuery(state as IQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirst.current) isFirst.current = false;
    else {
      const queryStr = queryString.stringify(query);
      update(`${pathname}${queryStr ? '?' : ''}${queryStr}`);
    }
  }, [pathname, query]);

  const queryRemove = (keys: string | string[] | null) => {
    setQuery((prev: IQuery) => {
      if (keys === null) return {}; // short form to clear all queries
      if (Array.isArray(keys) && keys.length) return omitMultiple(keys, prev);
      if (typeof keys === 'string' && keys) return omitSingle(keys, prev);
      return prev;
    });
  };

  const querySet = (values: IQuery) => {
    const nextState = tabKeys || listKeys ? pick(values, tabKeys, listKeys) : values;
    if (isEqual(nextState, initValues)) queryRemove(null);
    else setQuery((prev: IQuery) => ({ ...prev, ...(nextState as IQuery) }));
  };

  return { query, querySet, queryRemove };
};

export default useQueryString;
