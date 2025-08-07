import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">CrowdQuest</span>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="btn btn-outline px-4 py-2"
              >
                Contributor
              </Link>
              <Link
                to="/login"
                className="btn btn-primary px-4 py-2"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  CROWD QUEST!
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The ultimate question paper generation portal! Experience the power and automation 
                of our process to generate tests seamlessly through crowdsourced content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="btn btn-primary px-8 py-3 text-lg inline-flex items-center"
                >
                  Begin Contributing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline px-8 py-3 text-lg"
                >
                  Login as Admin
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <img
                src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Education Technology"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Amazing Services <em className="text-primary-600">CrowdQuest</em> has to offer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your teacher experts would love to pioneer in creating, downloading, distributing 
              and securing question papers while contributing to the massive pool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: PlusCircle,
                title: 'Contribute Questions',
                description: 'Create, post and share your questions with the community and contribute to its growth.'
              },
              {
                icon: Shield,
                title: 'Approve/Reject Questions',
                description: 'As an expert, analyze, approve or reject questions posted by the contributors.'
              },
              {
                icon: BookOpen,
                title: 'Download Question Paper',
                description: 'Set the criteria for your paper and download it in PDF format anytime you want.'
              },
              {
                icon: Zap,
                title: 'Give and Get Rewards',
                description: 'Reward the questions you like best and receive rewards for the questions you contribute.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to revolutionize education?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators creating the future of examination systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Start Contributing
            </Link>
            <Link
              to="/login"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg"
            >
              Admin Access
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-primary-400" />
              <span className="ml-2 text-2xl font-bold">CrowdQuest</span>
            </div>
            <p className="text-gray-400 mb-4">
              Smart India Hackathon 2022 Submission - Revolutionizing Education Technology
            </p>
            <p className="text-sm text-gray-500">
              Made with ❤️ by Team CrowdQuest
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}