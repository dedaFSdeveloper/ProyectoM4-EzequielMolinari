import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position='bottom-right'
      toastOptions={{
        style: {
          background: '#1a1a1a',
          color: '#f0f0f0',
          border: '1px solid #2a2a2a',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '13px',
        },
      }}
    />
  </StrictMode>,
)