import { login, logout } from '@/api/user'

const state = {
  userid: 0,
  token: ''
}

const mutations = {
  SET_USERID: (state, userid) => {
    state.userid = userid
  },
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
        if (res.rescode === 200) {
          commit('SET_USERID', res.id)
          commit('SET_TOKEN', res.token)
          return resolve(res.token)
        } else {
          return reject(res.msg)
        }
      })
        .catch(err => {
          return reject(err)
        })
    })
  },

  // user logout
  logout ({ commit }) {
    logout(userid, token).then(res => {
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
