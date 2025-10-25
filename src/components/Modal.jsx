import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* 弹窗容器 */}
      <div 
        className="relative bg-gradient-to-br from-secondary to-secondary/80 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 w-full max-w-md overflow-hidden z-10 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 pattern-grid pattern-cyan-400 pattern-bg-brand-dark pattern-opacity-5 pattern-size-20 pointer-events-none"></div>
        
        {/* 头部 */}
        <div className="relative border-b border-cyan-500/20 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="relative p-6">
          <div className="text-gray-300">
            {children}
          </div>
        </div>
        
        {/* 操作按钮 */}
        <div className="relative border-t border-cyan-500/20 p-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors border border-gray-700"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/30"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;