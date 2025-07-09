import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import GuideView from '../views/GuideView.vue'
import ChallengeView from '../views/ChallengeView.vue'
import SubmitView from '../views/SubmitView.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView
  },
  {
    path: '/guide',
    name: 'Guide',
    component: GuideView
  },
  {
    path: '/challenge',
    name: 'Challenge',
    component: ChallengeView
  },
  {
    path: '/submit',
    name: 'Submit',
    component: SubmitView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router    