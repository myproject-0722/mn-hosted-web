import { login, logout } from '@/api/admin'

const state = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  logout: (state) => {
    state.token = ''
  }
}

const actions = {
  /**
   * 用户登录
   * @param {*} param0
   * @param {*} param1
   */
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      login(username, password).then(res => {
        console.log(res)
        if (res.success) {
          commit('SET_TOKEN', res.t)
          return resolve(res.t)
        } else {
          return reject(res.message)
        }
      })
        .catch(err => {
          return reject(err)
        })
    })
  },

  // user logout
  logout ({ commit }) {
    logout().then(res => {
      console.log(res)
      commit('SET_TOKEN', '')
    })
  },
  log_out ({ commit }) {
    commit('logout', '')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
