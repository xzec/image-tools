import { useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useEyeDropper } from '~/content/useEyeDropper'

export default function Image() {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isFittedToViewPort, setIsFittedToViewPort] = useState(false)
  const [rotation, setRotation] = useState(0)
  const { eyeDrop, isSupported } = useEyeDropper()

  useHotkeys('right', () => setRotation((prev) => (prev + 90) % 360))
  useHotkeys('left', () => setRotation((prev) => (prev - 90) % 360))
  useHotkeys('meta+i', eyeDrop, { enabled: isSupported })

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
