import { createContext, useCallback, useContext, useState, ReactNode } from 'react';

interface IAppContext {
  isSignIn: boolean;
  languageCode: string;
}

type IAppDispatchContext = (values: Partial<IAppContext>) => void;

interface IAppProvider {
  children?: ReactNode;
}

const initialApp: IAppContext = {
  isSignIn: false,
  languageCode: 'en',
};
const initialAppDispatch: IAppDispatchContext = () => {};

const AppContext = createContext(initialApp);
const AppDispatchContext = createContext(initialAppDispatch);

const AppProvider = ({ children }: IAppProvider) => {
  const [values, setValues] = useState(initialApp);

  const updateValues = useCallback((newValues: Partial<IAppContext>) => {
    setValues((prevValues: IAppContext) => ({ ...prevValues, ...newValues }));
  }, []);

  return (
    <AppContext.Provider value={values}>
      <AppDispatchContext.Provider value={updateValues}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);
const useAppDispatchContext = () => useContext(AppDispatchContext);

export { AppProvider, useAppContext, useAppDispatchContext };
