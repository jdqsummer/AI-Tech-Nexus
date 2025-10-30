import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ChevronLeft, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../supabase-config';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 获取当前用户信息
    const user = JSON.parse(localStorage.getItem('currentUser')) || null;
    setCurrentUser(user);
    
    // 获取文章数据（分层存储架构）
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      // 首先尝试从localStorage获取
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
      const foundArticle = storedArticles.find(article => article.id == id);
      
      if (foundArticle) {
        // 如果localStorage中有数据，直接使用
        setArticle(foundArticle);
      } else {
        // 如果localStorage中没有数据，从Supabase获取
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Article not found');

        // 设置状态并缓存到localStorage
        setArticle(data);
        
        // 更新localStorage缓存
        const updatedArticles = [...storedArticles, data];
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
      }
    } catch (err) {
      console.error('Error loading article:', err);
      setError(err.message || 'Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  // 处理删除文章
  const handleDelete = async () => {
    if (!currentUser) {
      alert('You must be logged in to delete articles')
      return
    }
    
    // 检查权限 - 与显示逻辑保持一致
    const isAuthor = currentUser.id === article.author_id
    if (!isAuthor) {
      alert('You do not have permission to delete this article')
      return
    }

    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      try {
        // 从Supabase删除文章
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Failed to delete article from Supabase:', error);
          throw error
        }
        
        // 从localStorage中移除文章
        const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
        const updatedArticles = storedArticles.filter(a => a.id != id)
        localStorage.setItem('articles', JSON.stringify(updatedArticles))
        
        // 显示删除成功消息并导航到文章列表页
        alert('Article deleted successfully')
        navigate('/articles')
      } catch (err) {
        console.error('Error deleting article:', err)
        alert('Failed to delete article: ' + err.message)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 flex items-center justify-center">
        <div className="text-center bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-cyan-500/20 p-8 backdrop-blur-sm relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Link 
              to="/articles" 
              className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm border border-cyan-500/30"
            >
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 flex items-center justify-center">
        <div className="text-center bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-cyan-500/20 p-8 backdrop-blur-sm relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❓</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
            <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
            <Link 
              to="/articles" 
              className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm border border-cyan-500/30"
            >
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20">
      {/* 添加渐变背景层 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-12 relative">
        {/* 返回按钮 */}
        <Link 
          to="/articles" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors group"
        >
          <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Back to Articles
        </Link>

        {/* 文章内容 */}
        <article className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-cyan-500/20 overflow-hidden backdrop-blur-sm relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* 文章头部 */}
            <header className="p-8 border-b border-cyan-500/20">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Link 
                  to={`/category/${article.category}`} 
                  className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 text-cyan-400 rounded-full text-sm font-medium hover:from-cyan-500/30 hover:to-magenta-500/30 transition-all border border-cyan-500/30"
                >
                  {article.category}
                </Link>
                {article.tags && article.tags.map((tag, index) => (
                  <span key={tag} className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm font-medium backdrop-blur-sm border border-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                {article.title}
              </h1>
              
              <div className="flex items-center text-gray-500 text-sm mb-6">
                <User className="h-4 w-4 mr-2" />
                <span>{article.author}</span>
                <Calendar className="h-4 w-4 ml-4 mr-2" />
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </div>
            </header>

            {/* 文章缩略图 */}
            {article.thumbnail && (
              <div className="px-8 py-6">
                <img 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="w-full max-w-4xl mx-auto rounded-xl border border-cyan-500/20"
                />
              </div>
            )}

            {/* 文章正文 */}
            <div className="prose prose-custom max-w-none p-8">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* 编辑和删除按钮（仅作者可见） */}
            {currentUser && currentUser.id === article.author_id && (
              <div className="px-8 py-6 border-t border-cyan-500/20 flex gap-4">
                <Link 
                  to={`/edit-article/${article.id}`}
                  className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-cyan-500/30 backdrop-blur-sm border border-cyan-500/30"
                >
                  <Edit className="mr-2 h-5 w-5" />
                  Edit Article
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-gradient-to-r from-red-500 to-magenta-500 hover:from-red-600 hover:to-magenta-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-red-500/30 backdrop-blur-sm border border-red-500/30"
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Delete Article
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default Article;