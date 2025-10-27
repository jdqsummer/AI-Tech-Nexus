import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ChevronRight } from 'lucide-react';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);

  useEffect(() => {
    // 获取文章数据
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // 设置特色文章（最新文章）
    if (storedArticles.length > 0) {
      const sortedArticles = [...storedArticles].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      setFeaturedArticle(sortedArticles[0]);
      setArticles(sortedArticles); // 显示所有文章
    }
  }, []);

  // 格式化日期显示
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  return (
    <div className="min-h-screen bg-brand-dark pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* 背景图片 */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://r2.flowith.net/files/png/YC7WV-tech_article_thumbnail_concept_index_1@1024x1024.png" 
            alt="AI Tech Nexus Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/80"></div>
        </div>
        
        {/* 添加渐变背景层 */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-magenta-500/5 to-transparent opacity-70"></div>
        
        {/* 内容 */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              Explore the Future of <span className="text-cyan-400">AI Technology</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover cutting-edge insights, tutorials, and news in artificial intelligence, 
              machine learning, and emerging technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/articles" 
                className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center backdrop-blur-sm border border-cyan-500/30"
              >
                View Articles
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredArticle && (
        <section className="py-16 bg-gradient-to-br from-brand-dark-secondary/50 to-brand-dark/50 relative">
          {/* 添加网格背景效果 */}
          <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">Featured Article</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-magenta-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl overflow-hidden shadow-xl border border-cyan-500/20 backdrop-blur-sm relative">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              
              <div className="md:flex relative z-10">
                <div className="md:w-1/2">
                  <img 
                    src={featuredArticle.thumbnail || "https://r2.flowith.net/files/png/YC7WV-tech_article_thumbnail_concept_index_1@1024x1024.png"} 
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{featuredArticle.title}</h3>
                  <p className="text-gray-300 mb-6">{featuredArticle.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-400">{featuredArticle.author}</span>
                      <Calendar className="h-5 w-5 text-gray-400 ml-4 mr-2" />
                      <span className="text-gray-400">{formatDate(featuredArticle.created_at)}</span>
                    </div>
                    <Link 
                      to={`/article/${featuredArticle.id}`}
                      className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-cyan-500/30 backdrop-blur-sm border border-cyan-500/30"
                    >
                      Read More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="py-16 bg-gradient-to-br from-brand-dark/50 to-brand-dark-secondary/50 relative">
        {/* 添加网格背景效果 */}
        <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-10 pattern-size-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">Latest Articles</h2>
              <p className="text-gray-400">Stay up to date with our latest publications</p>
            </div>
            <Link 
              to="/articles" 
              className="mt-4 md:mt-0 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 flex items-center backdrop-blur-sm border border-cyan-500/30"
            >
              View All Articles
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div key={article.id} className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl overflow-hidden shadow-lg border border-cyan-500/20 hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 group backdrop-blur-sm relative">
                    {/* 添加网格图案覆盖层 */}
                    <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="relative">
                      <img 
                        src={article.thumbnail || "https://r2.flowith.net/files/png/YC7WV-tech_article_thumbnail_concept_index_1@1024x1024.png"} 
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-3">{article.summary}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags && article.tags.slice(0, 3).map((tag, index) => (
                      <span key={tag} className="flex items-center text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded backdrop-blur-sm border border-gray-700">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                      <div className="flex flex-col justify-start gap-3 mt-4 pt-4 border-t border-gray-700/50">
                        
                        <div className="flex flex-row items-center space-x-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        
                        <div className="flex flex-row justify-between items-center space-x-2 text-sm text-gray-500">
                          
                          <div className="flex flex-row justify-start items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.created_at)}</span>
                          </div>
                          
                          <div className="flex justify-end">
                            <Link 
                            to={`/article/${article.id}`}
                            className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center"
                            >
                              Read More
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                          
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              {/* 添加网格图案覆盖层 */}
              <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-gray-400">No articles found. Check back later for new content!</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;