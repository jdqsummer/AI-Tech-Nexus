import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Github, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-cyan-500/20 mt-auto py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="#" className="hover:text-cyan-400 transition-colors">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link to="#" className="hover:text-cyan-400 transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link to="#" className="hover:text-cyan-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
        <p>&copy; 2025 AI Tech Nexus. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer