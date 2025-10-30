// 图片上传服务
const imageUploadService = {
  /**
   * 上传图片到服务器
   * @param {File} file - 要上传的图片文件
   * @returns {Promise<string>} 上传后的图片URL
   */
  uploadImage: async (file) => {
    // 这里应该实现实际的图片上传逻辑
    // 目前返回一个模拟的URL
    
    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('不支持的文件类型，请上传 JPG、PNG、GIF 或 WebP 格式的图片');
    }
    
    // 检查文件大小 (最大2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      throw new Error('文件大小超过限制，最大支持2MB');
    }
    
    // 模拟上传过程
    return new Promise((resolve, reject) => {
      // 在实际应用中，这里应该是真正的上传逻辑
      // 例如使用fetch或axios发送请求到服务器
      
      // 模拟上传延迟
      setTimeout(() => {
        // 生成一个模拟的URL (在实际应用中应从服务器返回)
        const mockUrl = URL.createObjectURL(file);
        resolve(mockUrl);
      }, 1000);
    });
  },
  
  /**
   * 批量上传图片
   * @param {FileList|Array<File>} files - 要上传的图片文件列表
   * @returns {Promise<Array<string>>} 上传后的图片URL数组
   */
  uploadImages: async (files) => {
    const uploadPromises = Array.from(files).map(file => imageUploadService.uploadImage(file));
    return Promise.all(uploadPromises);
  }
};

export default imageUploadService;