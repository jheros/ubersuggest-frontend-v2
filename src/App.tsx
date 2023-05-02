import UberRouter from './routes';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AppProvider } from './context';

import './App.css';

function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage('fr');
  };

  return (
    <AppProvider>
      <UberRouter />

      <div className='App'>
        <header className='App-header'>
          <p>{t('achievable_kw_beta_tooltip')}</p>
          <button onClick={toggleLanguage}>Toggle Language</button>
        </header>
      </div>
    </AppProvider>
  );
}

export default App;
