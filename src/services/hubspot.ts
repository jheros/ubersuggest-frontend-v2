class HubSpotService {
  static _hubSpot: HubSpotService

  static get instance() {
    if (!this._hubSpot) {
      this._hubSpot = new this()
    }

    return this._hubSpot
  }

  isHsOptOut = () =>
    document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)__hs_opt_out\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    ) === 'yes'

  getHutk = () =>
    this.isHsOptOut()
      ? null
      : document.cookie.replace(
          // eslint-disable-next-line no-useless-escape
          /(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/,
          '$1',
        )

  getHubSpotQuery = () => {
    const _hsq = typeof window !== 'undefined' && window._hsq ? window._hsq : []
    return _hsq
  }

  setContentType = (contentType: string) => {
    this.getHubSpotQuery().push(['setContentType', contentType])
  }

  setTrackPageView = () => {
    this.getHubSpotQuery().push(['trackPageView'])
  }

  setPathPageView = (path: string) => {
    // This function updates the path
    this.getHubSpotQuery().push(['setPath', path])
    // This function track the current updated page path
    this.setTrackPageView()
  }

  setIdentity = (email: string, customPropertities: object = {}) => {
    this.getHubSpotQuery().push([
      'identify',
      {
        email,
        ...customPropertities,
      },
    ])
  }

  setTrackEvent = ({ eventId, value }: { eventId: string; value: string }) => {
    this.getHubSpotQuery().push([
      'trackEvent',
      {
        id: eventId,
        value,
      },
    ])
  }

  setTrackCustomBehavioralEvent = ({ name, properties }: { name: string; properties: any }) => {
    this.getHubSpotQuery().push([
      'trackCustomBehavioralEvent',
      {
        name,
        properties,
      },
    ])
  }
}

export default HubSpotService
