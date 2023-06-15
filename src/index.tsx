import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { lightTheme, ThemeInheritor } from '@ubersuggest/common-ui'

import 'react-perfect-scrollbar/dist/css/styles.css'
import 'languages/i18n'
import 'styles/index.scss'
import '@ubersuggest/common-ui/dist/styles/style.css'

import App from './App'
import { store } from './store'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeInheritor theme={lightTheme}>
        <App />
      </ThemeInheritor>
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
