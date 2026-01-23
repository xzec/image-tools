import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Controls } from './Controls.tsx'

const host = document.createElement('div')
host.id = 'my-extension-host'

document.body.appendChild(host)
document.body.style.overflow = 'hidden'

const img = document.querySelector('img')!

const shadowRoot = host.attachShadow({ mode: 'open' })

createRoot(shadowRoot).render(
  <StrictMode>
    <Controls img={img} />
  </StrictMode>,
)
