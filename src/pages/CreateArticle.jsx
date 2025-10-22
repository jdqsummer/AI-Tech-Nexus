import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, X } from 'lucide-react'
import { supabase } from '../../supabase-config'

const CreateArticle = () => {
  const navigate = useNavigate()
  const [article, setArticle] = useState({
    title: '',
    summary: '',
    category: 'Product',
    tags: '',
    content: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  // 检查用户是否已登录
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      navigate('/login')
      return
    }
    setUser(currentUser)
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setArticle(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 基本验证
    if (!article.title.trim()) {
      setError('Title is required')
      setLoading(false)
      return
    }

    if (!article.content.trim()) {
      setError('Content is required')
      setLoading(false)
      return
    }

    try {
      // 创建新文章对象
      const newArticle = {
        title: article.title,
        summary: article.summary || '',
        content: article.content,
        category: article.category || 'Product',
        tags: article.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: user.username,
        author_id: user.id,
        user_id: user.id,
        user_email: user.email,
        thumbnail: 'https://r2.flowith.net/files/png/YC7WV-tech_article_thumbnail_concept_index_1@1024x1024.png'
      }

      // 保存到Supabase数据库
      const { data, error: insertError } = await supabase
        .from('articles')
        .insert(newArticle)
        .select()
        .single()

      if (insertError) throw insertError

      // 更新localStorage缓存
      const existingArticles = JSON.parse(localStorage.getItem('articles') || '[]')
      const updatedArticles = [...existingArticles, data]
      localStorage.setItem('articles', JSON.stringify(updatedArticles))

      // 显示成功消息并重定向
      alert('Article created successfully!')
      navigate(`/article/${data.id}`)
    } catch (err) {
      setError('Failed to save article: ' + err.message)
      console.error('Error saving article:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/articles')
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-gray-400">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-dark bg-grid-pattern">
      {/* 添加渐变背景层 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-12 relative">
        <div className="mb-8">
          <button
            onClick={() => navigate('/articles')}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Articles</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-cyan-500/20 rounded-lg p-8 backdrop-blur-sm relative">
            {/* 添加网格图案覆盖层 */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                Create New Article
              </h1>
              <p className="text-gray-400 mb-8">Share your knowledge with the community</p>

              {error && (
                <div className="mb-6 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm relative">
                  {/* 添加网格图案覆盖层 */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
                  <div className="relative z-10">
                    <p className="text-red-400">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={article.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Summary
                  </label>
                  <textarea
                    name="summary"
                    value={article.summary}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                    placeholder="Brief summary of your article"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={article.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                    >
                      <option value="Product">Product</option>
                      <option value="Development">Development</option>
                      <option value="Technology">Technology</option>
                      <option value="Science">Science</option>
                      <option value="AI">AI</option>
                      <option value="Programming">Programming</option>
                      <option value="Tutorials">Tutorials</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={article.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                      placeholder="Comma-separated tags"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={article.content}
                    onChange={handleInputChange}
                    rows={15}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                    placeholder="Write your article content here..."
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 disabled:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 border border-cyan-500/30"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Save className="h-5 w-5" />
                    )}
                    <span>{loading ? 'Saving...' : 'Save Article'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-gray-600/50"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateArticle