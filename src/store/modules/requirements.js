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
  requirementsData: [],
  totalrequirements: '',
};
const mutations = {
  setRequirementsData(state, data) {
    state.requirementsData = data
  },
  setTotalRequirements(state, data) {
    state.totalrequirements = data;
  },
  addRequirements(state, data) {
    state.requirementsData.push(data);
  }
};
const actions = {
  requestRequirements({commit}, page) {

    let url;
    commit('setIsLoadingTrue');

    if (page === 1) {
      url = config.domain + 'requirement/';
    } else {
      url = config.domain + 'requirement/?page=' + page.toString();
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

          commit('setRequirementsData', resp.data.results);
          let temp = resp.data.count % 10;
          if (temp === 0) {
            commit('setTotalRequirements', Math.trunc(resp.data.count / 10));
          } else {
            commit('setTotalRequirements', Math.trunc(resp.data.count / 10) + 1);
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

  updateRequirementsAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'requirement/' + data.id + '/';
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

  addRequirementsAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'requirement/';
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
          commit('addRequirements', resp.data);
          resolve(resp.data.message);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },

  deleteRequirementsAction({commit}, id) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'requirement/' + id + '/';
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
  getRequirementsData(state) {
    return state.requirementsData
  },
  getTotalRequirements(state) {
    return state.totalrequirements
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
