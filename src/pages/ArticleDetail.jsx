import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, User, Tag, ClipboardEdit, ArrowLeft, Trash2, Edit3, Save, X } from 'lucide-react'
import { supabase } from '../../supabase-config'
import { commentService } from '../services/commentService'
import Modal from '../components/Modal'
import RichTextEditor from '../components/RichTextEditor'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-css.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/components/prism-java.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/plugins/autoloader/prism-autoloader.min.js'
import 'prismjs/themes/prism-tomorrow.min.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js'

const ArticleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentContent, setEditingCommentContent] = useState('')
  const [commentToDelete, setCommentToDelete] = useState(null)

  useEffect(() => {
    // 加载文章数据（分层存储架构）
    loadArticle()
    
    // 加载当前用户
    const user = JSON.parse(localStorage.getItem('currentUser'))
    setCurrentUser(user)
  }, [id])

  // 在文章内容更新后调用Prism.js进行代码高亮
  useEffect(() => {
    if (Prism && Prism.highlightAll) {
      try {
        // 延迟执行以确保DOM已更新
        setTimeout(() => {
          // 为所有代码块添加行号类
          const codeBlocks = document.querySelectorAll('pre code');
          codeBlocks.forEach(block => {
            block.classList.add('line-numbers');
          });
          
          // 执行代码高亮
          Prism.highlightAll();
        }, 100);
      } catch (error) {
        console.warn('Prism.js highlighting failed:', error);
      }
    }
  }, [article]);

  // 在文章内容渲染后再次执行Prism.js高亮，确保高亮正确应用
  useEffect(() => {
    if (article && Prism && Prism.highlightAll) {
      try {
        // 使用requestAnimationFrame确保DOM已更新
        const highlightCode = () => {
          // 为所有代码块添加行号类
          const codeBlocks = document.querySelectorAll('pre code');
          codeBlocks.forEach(block => {
            block.classList.add('line-numbers');
          });
          
          // 执行代码高亮
          Prism.highlightAll();
        };

        // 在DOM更新后执行高亮
        requestAnimationFrame(highlightCode);
      } catch (error) {
        console.warn('Prism.js highlighting failed:', error);
      }
    }
  }, [article]);

  // 在评论内容更新后调用Prism.js进行代码高亮
  useEffect(() => {
    if (Prism && Prism.highlightAll && comments.length > 0) {
      try {
        // 延迟执行以确保DOM已更新
        setTimeout(() => {
          // 为所有代码块添加行号类
          const codeBlocks = document.querySelectorAll('.prose pre code');
          codeBlocks.forEach(block => {
            block.classList.add('line-numbers');
          });
          
          // 执行代码高亮
          Prism.highlightAll();
        }, 100);
      } catch (error) {
        console.warn('Prism.js highlighting failed for comments:', error);
      }
    }
  }, [comments]);

  // 加载文章数据（分层存储架构）
  const loadArticle = async () => {
    try {
      // 首先尝试从localStorage获取
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
      const foundArticle = storedArticles.find(a => a.id == id)
      
      if (foundArticle) {
        // 如果localStorage中有数据，直接使用
        setArticle(foundArticle)
        // 从comments表获取评论
        try {
          const articleComments = await commentService.getCommentsByArticleId(id);
          setComments(articleComments);
        } catch (commentError) {
          console.warn('Failed to load comments from database, using empty array:', commentError);
          setComments([]);
        }
      } else {
        // 如果localStorage中没有数据，从Supabase获取
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        if (!data) throw new Error('Article not found')

        // 设置状态并缓存到localStorage
        setArticle(data)
        
        // 从comments表获取评论
        try {
          const articleComments = await commentService.getCommentsByArticleId(id);
          setComments(articleComments);
        } catch (commentError) {
          console.warn('Failed to load comments from database, using empty array:', commentError);
          setComments([]);
        }
        
        // 更新localStorage缓存
        const updatedArticles = [...storedArticles, data]
        localStorage.setItem('articles', JSON.stringify(updatedArticles))
      }
    } catch (err) {
      console.error('Error loading article:', err)
      // 出错时仍然尝试从localStorage获取
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
      const foundArticle = storedArticles.find(a => a.id == id)
      setArticle(foundArticle)
    }
  }

  // 处理添加评论（支持富文本内容）
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    try {
      // 准备评论数据
      const commentData = {
        content: newComment,
        article_id: id,
        user_id: currentUser?.id,
        user_email: currentUser?.email
      };

      // 使用commentService保存评论到数据库
      const savedComment = await commentService.addComment(commentData);

      // 更新本地状态
      setComments(prevComments => [savedComment, ...prevComments]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('添加评论失败: ' + err.message);
    }
  };

  // 开始编辑评论
  const startEditingComment = (comment) => {
    if (!currentUser || currentUser.id !== comment.user_id) {
      alert('您没有权限编辑此评论');
      return;
    }
    
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  // 取消编辑评论
  const cancelEditingComment = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  // 保存编辑后的评论
  const saveEditingComment = async () => {
    if (!editingCommentContent.trim() || !currentUser) return;

    try {
      // 使用commentService更新评论
      const updatedComment = await commentService.updateComment(
        editingCommentId,
        editingCommentContent,
        currentUser.id
      );

      // 更新本地状态
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === editingCommentId ? updatedComment : comment
        )
      );

      // 重置编辑状态
      setEditingCommentId(null);
      setEditingCommentContent('');
    } catch (err) {
      console.error('Error updating comment:', err);
      alert('更新评论失败: ' + err.message);
    }
  };

  // 处理删除评论
  const handleDeleteComment = async (commentId) => {
    if (!currentUser) {
      alert('请先登录');
      return;
    }

    try {
      // 使用commentService删除评论
      await commentService.deleteComment(commentId, currentUser.id);

      // 更新本地状态
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('删除评论失败: ' + err.message);
    }
  };

  // 处理删除文章
  const handleDelete = async () => {
    if (!currentUser || currentUser.id !== article.author_id) {
      alert('您没有权限删除这篇文章')
      return
    }

    // 打开确认删除弹窗
    setIsDeleteModalOpen(true)
  }

  // 确认删除文章
  const confirmDelete = async () => {
    try {
      // 关闭弹窗
      setIsDeleteModalOpen(false)
      
      // 从Supabase删除文章
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // 从localStorage中移除文章
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
      const updatedArticles = storedArticles.filter(a => a.id != id)
      localStorage.setItem('articles', JSON.stringify(updatedArticles))
      
      // 显示删除成功消息并导航到文章列表页
      alert('文章已成功删除')
      navigate('/articles')
    } catch (err) {
      console.error('Error deleting article:', err)
      alert('删除文章失败: ' + err.message)
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <Link to="/articles" className="text-cyan-400 hover:text-cyan-300">
            Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 bg-[length:40px_40px] py-4 sm:py-8">
      {/* 删除确认弹窗 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="确认删除"
        confirmText="删除"
        cancelText="取消"
      >
        <p>确定要删除这篇文章吗？此操作不可恢复。</p>
      </Modal>
      
      {/* 评论删除确认弹窗 */}
      <Modal
        isOpen={!!commentToDelete}
        onClose={() => setCommentToDelete(null)}
        onConfirm={() => {
          handleDeleteComment(commentToDelete.id)
          setCommentToDelete(null)
        }}
        title="Delete Comment"
        confirmText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this comment?</p>
      </Modal>
      <div className="container mx-auto px-6 max-w-4xl">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link 
            to="/articles" 
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-70 -z-10"></div>
          <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 text-cyan-400 border border-cyan-500/30">
                {article.category}
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                {article.title}
              </h1>
              {currentUser && currentUser.id === article.author_id && (
                <div className="flex gap-2">
                  <Link
                    to={`/edit-article/${article.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <ClipboardEdit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm text-gray-500">
                  Published on {new Date(article.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Thumbnail */}
        {article.thumbnail && (
          <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-1 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 bg-[length:40px_40px] pointer-events-none"></div>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-magenta-500/5 rounded-2xl blur-xl opacity-20 -z-10"></div>
          <div className="relative bg-gradient-to-br from-cyan-500/5 to-magenta-500/5 border border-cyan-500/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-magenta-500/5 rounded-2xl blur-xl opacity-20 -z-10"></div>
            <div className="relative bg-gradient-to-br from-cyan-500/5 to-magenta-500/5 border border-cyan-500/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300 hover:text-cyan-200 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="border-t border-cyan-500/20 pt-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-magenta-500/5 rounded-2xl blur-xl opacity-20 -z-10"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent mb-6">
                Comments ({comments.length})
              </h2>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                    <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {comment.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="text-white font-medium">{comment.author}</span>
                          <span className="text-gray-500 text-sm ml-2">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {currentUser && currentUser.id === comment.user_id && (
                          <div className="ml-auto flex space-x-2">
                            <button
                              onClick={() => startEditingComment(comment)}
                              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                              title="Update Comment"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setCommentToDelete(comment)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete Comment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {editingCommentId === comment.id ? (
                        // 编辑评论界面
                        <div className="mt-4">
                          <RichTextEditor
                            content={editingCommentContent}
                            setContent={setEditingCommentContent}
                            isEdit={false}
                            isFullScreen={false}
                          />
                          <div className="flex justify-end space-x-2 mt-4">
                            <button
                              onClick={cancelEditingComment}
                              className="px-2 py-2 text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                            <button
                              onClick={saveEditingComment}
                              className="px-2 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white rounded-lg transition-all flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              Update
                            </button>
                          </div>
                        </div>
                      ) : (
                        // 显示评论内容
                        <div className="prose prose-invert max-w-none pl-2 border-cyan-500/30">
                          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <div className="text-center py-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-30 -z-10"></div>
                    <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                      <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Add Comment Form */}
              {currentUser ? (
                <form onSubmit={handleAddComment} className="mt-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-30 -z-10"></div>
                  <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex flex-col flex-grow w-full mb-4">
                      <RichTextEditor 
                        content={newComment}
                        setContent={setNewComment}
                        isEdit={false}
                        isFullScreen={false}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/30"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-2xl blur-xl opacity-30 -z-10"></div>
                  <div className="relative bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-gray-400 mb-4">Please log in to leave a comment</p>
                    <Link
                      to="/login"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/30"
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ArticleDetail