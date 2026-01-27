import { useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export function Controls() {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isFittedToViewPort, setIsFittedToViewPort] = useState(false)
  const [rotation, setRotation] = useState(0)

  useHotkeys('right', () => setRotation((prev) => (prev + 90) % 360))
  useHotkeys('left', () => setRotation((prev) => (prev - 90) % 360))

  return (
    <img
      ref={imgRef}
      src={location.href}
      onClick={() => setIsFittedToViewPort((prev) => !prev)}
      style={{
        userSelect: 'none',
        margin: 'auto',
        objectFit: 'contain',
        width: isFittedToViewPort ? '100dvw' : 'initial',
        height: isFittedToViewPort ? '100dvh' : 'initial',
        transform: `rotate(${rotation}deg)`,
      }}
    />
  )
}
