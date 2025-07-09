<template>
  <div class="submit-container">
    <div class="header">
      <h1 class="title">提交挑战作品</h1>
      <p class="subtitle">请提交您的代码仓库和在线演示地址</p>
    </div>
    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="repoUrl">GitHub 仓库 URL</label>
        <input 
          type="text" 
          id="repoUrl" 
          v-model="formData.repoUrl" 
          placeholder="https://github.com/your-username/repo-name"
          :class="{ 'is-invalid': errors.repoUrl }"
        />
        <div class="error-message" v-if="errors.repoUrl">
          {{ errors.repoUrl }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="vercelUrl">Vercel 在线演示地址</label>
        <input 
          type="text" 
          id="vercelUrl" 
          v-model="formData.vercelUrl" 
          placeholder="https://your-project.vercel.app"
          :class="{ 'is-invalid': errors.vercelUrl }"
        />
        <div class="error-message" v-if="errors.vercelUrl">
          {{ errors.vercelUrl }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="notes">附加说明（可选）</label>
        <textarea 
          id="notes" 
          v-model="formData.notes" 
          rows="4" 
          placeholder="请输入您的附加说明（如功能亮点、技术选型等）"
        ></textarea>
      </div>
      
      <div class="actions">
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? '提交中...' : '提交作品' }} <i class="fa fa-paper-plane ml-2"></i>
        </button>
      </div>
    </form>
    
    <div v-if="submissionSuccess" class="success-message">
      <div class="icon-container">
        <i class="fa fa-check-circle"></i>
      </div>
      <h2>提交成功！</h2>
      <p>我们已收到您的作品，将在3个工作日内进行评估</p>
      <p class="candidate-id">候选人ID: {{ candidateId }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()

const formData = reactive({
  repoUrl: '',
  vercelUrl: '',
  notes: ''
})

const errors = reactive({
  repoUrl: '',
  vercelUrl: ''
})

const loading = ref(false)
const submissionSuccess = ref(false)
const candidateId = ref('')

onMounted(() => {
  // 获取候选人ID
  const storedId = localStorage.getItem('candidate_id')
  if (storedId) {
    candidateId.value = storedId
  } else {
    // 如果没有候选人ID，重定向到欢迎页
    router.push('/')
  }
})

const validateForm = () => {
  let isValid = true
  
  if (!formData.repoUrl.trim()) {
    errors.repoUrl = '请输入GitHub仓库URL'
    isValid = false
  } else if (!/^https?:\/\/github\.com\/.+\/.+$/.test(formData.repoUrl)) {
    errors.repoUrl = '请输入有效的GitHub仓库URL'
    isValid = false
  } else {
    errors.repoUrl = ''
  }
  
  if (!formData.vercelUrl.trim()) {
    errors.vercelUrl = '请输入Vercel在线演示地址'
    isValid = false
  } else if (!/^https?:\/\/.+vercel\.app$/.test(formData.vercelUrl)) {
    errors.vercelUrl = '请输入有效的Vercel在线演示地址'
    isValid = false
  } else {
    errors.vercelUrl = ''
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    // 更新Supabase中的候选人数据
    const { error } = await supabase
      .from('interview_candidates')
      .update({
        repo_url: formData.repoUrl,
        vercel_url: formData.vercelUrl,
        notes: formData.notes,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      })
      .eq('id', candidateId.value)
    
    if (error) {
      throw new Error(error.message)
    }
    
    // 显示成功消息
    submissionSuccess.value = true
    
    // 5秒后跳转到感谢页
    setTimeout(() => {
      router.push('/thank-you')
    }, 5000)
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.submit-container {
  max-width: 600px;
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

.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #007bff;
}

.is-invalid {
  border-color: #dc3545 !important;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 6px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.actions {
  text-align: center;
  margin-top: 30px;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #0069d9;
}

.btn-submit:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.ml-2 {
  margin-left: 8px;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  margin-top: 30px;
}

.icon-container {
  font-size: 48px;
  margin-bottom: 20px;
  color: #28a745;
}

.success-message h2 {
  font-size: 22px;
  margin-bottom: 10px;
}

.success-message p {
  font-size: 16px;
  margin-bottom: 8px;
}

.candidate-id {
  font-weight: bold;
  margin-top: 15px;
}
</style>    