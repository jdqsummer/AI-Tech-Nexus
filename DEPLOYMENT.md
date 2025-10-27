# 部署到Zeabur平台指南

本文档提供了将AI Tech Nexus应用程序部署到Zeabur平台的详细步骤。

## 部署前准备

1. 确保你已经在Zeabur平台创建了账户
2. 准备好你的Supabase项目配置信息：
   - Supabase Project URL
   - Supabase Anon Key

## 部署步骤

### 1. 在Zeabur上创建服务

1. 登录到 [Zeabur](https://zeabur.com)
2. 点击 "New Project"
3. 选择 "Import from GitHub" 或上传代码
4. 选择你的AI Tech Nexus代码仓库

### 2. 配置环境变量

在Zeabur项目设置中，添加以下环境变量：

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 配置构建设置

Zeabur会自动检测到`zeabur.json`配置文件并使用以下设置：

- 构建命令: `npm run build`
- 输出目录: `dist`
- 运行命令: `npm run preview`
- 端口: `3000`

### 4. 部署

1. 点击 "Deploy" 按钮开始部署
2. 等待构建和部署完成
3. 部署成功后，Zeabur会提供一个URL访问你的应用

## 本地开发与生产环境的区别

- 本地开发使用 `npm run dev` 启动开发服务器
- 生产环境使用 `npm run build` 构建应用，然后使用 `npm run preview` 运行

## 跨平台兼容性说明

为了确保应用在不同操作系统上都能正常构建和部署，请注意以下几点：

1. 确保所有脚本使用跨平台兼容的语法
2. 检查是否有Windows特定的路径分隔符或命令
3. 在Zeabur的构建设置中明确指定Node.js版本（推荐使用LTS版本）
4. 使用`npx`而不是`npm exec`执行本地安装的CLI工具，避免权限问题

## 故障排除

如果遇到问题，请检查：

1. 环境变量是否正确配置
2. Supabase配置是否正确
3. 构建过程中是否有错误信息
4. 确保所有依赖都已正确安装
5. 检查是否存在跨平台兼容性问题
6. 检查是否有权限问题导致命令无法执行（特别是在Linux环境中）
7. 确保使用了正确的Node.js版本（推荐18.17.0 LTS）

### 权限问题解决方案

如果在Zeabur部署时遇到"vite: Permission denied"错误，请尝试以下解决方案：

1. 确保package.json中的build脚本使用`node node_modules/vite/bin/vite.js build`而不是其他形式
2. 在zeabur.json中明确指定Node.js版本为18.17.0
3. 确保zeabur.json中的构建命令包含`npm install && npm run build`
4. 检查项目中是否有任何平台特定的依赖或配置
5. 如果问题仍然存在，尝试在zeabur.json中添加环境变量：`"PATH": "/usr/local/bin:/usr/bin:/bin"`

## 支持

如有任何问题，请联系项目维护者或查看相关文档。