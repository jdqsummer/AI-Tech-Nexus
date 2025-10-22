import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase-config'
import { Home, FileText, Info, Mail, Moon, Sun, User, LogOut, Menu, X } from 'lucide-react'

const Header = ({ theme, toggleTheme }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const darkMode = theme === 'dark'

  useEffect(() => {
    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const user = session.user
        // 优先使用full_name作为显示名称，如果不存在则使用username，再不存在则使用邮箱前缀
        const displayName = user.user_metadata?.full_name || 
                       user.user_metadata?.username || 
                       user.email?.split('@')[0] || 
                       'User'
        const userObject = {
          id: user.id,
          email: user.email,
          username: displayName
        }
        setCurrentUser(userObject)
        localStorage.setItem('currentUser', JSON.stringify(userObject))
        localStorage.setItem('lastSuccessfulAuth', Date.now().toString())
      } else {
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
      }
    } catch (error) {
      console.error('Error checking user:', error)
      setCurrentUser(null)
      localStorage.removeItem('currentUser')
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setCurrentUser(null)
      localStorage.removeItem('currentUser')
      setIsMenuOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-secondary/50 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-cyan-500 w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">AI Tech Nexus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-cyan-400 bg-cyan-500/10' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/articles" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/articles') 
                  ? 'text-cyan-400 bg-cyan-500/10' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Articles</span>
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-cyan-400 bg-cyan-500/10' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link 
              to="/contact" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-cyan-400 bg-cyan-500/10' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User menu or Auth buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 bg-gray-700 rounded-full py-1 px-3 border border-gray-600 hover:bg-gray-600 transition-colors"
                >
                  <div className="h-6 w-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium">
                    {currentUser.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-300 hidden sm:block">
                    {currentUser.username || currentUser.email}
                  </span>
                </button>

                {/* Dropdown menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg py-1 border border-gray-700 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="inline-block h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="inline-block h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/create-article"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FileText className="inline-block h-4 w-4 mr-2" />
                      Create Article
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <LogOut className="inline-block h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-md transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-cyan-400 bg-cyan-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/articles"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/articles') 
                    ? 'text-cyan-400 bg-cyan-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-5 w-5" />
                <span>Articles</span>
              </Link>
              <Link
                to="/about"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-cyan-400 bg-cyan-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-5 w-5" />
                <span>About</span>
              </Link>
              <Link
                to="/contact"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/contact') 
                    ? 'text-cyan-400 bg-cyan-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header