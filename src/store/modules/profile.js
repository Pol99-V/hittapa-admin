import axios from 'axios'
import config from "../../config";

const state = {
  profile_status: '',
  profile_data: [],
  plans_status: '',
  plans_data: [],
};
const mutations = {
  profile_request(state) {
    state.profile_status = 'loading';
  },
  profile_success(state, data) {
    state.profile_status = 'success';
    state.profile_data = data;
  },

  plans_request(state) {
    state.plans_status = 'loading';
  },
  Change_details(state) {
    state.plans_status = 'loading';
  },
  plans_success(state, data) {
    state.plans_status = 'success';
    state.plans_data = data;
  },
  details_success(state, data) {
    state.plans_status = 'success';
    state.plans_data = data;
  },
  plans_error(state) {
    state.plans_status = 'error';
  },
  details_error(state) {
    state.plans_status = 'error';
  },
};
const actions = {
  requestProfiles({commit}) {
    return new Promise((resolve, reject) => {
      commit('profile_request');
      axios({
        url: config.domain + '/profile',
        headers: {
          'client': 'web',
          'token': this.state.auth._token_
        },
        method: 'GET'
      })
        .then(resp => {
          commit('profile_success', resp.data.profile);
          resolve(resp.data.profile)
        })
        .catch(err => {
          commit('profile_error');
          reject(err.response.data)
        })
    })
  },
  requestPlans({commit}) {
    return new Promise((resolve, reject) => {
      commit('plans_request');
      axios({
        url: config.domain + '/pricing',
        headers: {
          'client': 'web',
          'token': this.state.auth._token_
        },
        method: 'GET'
      })
        .then(resp => {
          commit('plans_success', resp.data.pricing);
          resolve(resp.data.pricing)
        })
        .catch(err => {
          commit('plans_error');
          reject(err)
        })
    })
  },
  requestBilling({commit}) {
    axios({
      url: config.domain + '/traders/billing',
      headers: {
        'client': 'web',
        'token': this.state.auth._token_
      },
      method: 'GET'
    }).then(resp => {
      commit('billing_success', resp.data.trader)
    })

  },
  requestDetails({commit}) {
    return new Promise((resolve, reject) => {
      commit('Change_details');
      axios({
        url: config.domain + '/traders/card',
        headers: {
          'client': 'web',
          'token': this.state.auth._token_
        },
        method: 'GET'
      })
        .then(resp => {
          commit('details_success', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('details_error');
          reject(err)
        })
    })
  },
  deletePlan({commit}, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/pricing',
        headers: {
          'client': 'web',
          'token': this.state.auth._token_
        },
        data: data,
        method: 'DELETE'
      })
        .then(resp => {
          commit('plans_success', resp.data.pricing);
          resolve(resp.data)
        })
        .catch(err => {
          commit('plans_error');
          reject(err)
        })
    })
  },
  changePlan({commit}, data) {
    return new Promise((resolve, reject) => {
      commit('plans_request');
      axios({
        url: config.domain + '/pricing',
        headers: {
          'client': 'web',
          'token': this.state.auth._token_
        },
        data: data,
        method: 'POST'
      })
        .then(resp => {
          commit('plans_success', resp.data.pricing);
          resolve(resp.data)
        })
        .catch(err => {
          commit('plans_error');
          reject(err)
        })
    })
  },
  changeDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      commit('Change_details');
      axios({
        url: config.domain + '/traders/card',
        headers: {
          'client': 'web',
          'token': this.state.auth._token_,
        },
        data: {
          card: data
        },
        method: 'POST',
      })
        .then(resp => {
          commit('details_success', resp);
          resolve(resp)
        })
        .catch(err => {
          commit('details_error');
          reject(err)
        })
    })
  },
  uploadProfileImage({commit}, img) {
    return new Promise((resolve, reject) => {
      commit('profile_request');
      axios({
        url: config.domain + '/traders/avatar',
        headers: {
          'client': 'web',
          'token': this.state.auth._token_
        },
        method: 'PUT',
        data: {
          avatar: img
        }
      })
        .then(resp => {
          commit('profile_success', resp.data.message);
          resolve(resp.data.message)
        })
        .catch(err => {
          commit('profile_error');
          reject(err)
        })
    })
  }
};
const getters = {
  isProfilesLoading: state => {
    return state.profile_status === "loading";
  },
  getProfilesData: state => {
    return state.profile_status === "success" ? state.profile_data : []
  },
  getPlansData: state => {
    return state.plans_status === "success" ? state.plans_data : []
  },
};
export default {
  state,
  mutations,
  getters,
  actions
}
