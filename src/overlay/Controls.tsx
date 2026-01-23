import { useState } from 'react'

export function Controls({ img }: { img: HTMLImageElement }) {
  const [, setRotation] = useState(0)

  const rotateClockwise = () => {
    setRotation((prev) => {
      const newRotation = (prev + 90) % 360
      img.style.transform = `rotate(${newRotation}deg)`
      return newRotation
    })
  }

  const rotateCounterClockwise = () => {
    setRotation((prev) => {
      const newRotation = (prev - 90) % 360
      img.style.transform = `rotate(${newRotation}deg)`
      return newRotation
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '2147483647',
        pointerEvents: 'auto',
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        border: '1px solid #ccc',
        color: 'black',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '16px' }}>Hi mom</h1>
      <p style={{ color: 'gray', margin: '4px 0 0' }}>Isolated Shadow DOM active</p>
      <button type="button" onClick={rotateClockwise}>
        Rotate ↻
      </button>
      <button type="button" onClick={rotateCounterClockwise}>
        Rotate ↺
      </button>
    </div>
  )
}
