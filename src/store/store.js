import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)
export default new Vuex.Store({
  //用户信息
  state: {
    //用户id
    userId: '',
    account: '',
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    },
    setAccount(state, account) {
      state.account = account
    },
  },
  actions: {
    setUserId(context, userId) {
      context.commit('setUserId', userId)
    },
    setAccount(context, account) {
      context.commit('setAccount', account)
    },
  },
  //解决刷新后vuex数据重置问题
  plugins: [createVuexAlong()],
})
