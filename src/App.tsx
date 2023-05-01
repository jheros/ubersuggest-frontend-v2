import { useTranslation } from 'react-i18next';

import './App.css';

function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage('fr');
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{t('achievable_kw_beta_tooltip')}</p>
        <button onClick={toggleLanguage}>Toggle Language</button>
      </header>
    </div>
  );
}

export default App;
