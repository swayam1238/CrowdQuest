import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Shield, Users } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toaster'

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    passcode: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, isAuthenticated } = useAuth()
  const { addToast } = useToast()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(credentials.username, credentials.password, 'expert')
      
      if (success) {
        addToast('Login successful! Welcome back.', 'success')
      } else {
        addToast('Invalid credentials. Please try again.', 'error')
      }
    } catch (error) {
      addToast('Login failed. Please check your connection.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
            <p className="text-gray-600 mt-2">
              Secure authentication with blockchain technology
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="input"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="input"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-2">
                6-Digit Passcode
              </label>
              <input
                id="passcode"
                type="password"
                required
                maxLength={6}
                className="input"
                placeholder="Enter 6-digit passcode"
                value={credentials.passcode}
                onChange={(e) => setCredentials(prev => ({ ...prev, passcode: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-3 text-lg disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Enter Portal'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
            <p className="text-sm text-blue-700 mt-1">
              Username: <code className="bg-blue-100 px-1 rounded">Divij</code><br />
              Password: <code className="bg-blue-100 px-1 rounded">divij0406</code><br />
              Passcode: <code className="bg-blue-100 px-1 rounded">123456</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}