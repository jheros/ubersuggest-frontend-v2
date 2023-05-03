export type IInitParseOptions = {
  parseNumbers?: boolean;
  parseBooleans?: boolean;
};

export type IQuery = {
  [key: string]: string;
};

export type IObjKeys = {
  [key: string]: string | string[];
};

export interface IUseQueryString {
  location?: Location;
  tabKeys?: IObjKeys | null;
  listKeys?: string[] | null;
  parseOptions?: IInitParseOptions;
  initValues?: IObjKeys | null;
}

export type IResult = {
  query: IQuery;
  querySet: (values: IQuery) => void;
  queryRemove: (keys: string | string[] | null) => void;
};
