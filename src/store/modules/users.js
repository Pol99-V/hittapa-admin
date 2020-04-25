import config from "../../config";
import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const state = {
  userData: [],
  totalUser: '',
  isloading: true,
};
const mutations = {
  setUserData(state, data) {
    state.userData = data;
  },
  setTotal(state, data) {
    state.totalUser = data;
  },
  setIsLoadingTrue(state) {
    state.isloading = true
  },
  setIsLoadingFalse(state) {
    state.isloading = false
  },
};
const actions = {
  requestComparative({commit}, page) {

    let url;
    commit('setIsLoadingTrue');

    if (page === 1) {
      url = config.domain + 'user/';
    } else {
      url = config.domain + 'user/?page=' + page.toString();
    }

    return new Promise((resolve, reject) => {
      axios({
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Token " + this.state.auth.token,
        },
        method: 'GET'
      })
        .then(resp => {
          commit('setUserData', resp.data.results);
          let temp = resp.data.count % 10;
          if (temp === 0) {
            commit('setTotal', Math.trunc(resp.data.count / 10));
          } else {
            commit('setTotal', Math.trunc(resp.data.count / 10) + 1);
          }
          commit('setIsLoadingFalse');
          resolve(resp.data)
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },
};

const getters = {
  getUserData(state) {
    return state.userData
  },
  getIsLoading(state) {
    return state.isloading
  },
  getTotal(state) {
    return state.totalUser
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
