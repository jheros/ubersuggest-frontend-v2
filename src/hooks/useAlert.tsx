import { useState } from 'react'

import { Alert } from '@ubersuggest/common-ui'
import { DEFAULT_ALERT_TIMEOUT } from 'configs'
import { reject, uniqueId } from 'lodash'

export interface IAlert {
  id?: string
  severity?: 'error' | 'warning' | 'info' | 'success'
  variant?: 'outlined' | 'filled' | 'standard'
  icon?: React.ReactNode | false
  title?: string
  message: string | React.ReactNode
}

export interface IAlertSettings {
  autoClose?: boolean
  transition?: 'fade' | 'collapse'
  timeout?: number
  transitionTimeout?: number
}

interface IUseAlertMethods {
  addAlert?: (alert: IAlert) => void
  removeAlert?: (id: string) => void
  renderAlerts?: (alerts: IAlert[]) => void
}

export const useAlert = (settings: IAlertSettings = {}): Array<IUseAlertMethods | Array<IAlert> | any> => {
  const { timeout = DEFAULT_ALERT_TIMEOUT, ...otherSettings } = settings
  const [alerts, setAlerts] = useState<IAlert[]>([])

  const addAlert = (alert: IAlert) => {
    const id = alert.id || uniqueId()
    setAlerts((alerts) => [...alerts, { ...alert, id }])
  }

  const removeAlert = (id: string) => {
    setAlerts((alerts) => reject(alerts, { id: id }))
  }

  const renderAlerts = (_alerts: IAlert[]) => {
    return (
      <>
        {_alerts.map(({ id = '', message, ...props }) => (
          <Alert
            key={`alert-${id}`}
            {...props}
            timeout={timeout}
            {...otherSettings}
            onClose={() => {
              removeAlert(id)
            }}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        ))}
      </>
    )
  }

  return [alerts, { addAlert, removeAlert, renderAlerts } as IUseAlertMethods]
}
