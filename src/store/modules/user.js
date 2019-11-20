import { login, register, mailcode, reset, logout } from '@/api/user'

const state = {
  userid: 0,
  token: '',
  address: '',
}

const mutations = {
  SET_USERID: (state, userid) => {
    state.userid = userid
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ADDRESS: (state, address) => {
    state.address = address
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

  register ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      register(username, password).then(res => {
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

  mailcode ({ commit }, { username }) {
    return new Promise((resolve, reject) => {
      mailcode(username).then(res => {
        console.log(res)
        if (res.rescode === 200) {
          //commit('SET_USERID', res.id)
          //commit('SET_TOKEN', res.token)
          return resolve(res.rescode)
        } else {
          return reject(res.msg)
        }
      })
        .catch(err => {
          return reject(err)
        })
    })
  },

  reset ({ commit }, { username, password, authcode }) {
    return new Promise((resolve, reject) => {
      reset(username, password, authcode ).then(res => {
        console.log(res)
        if (res.rescode === 200) {
          //commit('SET_USERID', res.id)
          //commit('SET_TOKEN', res.token)
          return resolve(res.rescode)
        } else {
          return reject(res.msg)
        }
      })
        .catch(err => {
          return reject(err)
        })
    })
  },

  getinfo ({ commit }, { }) {
    return new Promise((resolve, reject) => {
      getinfo().then(res => {
        console.log(res)
        if (res.rescode === 200) {
          commit('SET_ADDRESS', res.address)
          return resolve(res.address, res.mncount)
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
