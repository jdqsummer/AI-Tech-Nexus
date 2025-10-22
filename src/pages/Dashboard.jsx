import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, FileText, Heart, TrendingUp, Calendar, Eye } from 'lucide-react'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [userArticles, setUserArticles] = useState([])
  const [favoriteArticles, setFavoriteArticles] = useState([])
  const [stats, setStats] = useState({
    articles: 0,
    favorites: 0,
    views: 0
  })

  useEffect(() => {
    // 从localStorage加载用户数据
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    setUser(currentUser)

    // 从localStorage加载文章数据
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || []
    
    // 获取当前用户的文章
    const userArticles = storedArticles.filter(article => article.authorId === currentUser?.id)
    setUserArticles(userArticles)
    
    // 获取收藏的文章（模拟数据）
    const favoriteArticles = storedArticles.slice(0, 3)
    setFavoriteArticles(favoriteArticles)
    
    // 设置统计数据
    setStats({
      articles: userArticles.length,  // 文章数量
      favorites: favoriteArticles.length,  // 收藏数量
      views: userArticles.reduce((total, article) => total + (article.views || 0), 0)  // 总浏览量
    })
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please log in to view your dashboard</h1>
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-dark bg-grid-pattern bg-[length:40px_40px] py-8 sm:py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Dashboard Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-70 -z-10"></div>
          <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                    Welcome back, {user.username}
                  </h1>
                  <p className="text-gray-400">Here's what's happening with your content</p>
                </div>
              </div>
              <Link
                to="/create-article"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-medium rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center"
              >
                <FileText className="w-5 h-5 mr-2" />
                Create Article
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Your Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Articles</p>
                    <p className="text-3xl font-bold text-white">{stats.articles}</p>
                  </div>
                  <FileText className="w-10 h-10 text-cyan-400" />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Favorites</p>
                    <p className="text-3xl font-bold text-white">{stats.favorites}</p>
                  </div>
                  <Heart className="w-10 h-10 text-magenta-400" />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Total Views</p>
                    <p className="text-3xl font-bold text-white">{stats.views}</p>
                  </div>
                  <Eye className="w-10 h-10 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Articles Section */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-30 -z-10"></div>
          <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Articles</h2>
              <Link to="/articles" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center">
                View All <span className="ml-1">→</span>
              </Link>
            </div>

            {userArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userArticles.slice(0, 3).map((article) => (
                  <div key={article.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                    <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl overflow-hidden backdrop-blur-sm h-full flex flex-col">
                      <div className="h-32 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        <img 
                          src={article.thumbnail || 'https://via.placeholder.com/400x200'} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent"></div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(article.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-500">{article.views || 0} views</span>
                          </div>
                          <Link
                            to={`/article/${article.id}`}
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-all hover:translate-x-1 flex items-center"
                          >
                            Edit <span className="ml-1">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No articles yet</h3>
                <p className="text-gray-500 mb-4">Start writing your first article today!</p>
                <Link
                  to="/create-article"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-medium rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/30"
                >
                  Create Article
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Favorite Articles Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-30 -z-10"></div>
          <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Favorite Articles</h2>
              <Link to="/articles" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center">
                View All <span className="ml-1">→</span>
              </Link>
            </div>

            {favoriteArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteArticles.map((article) => (
                  <div key={article.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                    <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                      <div className="h-32 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        <img 
                          src={article.thumbnail || 'https://via.placeholder.com/400x200'} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(article.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">
                                {article.author.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm text-gray-400">{article.author}</span>
                          </div>
                          <Link
                            to={`/article/${article.id}`}
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-all hover:translate-x-1 flex items-center"
                          >
                            Read <span className="ml-1">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No favorites yet</h3>
                <p className="text-gray-500">Start exploring and favorite articles you like!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard