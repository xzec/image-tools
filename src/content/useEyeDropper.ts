import { useCallback, useMemo } from 'react'

interface ColorPick {
  href: string
  sRGBHex: string
}

export function useEyeDropper() {
  const isSupported = useMemo(() => typeof window !== 'undefined' && !!window.EyeDropper, [])

  const eyeDrop = useCallback(async () => {
    if (!isSupported) return

    try {
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()
      console.log(result.sRGBHex)
      await navigator.clipboard.writeText(result.sRGBHex)

      const key = 'picks'
      const res = await chrome.storage.local.get<{ picks: { picks: ColorPick[] } }>(key)
      const picks: ColorPick[] = Array.isArray(res.picks) ? res.picks : []
      const picksCopy = picks.slice(-10)
      console.table(picksCopy)
      picksCopy.push({ href: location.href, sRGBHex: result.sRGBHex })
      await chrome.storage.local.set({ [key]: picksCopy })
    } catch (error) {
      if ((error as DOMException)?.name !== 'AbortError') console.error('EyeDropper failed', error)
    }
  }, [isSupported])

  return { eyeDrop, isSupported }
}
