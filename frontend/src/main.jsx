import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/providers/theme-provider'

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>

);
