import config from "../../config";
import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const state = {
  postData: [],
  totalPost: '',
};
const mutations = {
  setPostData(state, data) {
    state.postData = data
  },
  setTotalPost(state, data) {
    state.totalPost = data;
  },
  addPost(state, data) {
    state.postData.push(data);
  }
};
const actions = {
  requestPost({commit}, page) {

    let url;
    commit('setIsLoadingTrue');

    if (page === 1) {
      url = config.domain + 'activities/';
    } else {
      url = config.domain + 'activities/?page=' + page.toString();
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

          commit('setPostData', resp.data.results);
          let temp = resp.data.count % 10;
          if (temp === 0) {
            commit('setTotalPost', Math.trunc(resp.data.count / 10));
          } else {
            commit('setTotalPost', Math.trunc(resp.data.count / 10) + 1);
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

  updatePostAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'activities/' + data.id + '/';
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

  requestPostDetail({commit}, id) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'activities/' + id + '/';
      axios({
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Token " + this.state.auth.token,
        },
        method: 'GET'
      })
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },

  addPostAction({commit}, data) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'post/';
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
          commit('addPost', resp.data);
          resolve(resp.data.message);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },

  deletePostAction({commit}, id) {
    return new Promise((resolve, reject) => {
      const url = config.domain + 'post/' + id + '/';
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
  getPostData(state) {
    return state.postData
  },
  getTotalPost(state) {
    return state.totalPost
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
