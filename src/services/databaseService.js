// databaseService.js
// 数据库服务层，提供文章相关的数据操作方法

import { supabase } from '../../supabase-config';

export const articleService = {
  // 获取所有文章
  getArticles: async () => {
    try {
      // 首先尝试从localStorage获取
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
      
      if (storedArticles.length > 0) {
        // 如果localStorage中有数据，直接返回
        return storedArticles;
      } else {
        // 如果localStorage中没有数据，从Supabase获取
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // 缓存到localStorage
        localStorage.setItem('articles', JSON.stringify(data || []));
        
        return data || [];
      }
    } catch (err) {
      console.error('Error loading articles:', err);
      // 出错时仍然尝试从localStorage获取
      return JSON.parse(localStorage.getItem('articles') || '[]');
    }
  },

  // 根据ID获取文章
  getArticleById: async (id) => {
    try {
      // 首先尝试从localStorage获取
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
      const foundArticle = storedArticles.find(article => article.id == id);
      
      if (foundArticle) {
        // 如果localStorage中有数据，直接返回
        return foundArticle;
      } else {
        // 如果localStorage中没有数据，从Supabase获取
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Article not found');

        // 更新localStorage缓存
        const updatedArticles = [...storedArticles, data];
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
        
        return data;
      }
    } catch (err) {
      console.error('Error loading article:', err);
      throw err;
    }
  },

  // 根据作者ID获取文章
  getArticlesByAuthor: async (authorId) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('author_id', authorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data || [];
    } catch (err) {
      console.error('Error loading articles by author:', err);
      throw err;
    }
  },

  // 创建新文章
  createArticle: async (article) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([article])
        .select()
        .single();

      if (error) throw error;

      // 更新localStorage缓存
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
      const updatedArticles = [data, ...storedArticles];
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      
      return data;
    } catch (err) {
      console.error('Error creating article:', err);
      throw err;
    }
  },

  // 更新文章
  updateArticle: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // 更新localStorage缓存
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
      const updatedArticles = storedArticles.map(article => 
        article.id == id ? { ...article, ...data } : article
      );
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      
      return data;
    } catch (err) {
      console.error('Error updating article:', err);
      throw err;
    }
  },

  // 删除文章
  deleteArticle: async (id) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // 更新localStorage缓存
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
      const updatedArticles = storedArticles.filter(article => article.id != id);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      
      return true;
    } catch (err) {
      console.error('Error deleting article:', err);
      throw err;
    }
  }
};