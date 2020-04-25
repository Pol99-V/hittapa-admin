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
  subcategoryData: [],
  totalsubcategory: '',
};
const mutations = {
  setSubCategoryData(state, data) {
    state.subcategoryData = data
  },
  setTotalSubCategory(state, data) {
    state.totalsubcategory = data;
  },
  addSubCategory(state, data) {
    state.subcategoryData.push(data);
  }
};
const actions = {
  requestSubCategory({commit}, page) {

    let url;
    commit('setIsLoadingTrue');

    if (page === 1) {
      url = config.domain + 'subcategory/';
    } else {
      url = config.domain + 'subcategory/?page=' + page.toString();
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

          commit('setSubCategoryData', resp.data.results);

          let temp = resp.data.count % 10;
          if (temp === 0) {
            commit('setTotalSubCategory', Math.trunc(resp.data.count / 10));
          } else {
            commit('setTotalSubCategory', Math.trunc(resp.data.count / 10) + 1);
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

  updateSubCategoryAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'subcategory/' + data.id + '/';
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

  addSubCategoryAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'subcategory/';
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
          commit('addSubCategory', resp.data);
          resolve(resp.data.message);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },

  deleteSubCategoryAction({commit}, id) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'subcategory/' + id + '/';
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
  getSubCategoryData(state) {
    return state.subcategoryData
  },
  getTotalSubCategory(state) {
    return state.totalsubcategory
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
