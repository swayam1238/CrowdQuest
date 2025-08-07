import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Upload, Mic, Camera, Plus } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { subjects } from '../data/subjects'
import { useToast } from '../components/ui/Toaster'

export default function AddQuestion() {
  const { isAuthenticated } = useAuth()
  const { addToast } = useToast()
  
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    difficulty: '',
    imageUrl: ''
  })

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const selectedSubject = subjects.find(s => s.name === formData.subject)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.subject || !formData.topic || !formData.question || 
        !formData.difficulty || formData.options.some(opt => !opt.trim())) {
      addToast('Please fill in all required fields', 'error')
      return
    }

    // Simulate submission
    addToast('Question submitted for review successfully!', 'success')
    
    // Reset form
    setFormData({
      subject: '',
      topic: '',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      difficulty: '',
      imageUrl: ''
    })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData(prev => ({ ...prev, options: newOptions }))
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Question</h1>
            <p className="text-gray-600">
              Submit questions through text, voice, or image input. Add images or mathematical equations to your question.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject and Topic Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    className="input"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value, topic: '' }))}
                    required
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
                    Topic *
                  </label>
                  <select
                    className="input"
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                    required
                    disabled={!selectedSubject}
                  >
                    <option value="">Choose Topic</option>
                    {selectedSubject?.topics.map(topic => (
                      <option key={topic.id} value={topic.name}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty *
                  </label>
                  <select
                    className="input"
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                    required
                  >
                    <option value="">Choose Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Question Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <button
                    type="button"
                    className="btn btn-outline px-3 py-2 text-sm inline-flex items-center"
                    title="Voice Input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline px-3 py-2 text-sm inline-flex items-center"
                    title="Image Input"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  className="input min-h-24"
                  placeholder="Please type/speak the question..."
                  value={formData.question}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  required
                  rows={3}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="input flex-1"
                  />
                  <button
                    type="button"
                    className="btn btn-outline px-4 py-2 inline-flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </button>
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Options and Correct Answer *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={formData.correctAnswer === index}
                        onChange={() => setFormData(prev => ({ ...prev, correctAnswer: index }))}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="font-medium text-gray-700">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <input
                        type="text"
                        className="input flex-1"
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary px-8 py-3 text-lg inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}