import { renderHook, act } from '@testing-library/react'
import useQueryString from '.'

const locationInit = {
  pathname: '/home',
  search: '?tab=drafts',
}

describe('useQueryString', () => {
  const originalWindowLocation = window.location
  test('should return a query from location.search with default props', () => {
    const expectedResult = { tab: 'drafts' }
    const { result } = renderHook(() =>
      useQueryString({
        location: { ...originalWindowLocation, ...locationInit },
      }),
    )
    expect(result.current.query).toMatchObject(expectedResult)
    expect(result.current.query.tab).toEqual(expectedResult.tab)
  })

  test('should return an empty object if query === initValues', () => {
    const expectedResult = {}
    const { result } = renderHook(() =>
      useQueryString({
        location: { ...originalWindowLocation, ...locationInit },
        tabKeys: {
          tab: ['scheduled', 'drafts'],
        },
        initValues: {
          tab: 'drafts',
        },
      }),
    )
    expect(result.current.query).toMatchObject(expectedResult)
    expect(result.current.query.tab).toBeUndefined()
  })

  test('should remove query if tabKeys does not include it', () => {
    const expectedResult = {
      tab: 'drafts',
      page: 'home',
    }
    const location = {
      ...locationInit,
      search: '?tab=drafts&test=wrong&page=home',
    }
    const { result } = renderHook(() =>
      useQueryString({
        location: { ...originalWindowLocation, ...location },
        tabKeys: {
          tab: ['scheduled', 'drafts'],
          page: ['home'],
        },
      }),
    )
    expect(result.current.query).toMatchObject(expectedResult)
    expect(result.current.query.tab).toEqual(expectedResult.tab)
    expect(result.current.query.page).toEqual(expectedResult.page)
    expect(result.current.query.test).toBeUndefined()
  })

  describe('should return first right value from the same queries', () => {
    test('should return drafts', () => {
      const expectedResult = {
        tab: 'drafts',
      }
      const location = {
        ...locationInit,
        search: '?tab=wrong&tab=drafts&tab=scheduled',
      }
      const { result } = renderHook(() =>
        useQueryString({
          location: { ...originalWindowLocation, ...location },
          tabKeys: {
            tab: ['scheduled', 'drafts'],
          },
        }),
      )
      expect(result.current.query).toMatchObject(expectedResult)
      expect(result.current.query.tab).toEqual(expectedResult.tab)
    })
    test('should return scheduled', () => {
      const expectedResult = {
        tab: 'scheduled',
      }
      const location = {
        ...locationInit,
        search: '?tab=wrong&tab=scheduled&tab=drafts',
      }
      const { result } = renderHook(() =>
        useQueryString({
          location: { ...originalWindowLocation, ...location },
          tabKeys: {
            tab: ['scheduled', 'drafts'],
          },
        }),
      )
      expect(result.current.query).toMatchObject(expectedResult)
      expect(result.current.query.tab).toEqual(expectedResult.tab)
    })
  })

  test('should change the query', () => {
    const initResult = { tab: 'drafts' }
    const changeValue = { tab: 'home', label: 'label' }
    const location = { ...locationInit }
    const { result } = renderHook(() =>
      useQueryString({
        location: { ...originalWindowLocation, ...location },
      }),
    )
    expect(result.current.query).toMatchObject(initResult)
    expect(result.current.query.tab).toEqual(initResult.tab)
    act(() => {
      result.current.querySet(changeValue)
    })
    expect(result.current.query).toMatchObject(changeValue)
    expect(result.current.query.tab).toEqual(changeValue.tab)
    expect(result.current.query.label).toEqual(changeValue.label)
  })

  describe('should remove the query', () => {
    let result: any = {}
    beforeEach(() => {
      const initResult = { page: 'home', tab: 'scheduled', label: 'label' }
      const location = {
        ...locationInit,
        search: '?page=home&tab=scheduled&label=label',
      }

      const view = renderHook(() =>
        useQueryString({
          location: { ...originalWindowLocation, ...location },
        }),
      )
      result = view.result
      expect(result.current.query).toMatchObject(initResult)
      expect(result.current.query.page).toEqual(initResult.page)
      expect(result.current.query.tab).toEqual(initResult.tab)
    })

    test('should return an empty object by null as param', () => {
      const expectedResult = {}
      act(() => {
        result.current.queryRemove(null)
      })
      expect(result.current.query).toMatchObject(expectedResult)
      expect(result.current.query.tab).toBeUndefined()
      expect(result.current.query.page).toBeUndefined()
      expect(result.current.query.label).toBeUndefined()
    })

    test('should remove single query by string', () => {
      const expectedResult = { tab: 'scheduled', label: 'label' }
      act(() => {
        result.current.queryRemove('page')
      })
      expect(result.current.query).toMatchObject(expectedResult)
      expect(result.current.query.label).toEqual(expectedResult.label)
      expect(result.current.query.tab).toEqual(expectedResult.tab)
      expect(result.current.query.page).toBeUndefined()
    })

    test('should remove multiply query by array', () => {
      const expectedResult = { label: 'label' }
      act(() => {
        result.current.queryRemove(['page', 'tab'])
      })
      expect(result.current.query).toMatchObject(expectedResult)
      expect(result.current.query.label).toEqual(expectedResult.label)
      expect(result.current.query.page).toBeUndefined()
      expect(result.current.query.tab).toBeUndefined()
    })
  })

  test('should allow only queries from listKeys array', () => {
    const initResult = { tab: 'scheduled', label: 'label' }
    const location = {
      ...locationInit,
      search: '?page=main&tab=scheduled&label=label&index=1',
    }
    const { result } = renderHook(() =>
      useQueryString({
        location: { ...originalWindowLocation, ...location },
        tabKeys: {
          tab: ['scheduled', 'drafts'],
          page: ['home', 'contacts'],
        },
        listKeys: ['label'],
      }),
    )
    expect(result.current.query).toMatchObject(initResult)
    expect(result.current.query.tab).toEqual(initResult.tab)
    expect(result.current.query.label).toEqual(initResult.label)
    expect(result.current.query.page).toBeUndefined()
  })

  test('should keep queries from tabKeys and listKeys', () => {
    const initResult = { page: 'home', tab: 'scheduled' }
    const location = {
      ...locationInit,
      search: '?page=home&tab=scheduled&label=label',
    }
    const { result } = renderHook(() =>
      useQueryString({
        location: { ...originalWindowLocation, ...location },
        listKeys: ['page', 'tab'],
      }),
    )
    expect(result.current.query).toMatchObject(initResult)
    expect(result.current.query.page).toEqual(initResult.page)
    expect(result.current.query.tab).toEqual(initResult.tab)
    expect(result.current.query.label).toBeUndefined()
  })

  test('should return first value of listKeys item if we have some', () => {
    const initResult = { page: 'home' }
    const location = {
      ...locationInit,
      search: '?page=home&page=contacts&label=label',
    }
    const { result } = renderHook(() =>
      useQueryString({
        location: { ...originalWindowLocation, ...location },
        listKeys: ['page'],
      }),
    )
    expect(result.current.query).toMatchObject(initResult)
    expect(result.current.query.page).toEqual(initResult.page)
    expect(result.current.query.label).toBeUndefined()
  })
})
