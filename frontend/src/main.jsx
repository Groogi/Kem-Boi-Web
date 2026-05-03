import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = '230162080687-nfkeb55i94tmmsn1bd6i60kof2e44jat.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
