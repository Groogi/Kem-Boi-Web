import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminPanel from './pages/AdminPanel'
import FamilyBonusDashboard from './pages/FamilyBonusDashboard'
import SignUpLogin from './pages/SignUpLogin'
import LegalPage from './pages/LegalPage'
import { useAuth } from './context/AuthContext'

function PrivateRoute({ children }) {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user && user.role !== 'admin') return <Navigate to="/family" replace />
  return children
}

const PRIVACY_SECTIONS = [
  {
    heading: '1. Information We Collect',
    content:
      'We collect information you provide directly to us, such as when you create an account, redeem a reward, or contact our support team. This may include your name, email address, phone number, and date of birth.',
  },
  {
    heading: '2. How We Use Your Information',
    content:
      'We use the information we collect to manage your membership, track your rewards and points ledger, and notify you of upcoming offers. We do not sell your personal information to third parties.',
  },
  {
    heading: '3. Data Security',
    content:
      'We implement industry-standard security measures to maintain the safety of your personal information. Your account is protected by a password hash, and all transactions are logged securely.',
  },
]

const TERMS_SECTIONS = [
  {
    heading: '1. Membership Eligibility',
    content:
      'To be a member of Kem Boi, you must be a resident of Australia and provide accurate personal information. Multiple accounts for a single individual are strictly prohibited.',
  },
  {
    heading: '2. Points and Rewards',
    content:
      'Points are earned through purchases at participating Kem Boi store locations. Points have no cash value and can only be redeemed for rewards as defined in the Customer Hub. Any points earned through fraudulent means will be voided.',
  },
  {
    heading: '3. Reward Fulfillment',
    content:
      'Admins reserve the right to determine reward availability based on stock limits and local conditions. Fulfillment is subject to the active status of your membership.',
  },
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route
          path="/privacy"
          element={
            <LegalPage
              title="Privacy Policy"
              lastUpdated="April 2026"
              sections={PRIVACY_SECTIONS}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <LegalPage
              title="Terms of Service"
              lastUpdated="April 2026"
              sections={TERMS_SECTIONS}
            />
          }
        />

        {/* Admin and Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/family"
          element={
            <PrivateRoute>
              <FamilyBonusDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
