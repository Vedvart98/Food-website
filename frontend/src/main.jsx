import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext.jsx'
import { AuthProvider } from './Context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>

    <BrowserRouter>
      <StoreContextProvider>

        <App />
      </StoreContextProvider>
    </BrowserRouter>

  </AuthProvider>
)
