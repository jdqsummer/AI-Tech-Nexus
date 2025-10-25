// Supabase 配置与客户端初始化（浏览器端 ESM）
// 使用前请将下方两个常量替换为你自己的 Supabase 项目配置
// 获取方式：Supabase 项目 -> Project Settings -> API -> Project URL 与 anon 公钥

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// 配置管理：支持环境变量和本地配置
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 验证配置
if (!SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL' || 
    !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    
    console.error('❌ Supabase configuration missing!');
    console.error('Please set up your Supabase project:');
    console.error('1. Go to https://supabase.com and create a new project');
    console.error('2. Get your Project URL and anon key from Project Settings > API');
    console.error('3. Replace the placeholder values in supabase-config.js');
    
    // 创建配置指南页面
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        setTimeout(() => {
            const guideHtml = `
                <div style="position: fixed; top: 0; left: 0; right: 0; background: #ff6b6b; color: white; padding: 1rem; z-index: 1000; text-align: center;">
                    <strong>Configuration Required:</strong> Please set up your Supabase project to enable authentication features. 
                    <a href="#" onclick="showSetupGuide()" style="color: white; text-decoration: underline; margin-left: 1rem;">Show Setup Guide</a>
                </div>
                <div id="setup-guide" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1001; max-width: 500px; width: 90%;">
                    <h3>Supabase Setup Guide</h3>
                    <ol>
                        <li>Go to <a href="https://supabase.com" target="_blank">Supabase.com</a> and create a free account</li>
                        <li>Create a new project</li>
                        <li>Go to Project Settings > API</li>
                        <li>Copy the Project URL and anon public key</li>
                        <li>Replace the placeholder values in <code>supabase-config.js</code></li>
                    </ol>
                    <button onclick="hideSetupGuide()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
                </div>
            `;
            
            if (!document.getElementById('setup-guide')) {
                document.body.insertAdjacentHTML('beforeend', guideHtml);
                
                // 添加全局函数
                window.showSetupGuide = function() {
                    document.getElementById('setup-guide').style.display = 'block';
                };
                
                window.hideSetupGuide = function() {
                    document.getElementById('setup-guide').style.display = 'none';
                };
            }
        }, 1000);
    }
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});


