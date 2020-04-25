import config from "../../config";
import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const localstorage_key = "tradersync_token";
const _localstorage_key_ = "_tradersync_token_";
const localstorage_session_key = "tradersync_session";
const storage_path = "https://tradersync.s3.amazonaws.com/";

const state = {
  status: '',
  token: localStorage.getItem(localstorage_key) || '',
  // token: 'ddd',
  _token_: localStorage.getItem(_localstorage_key_) || '',
  session: JSON.parse(localStorage.getItem(localstorage_session_key)) || null,
  billing: [],
  error_from_twitter: '',
  twitter_user: null,
  randomStr: '123',
};

const mutations = {
  auth_request(state) {
    state.status = 'loading'
  },
  set_twitter_user(state, user) {
    state.twitter_user = user;
  },
  auth_success(state, token) {
    state.status = 'success';
    state.token = token;
  },
  token_demo(state, _token_) {
    state._token_ = _token_
  },
  eraseDemoData(state) {
    state.token = state._token_;
    localStorage.setItem(localstorage_key, state.token)
  },
  set_session_data(state, data) {
    state.session = data;
    localStorage.setItem(localstorage_session_key, JSON.stringify(data))
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = '';
    state.token = '';
    state._token_ = '';
    state.twitter_user = null;
    localStorage.clear();
  },
};

const actions = {
  eraseDemoData({commit}) {
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/traders/config',
        headers: {
          'client': 'web',
          'token': localStorage.getItem('_tradersync_token_'),
        },
        data: {"demo": false},
        method: 'PUT'
      }).then(resp => {
        commit('eraseDemoData');
        resolve(resp.data.message)
      })
    });

  },
  autoLogin({commit}, token) {
    if (!token || token === '') return;
    /*return new Promise((resolve, reject) => {
      commit('auth_request');
      axios({
        url: config.domain + '/auth',
        headers: {
          'client': 'web',
          'token': token
        },
        method: 'GET'
      })
        .then(resp => {
          const token = resp.data.token;
          localStorage.setItem(localstorage_key, token);
          const _token_ = resp.data._token_;
          localStorage.setItem(_localstorage_key_, _token_);

          // Add the following line:
          // axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', token);
          commit('token_demo', _token_);
          commit('set_session_data', resp.data.session);
          resolve(resp);
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error');
          reject(err)
        })
    });*/
    return token !== '';
  },
  login({commit}, user) {

    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios({
        url: config.authdomain + '/auth/login/',
        // headers: {'client': 'web'},
        data: user,
        method: 'POST'
      })
        .then(resp => {
          const token = resp.data.key;
          localStorage.setItem(localstorage_key, token);

          commit('auth_success', token);
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error');
          // localStorage.removeItem(localstorage_key)
          reject(err)
        })
    })
  },
  register({commit}, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios({
        url: config.domain + '/traders',
        headers: {'client': 'web'},
        data: user,
        method: 'POST'
      })
        .then(resp => {
          const token = resp.data.token;
          localStorage.setItem(localstorage_key, token);
          const _token_ = resp.data._token_;
          localStorage.setItem(_localstorage_key_, _token_);
          // Add the following line:
          // axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', token);
          commit('token_demo', _token_);
          commit('set_session_data', resp.data.session);
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err);
          // localStorage.removeItem(localstorage_key)
          reject(err)
        })
    })
  },
  logout({commit, state}) {
    return new Promise((resolve) => {
      axios({
        url: config.domain + '/auth',
        headers: {
          'client': 'web',
          'token': state.token
        },
        method: 'DELETE'
      }).finally(() => {
        commit('logout');
        resolve()
      })
    })
  },
  admin_logout({commit, state}) {
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/admin/logout',
        headers: {
          'Content-Type': 'application/json',
          'token': state.token,
          'client': 'admin',
          'cap': localStorage.getItem("admin_user_id"),
          'pac': localStorage.getItem("admin_login"),
        },
        method: 'GET'
      })
        .then(resp => {
          //admin
          localStorage.setItem('token', resp.data.token);
          localStorage.setItem('date', resp.data.session.date);
          localStorage.setItem('account_type', resp.data.session.role);
          localStorage.setItem('account_id', resp.data.session.role_id);
          localStorage.setItem('user_id', resp.data.session.user_id);
          localStorage.setItem('username', resp.data.session.username);
          localStorage.setItem('avatar', config.bucketDomain + resp.data.session.avatar);
          sessionStorage.removeItem("admin_login");
          //front
          const token = resp.data.token;
          localStorage.setItem(localstorage_key, token);
          const _token_ = resp.data._token_;
          localStorage.setItem(_localstorage_key_, _token_);
          commit('auth_success', token);
          commit('token_demo', _token_);
          commit('set_session_data', resp.data.session);

          resolve(resp)
        })
        .catch(err => {
          commit('auth_error');
          reject(err)
        })
    })
  }
};

const getters = {
  // isLoggedIn: state => !!state.token && state.status === 'success',
  isLoggedIn: state => !!state.token,
  // isLoggedIn: state => !!state._token_,
  authStatus: state => state.status,

  getSessionInformation(state) {
    return state.session
  },
  getBilling(state) {
    return state.billing
  },
  getToken(state) {
    return state.token;
  },
  getAvatarURL: state => storage_path + (state.session ? state.session.avatar + '?' + state.randomStr : "")
};

export default {
  state,
  mutations,
  getters,
  actions
}
