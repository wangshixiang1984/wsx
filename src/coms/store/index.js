import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import {getCookie} from '../server_func'

Vue.use(Vuex)
const userId = getCookie('user_id')
const userToken = getCookie('user_token')
const userName = getCookie('user_name')

const store = new Vuex.Store({
    state: {
      userId: userId,
      userName: userName,
      userToken: userToken
    },
    mutations
})

export default store