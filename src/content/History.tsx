import { Activity, useCallback, useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { CloseIcon } from '~/content/CloseIcon.tsx'
import { cn } from '~/content/cn.ts'
import type { ColorPick } from '~/content/useEyeDropper.ts'

export default function History() {
  const [open, setOpen] = useState(false)
  const [picks, setPicks] = useState<ColorPick[]>([])
  const [hexCopied, setHexCopied] = useState<string | null>(null)

  useHotkeys('meta+k', () => setOpen((prev) => !prev))
  useHotkeys('esc', () => setOpen(false), { enabled: open })

  const copyHexToClipboard = useCallback(async (sRGBHex: string, key: string) => {
    await navigator.clipboard.writeText(sRGBHex)
    setHexCopied(key)
    setTimeout(() => setHexCopied(null), 2000)
  }, [])

  useEffect(() => {
    let isActive = true

    async function loadPicks() {
      if (!open || !chrome?.storage?.local) return
      const res = await chrome.storage.local.get<{ picks: ColorPick[] }>('picks')
      const next = Array.isArray(res.picks) ? res.picks : []
      if (isActive) setPicks(next)
    }

    void loadPicks()
    return () => {
      isActive = false
    }
  }, [open])

  useEffect(() => {
    if (!chrome?.storage?.onChanged) return
    const handler: Parameters<typeof chrome.storage.onChanged.addListener>[0] = (changes, area) => {
      if (area !== 'local' || !changes.picks) return
      const next = Array.isArray(changes.picks.newValue) ? changes.picks.newValue : []
      setPicks(next)
    }
    chrome.storage.onChanged.addListener(handler)
    return () => chrome.storage.onChanged.removeListener(handler)
  }, [])

  return (
    <Activity mode={open ? 'visible' : 'hidden'}>
      <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center text-white">
        <div
          className="pointer-events-auto w-[min(650px,92vw)] rounded-2xl bg-neutral-950 p-4 shadow-2xl ring-1 ring-white/10"
          role="dialog"
          aria-modal="true"
          aria-label="Picked colors history"
        >
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-semibold text-md">History</h2>
            <button
              type="button"
              aria-label="Close"
              className="cursor-pointer rounded-md border border-white/60 bg-white/10 px-1 text-white/60 text-xs hover:border-white/80 hover:bg-white/15 hover:text-white/80"
              onClick={() => setOpen(false)}
            >
              Clear
            </button>
            <div className="grow" />
            <button
              type="button"
              aria-label="Close"
              className="cursor-pointer p-1 text-white/60 text-xs hover:text-white"
              onClick={() => setOpen(false)}
            >
              <CloseIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
          <div className="scrollbar-none max-h-[60vh] overflow-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-neutral-950/90 text-white/80">
                <tr>
                  <th className="p-2 font-medium text-xs">Color</th>
                  <th className="p-2 font-medium text-xs">Hex</th>
                  <th className="p-2 font-medium text-xs">Href</th>
                  <th className="p-2 font-medium text-xs">Type</th>
                  <th className="p-2 font-medium text-xs">Time</th>
                </tr>
              </thead>
              <tbody>
                {picks.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-white/60 text-xs" colSpan={3}>
                      No colors picked yet.
                    </td>
                  </tr>
                ) : (
                  picks
                    .slice()
                    .reverse()
                    .map((pick, index) => (
                      <tr key={`${pick.sRGBHex}-${index}`} className="border-white/5 border-t">
                        <td className="px-2 py-1">
                          <span
                            className="inline-flex size-4 rounded-full ring-1 ring-white/20"
                            style={{ backgroundColor: pick.sRGBHex }}
                          />
                        </td>
                        <td
                          role="button"
                          aria-label="Copy color HEX"
                          onClick={() => void copyHexToClipboard(pick.sRGBHex, `${pick.sRGBHex}-${index}`)}
                          className={cn('cursor-pointer px-2 py-1 font-mono text-xs hover:text-blue-600', {
                            'hover:underline': hexCopied !== `${pick.sRGBHex}-${index}`,
                            'text-blue-600': hexCopied === `${pick.sRGBHex}-${index}`,
                          })}
                        >
                          {hexCopied === `${pick.sRGBHex}-${index}` ? 'Copied!' : pick.sRGBHex}
                        </td>
                        <td className="scrollbar-none overflow-auto px-2 py-1 text-white/70 text-xs">
                          <a
                            href={pick.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block max-w-[320px] whitespace-nowrap align-top"
                          >
                            {new URL(pick.href).hostname}/{new URL(pick.href).pathname}
                          </a>
                        </td>
                        <td className="px-2 py-1 uppercase">
                          <span>{new URL(pick.href).pathname.split('.').pop()}</span>
                        </td>
                        <td className="px-2 py-1 text-white/70 text-xs">
                          <span className="whitespace-nowrap">
                            {Boolean(pick.ts) &&
                              new Intl.DateTimeFormat('en-GB', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                              }).format(new Date(pick.ts))}
                          </span>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Activity>
  )
}
