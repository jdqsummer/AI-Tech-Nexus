import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { supabase } from '../supabase-config.js'

// 初始化示例数据
const initializeSampleData = () => {
  // 初始化文章数据
  // 如果localStorage中不存在articles数据，则初始化示例数据
  if (!localStorage.getItem('articles')) {
    const sampleArticles = [] // 暂时为空
    localStorage.setItem('articles', JSON.stringify(sampleArticles))
  }

  // 初始化主题偏好
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark')
  }
}

// 初始化CSS变量
const initializeCSSVariables = () => {
  const root = document.documentElement
  
  // 设置主题相关CSS变量
  root.style.setProperty('--primary-bg', '#0A0F1E')
  root.style.setProperty('--secondary-bg', '#10162A')
  root.style.setProperty('--text-primary', '#E0E6F1')
  root.style.setProperty('--text-secondary', '#94a3b8')
  root.style.setProperty('--accent-color', '#22d3ee')
  
  // 应用主题
  const savedTheme = localStorage.getItem('theme') || 'dark'
  document.documentElement.classList.toggle('dark', savedTheme === 'dark')
}

// 初始化应用
const initializeApp = () => {
  initializeSampleData()
  initializeCSSVariables()
}

// 渲染应用
const root = ReactDOM.createRoot(document.getElementById('root'))

initializeApp()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
