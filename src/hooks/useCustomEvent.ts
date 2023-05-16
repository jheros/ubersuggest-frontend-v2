import { useState, useEffect } from 'react'

const useLocalStorageKeyObserver = (key: string) => {
  const [value, setValue] = useState(localStorage.getItem(key) || '')

  useEffect(() => {
    const onNameChange = (event: any) => {
      if (event.detail) setValue(event.detail)
    }
    const keyEvent = new CustomEvent(`custom-event-${key}`, {
      bubbles: true,
      detail: value,
    })
    window.addEventListener(`custom-event-${key}`, onNameChange)
    document.dispatchEvent(keyEvent)
    return () => window.removeEventListener(`custom-event-${key}`, onNameChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { value }
}

export default useLocalStorageKeyObserver
