import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from "../../supabase-config";
import RichTextEditor from '../components/RichTextEditor';
import { ArrowLeft, Save, X } from 'lucide-react';

const EditArticle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // 默认分类列表
  const defaultCategories = [
    { id: 1, name: 'Product' },
    { id: 2, name: 'Development' },
    { id: 3, name: 'Technology' },
    { id: 4, name: 'Science' },
    { id: 5, name: 'AI' },
    { id: 6, name: 'Programming' },
    { id: 7, name: 'Tutorials' }
  ]

  useEffect(() => {
    fetchArticle()
  }, [id])

  const fetchArticle = async () => {
    try {
      // 获取当前用户
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (!currentUser) {
        throw new Error('You must be logged in to edit articles')
      }

      // 首先尝试从localStorage获取
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
      let foundArticle = storedArticles.find(a => a.id == id)
      if (foundArticle) {
        // 验证用户是否有权限编辑这篇文章
        if (currentUser.id !== foundArticle.user_id) {
          throw new Error('You do not have permission to edit this article')
        }
        
        // 如果localStorage中有数据，直接使用
        setTitle(foundArticle.title || '')
        setContent(foundArticle.content || '')
        setCategory(foundArticle.category || '')
        setTags(Array.isArray(foundArticle.tags) ? foundArticle.tags.join(', ') : foundArticle.tags || '')
      } else {
        // 如果localStorage中没有数据，从Supabase获取
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        if (!data) throw new Error('Article not found')

        // 验证用户是否有权限编辑这篇文章
        if (currentUser.id !== data.author_id) {
          throw new Error('You do not have permission to edit this article')
        }

        // 设置状态
        setTitle(data.title || '')
        setContent(data.content || '')
        setCategory(data.category || '')
        setTags(Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '')
        
        // 更新localStorage缓存
        const updatedArticles = [...storedArticles, data]
        localStorage.setItem('articles', JSON.stringify(updatedArticles))
      }
    } catch (err) {
      console.error('Error fetching article:', err)
      setError('Failed to fetch article: ' + err.message)
      // 如果是权限错误，重定向到文章详情页
      if (err.message === 'You do not have permission to edit this article') {
        setTimeout(() => {
          window.location.href = `/article/${id}`
        }, 2000)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty')
      return
    }

    // 标签验证
    if (tags) {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const invalidTags = tagsArray.filter(tag => tag.length > 20);
      if (invalidTags.length > 0) {
        setError(`Invalid tags: ${invalidTags.join(', ')}. Tags must be 20 characters or less.`)
        return
      }
    }

    setLoading(true)
    setError('')

    try {
      // 从localStorage获取当前用户
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (!currentUser) {
        throw new Error('You must be logged in to edit articles')
      }

      // 更新Supabase数据库
      const { data, error } = await supabase
        .from('articles')
        .update({
          title,
          content,
          category,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // 更新localStorage缓存
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
      const updatedArticles = storedArticles.map(article => 
        article.id == id ? { ...article, title, content, category, tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), updated_at: new Date().toISOString() } : article
      )
      localStorage.setItem('articles', JSON.stringify(updatedArticles))

      // 跳转到文章详情页
      navigate(`/article/${id}`)
    } catch (err) {
      console.error('Error updating article:', err)
      setError('Failed to update article: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark bg-grid-pattern">
      {/* 添加渐变背景层 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-12 relative">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Article</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-cyan-500/20 rounded-lg p-8 backdrop-blur-sm relative">
            {/* 添加网格图案覆盖层 */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent mb-8">
                Edit Article
              </h1>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 mb-6 backdrop-blur-sm">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
            placeholder="Enter article title"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
          >
            <option value="">Select a category</option>
            {defaultCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
            placeholder="Comma-separated tags (e.g. react, javascript, tutorial)"
          />
          {tags && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.split(',').map((tag, index) => {
                const trimmedTag = tag.trim();
                // 验证标签长度
                if (!trimmedTag || trimmedTag.length > 20) {
                  return null;
                }
                return (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  >
                    {trimmedTag}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
          </div>
          <div className="flex flex-col flex-grow w-full min-h-[300px] max-h-[500px]">
            <RichTextEditor 
              content={content}
              setContent={setContent}
              isEdit={true}
              isFullScreen={false}
            />
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 disabled:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Update Article</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
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

export default EditArticle