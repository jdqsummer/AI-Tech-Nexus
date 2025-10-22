// userService.js
// 用户服务层，提供用户相关的数据操作方法

import { supabase } from '../../supabase-config';

export const userService = {
  // 获取当前用户信息
  getCurrentUser: async () => {
    try {
      // 获取当前用户会话
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      // 从Supabase获取用户信息
      const { data: userData, error: userError } = await supabase
        .from('profiles')  // 使用profiles表而不是users表
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError) {
        // 如果profiles表中没有用户数据，创建一个新的用户档案
        console.warn('No profile found in profiles table, creating new profile for user:', session.user.id, session.user);
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: session.user.id,
              username: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'user',
              avatar_url: session.user.user_metadata?.avatar_url || '',
              updated_at: new Date().toISOString(),
              created_at: session.user.created_at || new Date().toISOString()
            }
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        return newProfile;
      }

      return userData;
    } catch (err) {
      console.error('Error fetching user data:', err);
      throw err;
    }
  },

  // 更新用户信息
  updateProfile: async (userId, updates) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  },

  // 创建用户档案
  createProfile: async (userData) => {
    try {
      console.warn('Creating new profile for user:', userData);
      const { data, error } = await supabase
        .from('profiles')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error creating profile:', err);
      throw err;
    }
  }
};