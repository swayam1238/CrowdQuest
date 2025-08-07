export interface Question {
  id: string
  subject: string
  topic: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  imageUrl?: string
  approved: boolean
  isReviewed: boolean
  author: string
  createdAt: Date
  reportCount?: number
}

export interface Subject {
  id: string
  name: string
  topics: Topic[]
}

export interface Topic {
  id: string
  name: string
  subtopics?: string[]
}

export interface QuestionPaperConfig {
  subject: string
  totalQuestions: number
  difficulty: {
    easy: number
    medium: number
    hard: number
  }
  excludedTopics: string[]
  weightage: number
  date: string
}

export interface User {
  id: string
  username: string
  role: 'student' | 'teacher' | 'expert'
  address?: string
}