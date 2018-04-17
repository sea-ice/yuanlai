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

let userValidated = false
let userValid = false
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!userValidated) {
    userValidated = true
    let userId = Storage.getLocalStorage('__USER_ID__')
    let token = Storage.getLocalStorage('__USER_TOKEN__')
    if (userId && token) {
      LoginApi.checkToken(userId, token).then(response => {
        console.log(response)
        if (response.code === 0) {
          userValid = true
          next()
        } else {
          next('/login')
        }
      })
    } else {
      next('/login')
    }
  } else {
    if (userValid) return next()
    next('/login')
  }
})
export default router
