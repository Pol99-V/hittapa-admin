import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import users from './modules/users'
import category from './modules/category'
import subcategory from './modules/subcategory'
import requirements from './modules/requirements'
import notification from './modules/notification'
import post from './modules/post'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    category,
    subcategory,
    requirements,
    notification,
    post,
  },
})
