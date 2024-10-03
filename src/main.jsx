import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { SolaScripturaApp } from './SolaScripturaApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SolaScripturaApp />
  </StrictMode>,
)
