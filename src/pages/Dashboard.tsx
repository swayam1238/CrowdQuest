import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Search, Filter, CheckCircle, XCircle, Edit3 } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Question } from '../types'
import { useToast } from '../components/ui/Toaster'

// Mock data for demonstration
const mockQuestions: Question[] = [
  {
    id: '1',
    subject: 'Physics',
    topic: 'Electric Charges and Fields',
    question: 'What is the SI unit of electric charge?',
    options: ['Coulomb', 'Ampere', 'Volt', 'Ohm'],
    correctAnswer: 0,
    difficulty: 'Easy',
    approved: false,
    isReviewed: false,
    author: 'Student123',
    createdAt: new Date(),
    reportCount: 0
  },
  {
    id: '2',
    subject: 'Mathematics',
    topic: 'Matrices',
    question: 'What is the determinant of a 2x2 identity matrix?',
    options: ['0', '1', '2', '-1'],
    correctAnswer: 1,
    difficulty: 'Medium',
    approved: true,
    isReviewed: true,
    author: 'Student456',
    createdAt: new Date(),
    reportCount: 0
  }
]

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth()
  const { addToast } = useToast()
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || question.subject === selectedSubject
    
    return matchesSearch && matchesSubject
  })

  const handleApprove = (questionId: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, approved: true, isReviewed: true }
        : q
    ))
    addToast('Question approved successfully!', 'success')
  }

  const handleReject = (questionId: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, approved: false, isReviewed: true }
        : q
    ))
    addToast('Question rejected.', 'info')
  }

  const pendingQuestions = filteredQuestions.filter(q => !q.isReviewed)
  const approvedQuestions = filteredQuestions.filter(q => q.approved && q.isReviewed)

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to CrowdQuest, {user?.username}</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input w-full sm:w-48"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Filter className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{pendingQuestions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedQuestions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No questions found matching your criteria.</p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

interface QuestionCardProps {
  question: Question
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

function QuestionCard({ question, onApprove, onReject }: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">
            {question.subject} | {question.topic}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>
        {question.isReviewed && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            question.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {question.approved ? 'Approved' : 'Rejected'}
          </span>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {question.question}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                index === question.correctAnswer
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <p>Correct Answer: <span className="font-medium">{question.options[question.correctAnswer]}</span></p>
          <p>Author: {question.author}</p>
        </div>
        
        {!question.isReviewed && (
          <div className="flex space-x-2">
            <button
              onClick={() => onApprove(question.id)}
              className="btn btn-primary px-4 py-2 text-sm inline-flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </button>
            <button
              onClick={() => onReject(question.id)}
              className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 text-sm inline-flex items-center"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  )
}