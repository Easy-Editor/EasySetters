import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import '../src/styles/variables.css'
import './styles.css'

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
