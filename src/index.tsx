import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Provider } from 'react-redux'

import { lightTheme, ThemeInheritor } from '@ubersuggest/common-ui'
import '@ubersuggest/common-ui/dist/styles/style.css'
import 'languages/i18n'
import 'styles/index.scss'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'

declare global {
  interface Window {
    _kmq: any
    _hsq: any
  }
}

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
