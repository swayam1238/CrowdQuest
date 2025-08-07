import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  role: 'student' | 'teacher' | 'expert'
  address?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored authentication
    const storedAuth = localStorage.getItem('AUTHENTICATED')
    const storedUser = localStorage.getItem('USERNAME')
    
    if (storedAuth === 'true' && storedUser) {
      setUser({
        id: '1',
        username: storedUser,
        role: 'expert'
      })
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (username: string, password: string, role: string): Promise<boolean> => {
    // Simulate authentication - in real app this would connect to blockchain
    if (username === 'Divij' && password === 'divij0406') {
      const newUser: User = {
        id: '1',
        username,
        role: role as 'student' | 'teacher' | 'expert',
        address: '0xED620CdD26E4adfae79Ea12f5fadd2c4c6ab54a4'
      }
      
      setUser(newUser)
      setIsAuthenticated(true)
      localStorage.setItem('AUTHENTICATED', 'true')
      localStorage.setItem('USERNAME', username)
      
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.setItem('AUTHENTICATED', 'false')
    localStorage.removeItem('USERNAME')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}