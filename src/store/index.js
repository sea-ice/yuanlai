import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
let debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  state: {
    userValidated: false,
    userValid: false
  },
  mutations: {
    setUserValidated (state, newVal) {
      state.userValidated = newVal
    },
    setUserValid (state, newVal) {
      state.userValid = newVal
    }
  },
  plugins: debug ? [createLogger()] : []
})
export default store
