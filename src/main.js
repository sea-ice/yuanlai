// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import '@/assets/sass/reset.sass'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/css/font-awesome.min.css'
import VueQuillEditor from 'vue-quill-editor'
import '@/assets/sass/base.sass'
import particles from 'particles.js'
Vue.use(particles)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
