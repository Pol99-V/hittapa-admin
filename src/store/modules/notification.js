// import axios from 'axios'
// import config from "../../config"

import config from "../../config";
import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const state = {
  notificationData: [],
  totalnotification: '',
};
const mutations = {
  setNotificationData(state, data) {
    state.notificationData = data
  },
  setTotalNotification(state, data) {
    state.totalnotification = data;
  },
  addNotification(state, data) {
    state.notificationData.push(data);
  }
};
const actions = {
  requestNotification({commit}, page) {

    let url;
    commit('setIsLoadingTrue');

    if (page === 1) {
      url = config.domain + 'notification/';
    } else {
      url = config.domain + 'notification/?page=' + page.toString();
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

          commit('setNotificationData', resp.data.results);
          let temp = resp.data.count % 10;
          if (temp === 0) {
            commit('setTotalNotification', Math.trunc(resp.data.count / 10));
          } else {
            commit('setTotalNotification', Math.trunc(resp.data.count / 10) + 1);
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

  updateNotificationAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'notification/' + data.id + '/';
      axios({
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Token " + this.state.auth.token,
        },
        data: data.data,
        method: 'PUT'
      })
        .then(resp => {
          resolve(resp.data.message);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },

  addNotificationAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'notification/';
      axios({
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Token " + this.state.auth.token,
        },
        data: data,
        method: 'POST'
      })
        .then(resp => {
          commit('addNotification', resp.data);
          resolve(resp.data.message);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },

  deleteNotificationAction({commit}, id) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'notification/' + id + '/';
      axios({
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Token " + this.state.auth.token,
        },
        method: 'DELETE'
      })
        .then(resp => {
          resolve(resp.data.message);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  }

};
const getters = {
  getNotificationData(state) {
    return state.notificationData
  },
  getTotalNotification(state) {
    return state.totalnotification
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
