import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import History from '~/content/History'
import Image from '~/content/Image'
import '~/content/index.css'

document.body.removeChild(document.querySelector('img')!)
document.body.style.overflow = 'hidden'

createRoot(document.body).render(
  <StrictMode>
    <Image />
    <History />
  </StrictMode>,
)
