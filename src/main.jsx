import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Body from './layout/body.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Body/>
  </StrictMode>
)