import Vue from 'vue'
import Router from 'vue-router'
import * as LoginApi from '@/api/login'
import * as Storage from '@/assets/js/storage'

const Homepage = (resolve) => {
  import('@/components/Homepage/Homepage').then((module) => {
    resolve(module)
  })
}

const SystemMessage = (resolve) => {
  import('@/components/SystemMessage/SystemMessage').then((module) => {
    resolve(module)
  })
}

const UserBehavior = (resolve) => {
  import('@/components/UserBehavior/UserBehavior').then((module) => {
    resolve(module)
  })
}

const FeedbackManage = (resolve) => {
  import('@/components/FeedbackManage/FeedbackManage').then((module) => {
    resolve(module)
  })
}

const ReportManage = (resolve) => {
  import('@/components/ReportManage/ReportManage').then((module) => {
    resolve(module)
  })
}

const Login = (resolve) => {
  import('@/components/login/Login').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Homepage
    },
    {
      path: '/system',
      component: SystemMessage
    },
    {
      path: '/user',
      component: UserBehavior
    },
    {
      path: '/feedback',
      component: FeedbackManage
    },
    {
      path: '/report',
      component: ReportManage
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

// let userValidated = false
// let userValid = false
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  let userValid = JSON.parse(Storage.getSessionStorage('__USER_VALID__'))
  if (userValid === true) return next()
  let userInfo = JSON.parse(Storage.getLocalStorage('__VALID_USER_INFO__'))
  if (!userInfo) return next('/login')
  let {userId, token, avatar, nickName} = userInfo
  if (userId && token && avatar && nickName) {
    LoginApi.checkToken(userId, token).then(response => {
      // 测试阶段暂时跳过检查，予以放行
      debugger
      Storage.getSessionStorage('__USER_VALID__', true)
      next()
      // 线上环境要注释掉上面两行
      // if (response.code === 0) {
      //   next()
      // } else {
      //   Storage.removeStorageItem('__VALID_USER_INFO__')
      //   next('/login')
      // }
    })
  } else {
    Storage.removeStorageItem('__VALID_USER_INFO__')
    next('/login')
  }
})
export default router
