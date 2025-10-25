import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase-config';
import { articleService } from '../services/databaseService';
import { userService } from '../services/userService';
import { LogOut, Edit, User, Mail, Calendar, Hash, Eye } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userArticles, setUserArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    created_at: ''
  });
  const [stats, setStats] = useState({
    articles: 0,
    views: 0,
    comments: 0
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  // 分层存储架构：读取数据时优先从localStorage获取，如果没有再从Supabase获取
  const fetchUserData = async () => {
    try {
      // 获取当前用户会话
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      // 优先从localStorage获取用户信息
      const cachedUser = localStorage.getItem('currentUser');
      if (cachedUser) {
        const parsedUser = JSON.parse(cachedUser);
        if (parsedUser.id === session.user.id) {
          setUser(parsedUser);
          setFormData({
            username: parsedUser.username || '',
            email: session.user.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            created_at: parsedUser.created_at || ''
          });
        }
      }

      // 从localStorage获取用户文章
      const cachedArticles = localStorage.getItem('userArticles');
      let articles = [];
      if (cachedArticles) {
        articles = JSON.parse(cachedArticles);
        setUserArticles(articles);
      }

      // 从Supabase获取用户信息（如果localStorage中没有或需要更新）
      if (!user) {
        try {
          const userData = await userService.getCurrentUser();
          setUser(userData);
          setFormData({
            username: userData.username || '',
            email: session.user.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            created_at: userData.updated_at || ''
          });
          // 缓存到localStorage
          localStorage.setItem('currentUser', JSON.stringify(userData));
        } catch (userError) {
          console.error('Error fetching user data:', userError);
          setError('Failed to fetch user data');
          return;
        }
      }

      // 从Supabase获取用户文章（如果localStorage中没有或需要更新）
      if (articles.length === 0) {
        articles = await articleService.getArticlesByAuthor(session.user.id);
        setUserArticles(articles);
        // 缓存到localStorage
        localStorage.setItem('userArticles', JSON.stringify(articles));
      }

      // 计算统计数据
      const articleCount = articles.length;
      const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);
      const totalComments = articles.reduce((sum, article) => sum + (article.comments?.length || 0), 0);
      
      setStats({
        articles: articleCount,
        views: totalViews,
        comments: totalComments
      });
    } catch (err) {
      setError('Failed to fetch user data');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');

      // 更新用户元数据到Supabase
      const updates = {
        data: {
          username: formData.username
        }
      };

      const { error: authError } = await supabase.auth.updateUser(updates);
      
      if (authError) throw authError;

      // 更新数据库中的用户信息
      const { error: dbError } = await userService.updateProfile(user.id, { 
        username: formData.username
      });

      if (dbError) throw dbError;

      // 如果提供了新密码，则更新密码
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }

        const { error: pwdError } = await supabase.auth.updateUser({
          password: formData.newPassword
        });

        if (pwdError) throw pwdError;
      }

      // 更新用户状态
      const updatedUser = {
        ...user,
        username: formData.username
      };
      setUser(updatedUser);
      
      // 更新localStorage缓存
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 flex items-center justify-center">
        {/* 添加渐变背景层 */}
        <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 flex items-center justify-center">
        {/* 添加渐变背景层 */}
        <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
        <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-6 max-w-md w-full backdrop-blur-sm relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
          <div className="relative z-10">
            <p className="text-red-400 text-center">{error}</p>
            <button
              onClick={() => setError('')}
              className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 border border-cyan-500/30"
            >
              Try Again
            </button>
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-400 border border-red-500/50 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm relative">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                    Personal Information
                  </h2>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 hover:from-cyan-500/30 hover:to-magenta-500/30 text-cyan-400 border border-cyan-500/50 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  >
                    {editing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    <span>{editing ? 'Cancel' : 'Edit'}</span>
                  </button>
                </div>

                {editing ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                        placeholder="Your username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                        className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm opacity-50"
                        placeholder="Your email"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Email cannot be changed
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm pr-12"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 border border-cyan-500/30 disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <Save className="h-5 w-5" />
                        )}
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-gray-600/50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 p-3 rounded-full border border-cyan-500/30">
                        <User className="h-8 w-8 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{formData.username}</h3>
                        <p className="text-gray-400">{formData.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-cyan-400" />
                          <div>
                            <p className="text-sm text-gray-400">Member Since</p>
                            <p className="text-white">
                              {formData.created_at ? new Date(formData.created_at).toLocaleDateString() : 'Unknown'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm relative">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                  Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Articles</span>
                    <span className="text-white font-medium">{stats.articles}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Comments</span>
                    <span className="text-white font-medium">{stats.comments}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm relative">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                  Account Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400">Email Verified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400">Active Account</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;