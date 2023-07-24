import React, { createContext, ReactNode, useContext } from 'react'

import { IAlert, IAlertSettings, useAlert } from 'hooks'

export interface IAlertContext {
  addAlert: (alert: IAlert) => void
  removeAlert: (id: string) => void
}

interface IAlertProvider extends IAlertSettings {
  children?: React.ReactNode | typeof React.Children | undefined
}

export const AlertContext = createContext<IAlertContext>({
  addAlert: () => {},
  removeAlert: () => {},
})

export const useAlertContext = () => useContext(AlertContext)

export const AlertProvider = ({ children, ...settings }: IAlertProvider) => {
  const [alerts, { addAlert, removeAlert, renderAlerts }] = useAlert(settings)

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {renderAlerts(alerts)}
      {children}
    </AlertContext.Provider>
  )
}
