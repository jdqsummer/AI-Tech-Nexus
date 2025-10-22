import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Plus } from 'lucide-react'
import { supabase } from '../../supabase-config'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // 加载文章数据（分层存储架构）
    loadArticles()
    
    // 检查用户认证状态
    checkUser()
  }, [])

  // 加载文章数据（分层存储架构）
  const loadArticles = async () => {
    try {
      // 首先尝试从localStorage获取
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
      
      if (storedArticles.length > 0) {
        // 如果localStorage中有数据，直接使用
        setArticles(storedArticles)
      } else {
        // 如果localStorage中没有数据，从Supabase获取
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        // 设置状态并缓存到localStorage
        setArticles(data || [])
        localStorage.setItem('articles', JSON.stringify(data || []))
      }
    } catch (err) {
      console.error('Error loading articles:', err)
      // 出错时仍然尝试从localStorage获取
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
      setArticles(storedArticles)
    }
  }

  // 检查用户认证状态
  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setCurrentUser(user)
  }

  // 获取所有分类和标签
  const categories = ['all', ...new Set(articles.map(article => article.category))]
  const tags = ['all', ...new Set(articles.flatMap(article => article.tags || []))]

  // 过滤文章
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.tags && article.tags.some(tag => 
                           tag.toLowerCase().includes(searchTerm.toLowerCase())))
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesTag = selectedTag === 'all' || (article.tags && article.tags.includes(selectedTag))
    
    return matchesSearch && matchesCategory && matchesTag
  })

  return (
    <section className="py-4 sm:py-6">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Articles</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Explore our collection of technical articles, tutorials, and insights
          </p>
          <div className="flex justify-center">
            <Link 
              to="/create-article" 
              className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white rounded-md transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/30"
            >
              <Plus className="h-5 w-5 mr-1" />
              Publish Article
            </Link>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-secondary border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Filter by:</span>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-secondary border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 bg-secondary border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'all' ? 'All Tags' : tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-secondary rounded-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-2 group">
              <div className="h-48 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <img 
                  src={article.thumbnail || 'https://via.placeholder.com/400x200'} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded border border-gray-600">
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded border border-gray-600">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <Link 
                  to={`/article/${article.id}`}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-all hover:translate-x-1 flex items-center"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Articles