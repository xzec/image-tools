import { Activity, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function History() {
  const [open, setOpen] = useState(false)

  useHotkeys('meta+k', () => setOpen((prev) => !prev))
  useHotkeys('esc', () => setOpen(false), { enabled: open })

  return (
    <Activity mode={open ? 'visible' : 'hidden'}>
      <div className="fixed grid h-full w-full place-items-center text-white backdrop-brightness-50">
        <div className="z-50">history</div>
      </div>
    </Activity>
  )
}
