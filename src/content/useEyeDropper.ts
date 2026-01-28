import { useCallback, useMemo } from 'react'

export interface ColorPick {
  href: string
  sRGBHex: string
  ts: number
}

async function persistPick(pick: ColorPick) {
  const key = 'picks'
  const res = await chrome.storage.local.get<{ picks: ColorPick[] }>(key)
  const picks: ColorPick[] = Array.isArray(res.picks) ? res.picks : []
  const picksCopy = picks.slice(-10)
  console.table(picksCopy)
  picksCopy.push(pick)
  await chrome.storage.local.set({ [key]: picksCopy })
}

export function useEyeDropper() {
  const isSupported = useMemo(() => typeof window !== 'undefined' && !!window.EyeDropper, [])

  const eyeDrop = useCallback(async () => {
    if (!isSupported) return

    try {
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()

      await Promise.all([
        navigator.clipboard.writeText(result.sRGBHex),
        persistPick({ href: location.href, sRGBHex: result.sRGBHex, ts: Date.now() }),
      ])
    } catch (error) {
      if ((error as DOMException).name !== 'AbortError') console.error('EyeDropper failed', error)
    }
  }, [isSupported])

  return { eyeDrop, isSupported }
}
