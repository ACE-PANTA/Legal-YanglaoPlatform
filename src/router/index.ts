import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'basicInfHome',
          component: () => import('../views/BasicInfView.vue'),
        },
        {
          path: 'basicInf',
          name: 'basicInf',
          component: () => import('../views/BasicInfView.vue'),
        },
        {
          path: 'volunteer',
          name: 'volunteer',
          component: () => import('../views/VolunteerInfView.vue'),
        },
        {
          path: 'PersonalCenter',
          name: 'PersonalCenter',
          component: () => import('../views/PersonalCenterView.vue'),
        },
        {
          path: 'task',
          name: 'task',
          component: () => import('../views/TaskPostView.vue'),
        },
        {
          path: 'volunteerService',
          name: 'volunteerService',
          component: () => import('../views/VolunteerService.vue'),
        },
        {
          path: 'visitRecord',
          name: 'visitRecord',
          component: () => import('../views/VisitRecordView.vue'),
        },
        {
          path: 'employee',
          name: 'employee',
          component: () => import('../views/WorkerView.vue'),
        },
        {
          path: 'activity',
          name: 'activity',
          component: () => import('../views/VolunteerActivityView.vue'),
        },
        {
          path: 'permission',
          name: 'permission',
          component: () => import('../views/PermissionView.vue'),
        }

      ],

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
})

export default router
