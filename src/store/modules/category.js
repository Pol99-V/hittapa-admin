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
  categoryData: [],
  totalcategory: '',
};
const mutations = {
  setCategoryData(state, data) {
    state.categoryData = data
  },
  setTotalCategory(state, data) {
    state.totalcategory = data;
  },
  addCategory(state, data) {
    state.categoryData.push(data);
  }
};
const actions = {
  requestCategory({commit}, page) {

    let url;
    commit('setIsLoadingTrue');

    if (page === 1) {
      url = config.domain + 'category/';
    } else {
      url = config.domain + 'category/?page=' + page.toString();
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

          commit('setCategoryData', resp.data.results);

          let temp = resp.data.count % 10;
          if (temp === 0) {
            commit('setTotalCategory', Math.trunc(resp.data.count / 10));
          } else {
            commit('setTotalCategory', Math.trunc(resp.data.count / 10) + 1);
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

  updateCategoryAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'category/' + data.id + '/';
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

  addCategoryAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'category/';
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
          commit('addCategory', resp.data);
          resolve(resp.data.message);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },

  deleteCategoryAction({commit}, id) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'category/' + id + '/';
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
  getCategoryData(state) {
    return state.categoryData
  },
  getTotalCategory(state) {
    return state.totalcategory
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
