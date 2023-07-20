import * as amplitude from '@amplitude/analytics-browser'

export const setAmplitudeUserId = (userId: string) => {
  amplitude.setUserId(userId)
}

export const resetAmplitudeDevice = () => {
  amplitude.reset()
}

export const sendAmplitudeData = (eventType: string, eventProperties: any) => {
  amplitude.logEvent(eventType, eventProperties)
}

export const title = (str: string) => {
  return str
    .toLowerCase()
    .split('_')
    .map(function (word) {
      return word[0].toUpperCase() + word.substr(1)
    })
    .join(' ')
}

amplitude.init(process.env.REACT_APP_AMPLITUDE_API_KEY || '')
