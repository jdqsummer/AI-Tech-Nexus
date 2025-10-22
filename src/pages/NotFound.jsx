import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 flex items-center justify-center">
      {/* 添加渐变背景层 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-magenta-500/5 to-transparent pointer-events-none"></div>
      
      <div className="text-center relative">
        {/* 添加网格图案覆盖层 */}
        <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none -z-10"></div>
        
        <div className="mb-6 relative">
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto backdrop-blur-sm animate-pulse relative">
            <AlertTriangle className="h-12 w-12 text-cyan-400" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          Page Not Found
        </p>
        
        <p className="text-gray-400 mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white rounded-lg transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 border border-cyan-500/30"
          >
            Go Home
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 font-medium transform hover:scale-105 backdrop-blur-sm border border-gray-600/50"
          >
            Go Back
          </button>
        </div>
        
        <div className="mt-12 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm max-w-md mx-auto relative">
          {/* 添加网格图案覆盖层 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none rounded-lg"></div>
          
          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-white mb-3">Need Help?</h2>
            <p className="text-gray-400 mb-4">
              If you believe this is an error, please contact our support team.
            </p>
            <Link 
              to="/contact" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium group"
            >
              Contact Support 
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;