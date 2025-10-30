// commentService.js
// 评论服务层，提供评论相关的数据操作方法

import { supabase } from '../../supabase-config';

export const commentService = {
  // 获取文章的所有评论
  getCommentsByArticleId: async (articleId) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          user_email,
          profiles (username)
        `)
        .eq('article_id', articleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // 格式化评论数据
      const formattedComments = data.map(comment => ({
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        author: comment.profiles?.username || comment.user_email || 'Anonymous',
        user_id: comment.user_id
      }));
      
      return formattedComments;
    } catch (err) {
      console.error('Error loading comments:', err);
      throw err;
    }
  },

  // 添加新评论
  addComment: async (commentData) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([commentData])
        .select(`
          id,
          content,
          created_at,
          user_id,
          user_email,
          profiles (username)
        `)
        .single();

      if (error) throw error;
      
      // 格式化返回的评论数据
      const formattedComment = {
        id: data.id,
        content: data.content,
        created_at: data.created_at,
        author: data.profiles?.username || data.user_email || 'Anonymous',
        user_id: data.user_id
      };
      
      return formattedComment;
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  },

  // 删除评论
  deleteComment: async (commentId, userId) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', userId);

      if (error) throw error;
      
      return true;
    } catch (err) {
      console.error('Error deleting comment:', err);
      throw err;
    }
  }
};