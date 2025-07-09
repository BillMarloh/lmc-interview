<template>
  <div class="welcome-container">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="无限状态Logo" class="logo" />
    </div>
    <h1 class="title">欢迎参加无限状态线上面试</h1>
    <p class="subtitle">我们期待你的精彩表现</p>
    <div class="progress-indicator">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="countdown" v-if="countdown > 0">
      自动跳转中 <span class="countdown-number">{{ countdown }}</span>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(3)
const progress = ref(0)
let timer = null

onMounted(() => {
  // 进度条动画
  const interval = setInterval(() => {
    progress.value += 1
    if (progress.value >= 100) clearInterval(interval)
  }, 30)

  // 倒计时跳转
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      router.push('/guide')
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
}

.logo-container {
  margin-bottom: 30px;
}

.logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
}

.progress-indicator {
  width: 300px;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.countdown {
  font-size: 16px;
  color: #999;
}

.countdown-number {
  font-weight: bold;
  color: #007bff;
}
</style>    