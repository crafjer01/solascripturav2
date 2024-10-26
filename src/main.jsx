import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { SolaScripturaApp } from './SolaScripturaApp'
import { Provider } from 'react-redux'
import { store } from './store/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <SolaScripturaApp />
    </Provider>
    
  </StrictMode>,
)
