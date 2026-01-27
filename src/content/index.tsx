import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Image } from './Image.tsx'

const host = document.createElement('div')
host.id = 'image-tools'
host.style.width = '100%'
host.style.height = '100%'
host.style.display = 'grid'
host.style.placeItems = 'center'
document.querySelector('img')!.replaceWith(host)

document.body.style.overflow = 'hidden'

const shadowRoot = host.attachShadow({ mode: 'open' })

createRoot(shadowRoot).render(
  <StrictMode>
    <Image />
  </StrictMode>,
)
