<template>
  <div class="guide-container">
    <div class="header">
      <h1 class="title">面试流程指南</h1>
      <p class="subtitle">请仔细阅读以下内容</p>
    </div>
    <div class="markdown-content" v-html="renderedMarkdown"></div>
    <div class="footer">
      <button class="btn-next" @click="nextStep">
        我已了解，开始挑战 <i class="fa fa-arrow-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'

const router = useRouter()
const md = new MarkdownIt()

const markdownText = `
# 欢迎参加无限状态前端开发面试

## 面试流程

1. **填写基本信息**  
   提供您的GitHub ID和邮箱

2. **完成挑战任务**  
   - 基于提供的设计稿实现一个响应式页面
   - 使用Vue3 + TypeScript + Tailwind CSS
   - 部署到Vercel并提交链接

## 评估标准

我们将从以下方面评估您的解决方案：

- 代码质量和架构
- 响应式设计实现
- 视觉表现和交互效果
- 性能优化
- 错误处理和用户体验

## 时间限制

您有48小时完成挑战任务，请在截止时间前提交。

## 帮助与支持

如有任何问题，请联系：hr@infinitestate.com
`

const renderedMarkdown = md.render(markdownText)

const nextStep = () => {
  router.push('/challenge')
}
</script>

<style scoped>
.guide-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.markdown-content {
  flex: 1;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 40px;
}

.markdown-content h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.markdown-content h2 {
  font-size: 18px;
  color: #444;
  margin-top: 30px;
  margin-bottom: 15px;
}

.markdown-content p {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
}

.markdown-content ul {
  margin-left: 20px;
  margin-bottom: 20px;
}

.markdown-content li {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 8px;
}

.footer {
  text-align: center;
}

.btn-next {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-next:hover {
  background-color: #0069d9;
}

.ml-2 {
  margin-left: 8px;
}
</style>    