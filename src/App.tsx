import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToasterProvider } from './components/ui/Toaster'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import AddQuestion from './pages/AddQuestion'
import QuestionPaper from './pages/QuestionPaper'
import Login from './pages/Login'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <ToasterProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/question-paper" element={<QuestionPaper />} />
          </Routes>
        </div>
      </ToasterProvider>
    </AuthProvider>
  )
}

export default App