import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase-config';
import { ArrowLeft, Lock } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 从URL中获取重置令牌
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        setToken(token);
      } else {
        setError('Invalid password reset link');
      }
    } else {
      setError('Invalid password reset link');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // 更新密码
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      setMessage('Password has been successfully reset. You can now sign in with your new password.');
      
      // 3秒后跳转到登录页面
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 flex items-center justify-center">
      {/* 添加渐变背景层 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
      
      <div className="w-full max-w-md px-6 relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            Set New Password
          </h1>
          <p className="text-gray-400">Create a new password for your account</p>
        </div>

        <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-cyan-500/20 rounded-lg p-8 backdrop-blur-sm relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            {error && (
              <div className="mb-6 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-green-400 text-sm">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm disabled:opacity-50"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">At least 6 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm disabled:opacity-50"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 disabled:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 border border-cyan-500/30"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group">
                <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;