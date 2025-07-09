<template>
  <div class="challenge-container">
    <div class="header">
      <h1 class="title">接受面试挑战</h1>
      <p class="subtitle">请填写以下信息开始挑战</p>
    </div>
    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="githubId">GitHub ID</label>
        <div class="input-wrapper">
          <span class="prefix">https://github.com/</span>
          <input 
            type="text" 
            id="githubId" 
            v-model="formData.githubId" 
            placeholder="请输入您的GitHub用户名"
            :class="{ 'is-invalid': errors.githubId }"
          />
          <div class="error-message" v-if="errors.githubId">
            {{ errors.githubId }}
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">电子邮箱</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          placeholder="请输入您的电子邮箱"
          :class="{ 'is-invalid': errors.email }"
        />
        <div class="error-message" v-if="errors.email">
          {{ errors.email }}
        </div>
      </div>
      
      <div class="actions">
        <button type="submit" class="btn-submit">
          开始挑战 <i class="fa fa-rocket ml-2"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()

const formData = reactive({
  githubId: '',
  email: ''
})

const errors = reactive({
  githubId: '',
  email: ''
})

const loading = ref(false)

const validateForm = () => {
  let isValid = true
  
  if (!formData.githubId.trim()) {
    errors.githubId = '请输入GitHub ID'
    isValid = false
  } else if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(formData.githubId)) {
    errors.githubId = 'GitHub ID格式不正确'
    isValid = false
  } else {
    errors.githubId = ''
  }
  
  if (!formData.email.trim()) {
    errors.email = '请输入电子邮箱'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = '电子邮箱格式不正确'
    isValid = false
  } else {
    errors.email = ''
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    // 提交到Supabase
    const { data, error } = await supabase
      .from('interview_candidates')
      .insert([{
        github_id: formData.githubId,
        email: formData.email,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select()
    
    if (error) {
      throw new Error(error.message)
    }
    
    // 存储候选人ID到本地存储
    localStorage.setItem('candidate_id', data[0].id)
    
    router.push('/submit')
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.challenge-container {
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

.input-wrapper {
  display: flex;
  align-items: center;
}

.prefix {
  padding: 8px 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  color: #666;
  font-size: 14px;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s;
}

input:focus {
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

.actions {
  text-align: center;
  margin-top: 30px;
}

.btn-submit {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #218838;
}

.btn-submit:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.ml-2 {
  margin-left: 8px;
}
</style>    