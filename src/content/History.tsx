import { Activity, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function History() {
  const [open, setOpen] = useState(false)

  useHotkeys('meta+k', () => setOpen((prev) => !prev))
  useHotkeys('esc', () => setOpen(false), { enabled: open })

  return (
    <Activity mode={open ? 'visible' : 'hidden'}>
      <div
        style={{
          display: 'grid',
          position: 'fixed',
          width: '100vw',
          height: '100vw',
          placeItems: 'center',
          backdropFilter: 'brightness(40%)',
        }}
      >
        <div
          style={{
            zIndex: 1000,
            background: 'red',
          }}
        >
          history
        </div>
      </div>
    </Activity>
  )
}
