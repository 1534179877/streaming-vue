import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/pay',
    component: () => import('../views/Alipay/alipay.vue'),
  },
  {
    path: '/tuiliu',
    component: () => import('../views/tuiliu/tuiliu.vue'),
  },
  {
    // 主页
    path: '/home',
    component: () => import('../views/home/home.vue'),
  },
  {
    // 排行榜
    path: '/top',
    component: () => import('../views/top/top.vue'),
  },
  {
    // 上传
    path: '/upload',
    component: () => import('../views/upload/upload.vue'),
  },
  {
    // 登录页
    path: '/login',
    component: () => import('../views/login/login.vue'),
    redirect: '/login/loginForm',
    children: [
      {
        // 登录表单
        path: '/login/loginForm',
        component: () => import('../views/login/children/loginForm'),
      },
      {
        // 注册表单
        path: '/login/signIn',
        component: () => import('../views/login/children/signIn'),
      },
      {
        // 忘记密码
        path: '/login/reSet',
        component: () => import('../views/login/children/reSet'),
      },
    ],
  },
  {
    // 消息中心
    path: '/message',
    component: () => import('../views/message/message.vue'),
    redirect: '/message/notice',
    children: [
      {
        path: '/message/notice',
        component: () => import('../views/message/children/notice.vue'),
      },
      {
        path: '/message/reply',
        component: () => import('../views/message/children/reply.vue'),
      },
    ],
  },
  {
    // 个人中心
    path: '/mine',
    component: () => import('../views/user/mine.vue'),
    redirect: '/mine/video',
    children: [
      {
        path: '/mine/video',
        component: () => import('../views/user/children/video.vue'),
      },
      {
        path: '/mine/collection',
        component: () => import('../views/user/children/collection.vue'),
      },
      {
        path: '/mine/attention',
        component: () => import('../views/user/children/attention.vue'),
      },
      {
        path: '/mine/setting',
        component: () => import('../views/user/children/setting.vue'),
      },
      {
        path: '/mine/setPassword',
        component: () => import('../views/user/children/setPassword.vue'),
      },
      {
        path: '/mine/live',
        component: () => import('../views/user/children/live.vue'),
      },
    ],
  },
  {
    path: '/search',
    component: () => import('../views/search/search.vue'),
  },
  {
    // 播放视频页
    path: '/detail/:_id',
    component: () => import('../views/detail/detail.vue'),
  },
  {
    // 直播
    path: '/online/:_id',
    component: () => import('../views/online/online.vue'),
  },
  {
    //用户页
    path: '/user/:id',
    component: () => import('../views/user/user.vue'),
  },
]
const router = new VueRouter({
  routes,
})
export default router
