import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ChevronLeft, Edit, Trash2, MessageSquare } from 'lucide-react';
import { supabase } from '../../supabase-config';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
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
        // 初始化评论
        setComments(foundArticle.comments || []);
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
        setComments(data.comments || []);
        
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        // 从Supabase删除文章
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // 更新localStorage缓存
        const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
        const updatedArticles = storedArticles.filter(article => article.id != id);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
        
        navigate('/articles');
      } catch (err) {
        console.error('Failed to delete article:', err);
        alert('Failed to delete article: ' + err.message);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      author: currentUser.username || currentUser.email,
      created_at: new Date().toISOString()
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    setNewComment('');

    try {
      // 更新Supabase数据库中的文章评论
      const { error } = await supabase
        .from('articles')
        .update({ comments: updatedComments })
        .eq('id', id);

      if (error) throw error;

      // 更新localStorage缓存
      const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
      const updatedArticles = storedArticles.map(article => {
        if (article.id == id) {
          return { ...article, comments: updatedComments };
        }
        return article;
      });
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    } catch (err) {
      console.error('Failed to save comment:', err);
      alert('Failed to save comment: ' + err.message);
    }
  };

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
            {currentUser && currentUser.email === article.authorEmail && (
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

        {/* 评论区域 */}
        <section className="mt-12 bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl border border-cyan-500/20 p-8 backdrop-blur-sm relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              <MessageSquare className="mr-2 h-6 w-6" />
              Comments ({comments.length})
            </h2>

            {/* 评论表单 */}
            {currentUser ? (
              <form onSubmit={handleAddComment} className="mb-8">
                <div className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none backdrop-blur-sm"
                    rows="4"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm border border-cyan-500/30"
                >
                  Post Comment
                </button>
              </form>
            ) : (
              <div className="mb-8 p-6 bg-gray-800/30 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
                <p className="text-gray-400">
                  Please <Link to="/login" className="text-cyan-400 hover:text-cyan-300">log in</Link> to post a comment.
                </p>
              </div>
            )}

            {/* 评论列表 */}
            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-800/30 rounded-lg p-6 border border-cyan-500/20 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-semibold">
                            {comment.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{comment.author}</h4>
                          <p className="text-sm text-gray-400">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-gray-800/30 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                  <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Article;