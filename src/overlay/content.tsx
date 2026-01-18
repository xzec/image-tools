import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const host = document.createElement('div')
host.id = 'my-extension-host'
document.body.appendChild(host)

const shadowRoot = host.attachShadow({ mode: 'open' })

createRoot(shadowRoot).render(
  <StrictMode>
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
    </div>
  </StrictMode>,
)
