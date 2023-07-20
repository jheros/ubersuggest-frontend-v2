export const KISSMETRICS_TRACK_EVENTS = {
  dashboard: 'viewed dashboard',
}

export const PROPERTY_NAMES = {
  action: 'action', // example
}

export const PROPERTY_VALUES = {
  exit_intent: 'exit intent', // example
}

export const setKissmetricsAliasing = (id: string) => {
  window._kmq = window._kmq || []
  window._kmq.push(['identify', id])
}

export const recordKissmetricsEvent = (eventName: string, property: any) => {
  window._kmq = window._kmq || []
  window._kmq.push(['record', eventName, property])
}
