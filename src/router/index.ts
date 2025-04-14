import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    redirect:'/home/basicInf'
  },
  {
    path:'/home',
    name:'home',
    component: () => import('../views/HomeView.vue'),
    children: [
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
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
