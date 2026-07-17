import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'

// Force dark mode always
document.documentElement.classList.add('dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="sanmatix-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)
