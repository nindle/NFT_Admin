import { createStore } from 'vuex'

export default createStore({
  state: {
    is_login: localStorage.getItem('is_login') ? localStorage.getItem('is_login') == 'true' : false,
  },
  mutations: {
    onlogin(state) {
      localStorage.setItem('is_login', 'true')
      state.is_login = true
    },
    onlogout(state) {
      localStorage.setItem('is_login', 'false')
      state.is_login = false
    }
  },
  actions: {
  },
  modules: {
  }
})
