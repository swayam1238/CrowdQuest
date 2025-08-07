import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Download, Calendar, FileText, Settings } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { subjects } from '../data/subjects'
import { useToast } from '../components/ui/Toaster'

export default function QuestionPaper() {
  const { isAuthenticated } = useAuth()
  const { addToast } = useToast()
  
  const [config, setConfig] = useState({
    subject: '',
    totalQuestions: 20,
    difficulty: {
      easy: 8,
      medium: 8,
      hard: 4
    },
    excludedTopics: [] as string[],
    weightage: 2,
    date: new Date().toISOString().split('T')[0]
  })

  const [generatedPaper, setGeneratedPaper] = useState<any[]>([])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const selectedSubject = subjects.find(s => s.name === config.subject)

  const handleGeneratePaper = () => {
    if (!config.subject) {
      addToast('Please select a subject first', 'error')
      return
    }

    // Mock paper generation
    const mockQuestions = [
      {
        id: 1,
        question: 'What is the SI unit of electric charge?',
        options: ['Coulomb', 'Ampere', 'Volt', 'Ohm'],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'Which law states that the current through a conductor is directly proportional to the voltage?',
        options: ['Kirchhoff\'s Law', 'Ohm\'s Law', 'Faraday\'s Law', 'Lenz\'s Law'],
        correctAnswer: 1
      }
    ]

    setGeneratedPaper(mockQuestions)
    addToast('Question paper generated successfully!', 'success')
  }

  const handleDownload = () => {
    addToast('Question paper downloaded!', 'success')
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Question Paper</h1>
            <p className="text-gray-600">
              Configure your question paper parameters and generate a customized exam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-1">
              <div className="card sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Paper Configuration
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Examination Date
                    </label>
                    <input
                      type="date"
                      className="input"
                      value={config.date}
                      onChange={(e) => setConfig(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      className="input"
                      value={config.subject}
                      onChange={(e) => setConfig(prev => ({ ...prev, subject: e.target.value }))}
                    >
                      <option value="">Choose Subject</option>
                      {subjects.map(subject => (
                        <option key={subject.id} value={subject.name}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Questions
                    </label>
                    <input
                      type="number"
                      className="input"
                      min="1"
                      max="100"
                      value={config.totalQuestions}
                      onChange={(e) => setConfig(prev => ({ ...prev, totalQuestions: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Distribution
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Easy</span>
                        <input
                          type="number"
                          className="input w-20"
                          min="0"
                          value={config.difficulty.easy}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            difficulty: { ...prev.difficulty, easy: parseInt(e.target.value) }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Medium</span>
                        <input
                          type="number"
                          className="input w-20"
                          min="0"
                          value={config.difficulty.medium}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            difficulty: { ...prev.difficulty, medium: parseInt(e.target.value) }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Hard</span>
                        <input
                          type="number"
                          className="input w-20"
                          min="0"
                          value={config.difficulty.hard}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            difficulty: { ...prev.difficulty, hard: parseInt(e.target.value) }
                          }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chapter Weightage
                    </label>
                    <input
                      type="number"
                      className="input"
                      min="1"
                      value={config.weightage}
                      onChange={(e) => setConfig(prev => ({ ...prev, weightage: parseInt(e.target.value) }))}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleGeneratePaper}
                    className="w-full btn btn-primary py-3 inline-flex items-center justify-center"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Generate Paper
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Paper Preview */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Question Paper Preview</h2>
                  {generatedPaper.length > 0 && (
                    <button
                      onClick={handleDownload}
                      className="btn btn-primary px-4 py-2 inline-flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                  )}
                </div>

                {generatedPaper.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Configure your paper settings and click "Generate Paper" to preview
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Paper Header */}
                    <div className="text-center border-b pb-6">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <img
                          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt="CBSE Logo"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Central Board of Secondary Education</h3>
                      <p className="text-gray-600 mt-2">Date: {new Date(config.date).toLocaleDateString()}</p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Note:</strong> Each question consists of 3 marks. All questions are compulsory. 
                        Read all questions carefully before attempting.
                      </p>
                    </div>

                    {/* Questions */}
                    <div className="space-y-6">
                      {generatedPaper.map((question, index) => (
                        <div key={question.id} className="border rounded-lg p-6">
                          <div className="bg-gray-100 p-3 rounded-t-lg mb-4">
                            <h4 className="font-semibold text-gray-900">
                              Question {index + 1}. {question.question}
                            </h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {question.options.map((option: string, optIndex: number) => (
                              <div key={optIndex} className="flex items-center">
                                <span className="font-medium text-gray-700 mr-2">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                <span className="text-gray-900">{option}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}