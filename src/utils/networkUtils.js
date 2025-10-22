// 网络请求工具函数
export const networkUtils = {
  // 检查网络连接状态
  isOnline: () => {
    return navigator.onLine;
  },

  // 带超时的fetch请求
  fetchWithTimeout: (url, options = {}, timeout = 10000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      )
    ]);
  },

  // 带超时的Supabase请求
  supabaseRequestWithTimeout: async (supabasePromise, timeout = 10000) => {
    return Promise.race([
      supabasePromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      )
    ]);
  }
};