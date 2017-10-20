import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage/Homepage'
import SystemMessage from '@/components/SystemMessage/SystemMessage'
import UserBehavior from '@/components/UserBehavior/UserBehavior'
import FeedbackManage from '@/components/FeedbackManage/FeedbackManage'
import ReportManage from '@/components/ReportManage/ReportManage'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
