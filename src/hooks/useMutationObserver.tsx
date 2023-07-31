import { useEffect, useState } from 'react'

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
}

export const useMutationObserver = (targetEl: Node | null, cb: MutationCallback, options = DEFAULT_OPTIONS) => {
  const [observer, setObserver] = useState<MutationObserver | null>(null)

  useEffect(() => {
    const obs = new MutationObserver(cb)
    setObserver(obs)
  }, [cb, options, setObserver])

  useEffect(() => {
    if (!observer || !targetEl) return
    const { config } = options
    observer.observe(targetEl, config)
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [observer, targetEl, options])
}
