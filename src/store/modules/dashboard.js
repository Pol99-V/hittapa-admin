import axios from 'axios'
import config from "../../config";
// This is for dashboard setting
const localstorage_dashboard_layout_key = "tradersync_dashboard_layout";

function getDashboardLayoutFromLocalStorage() {
  return JSON.parse(localStorage.getItem(localstorage_dashboard_layout_key))
}

function setDashboardLayoutToLocalStorage(newValue) {
  localStorage.setItem(localstorage_dashboard_layout_key, JSON.stringify(newValue))
}

const state = {
  widgetList: null,
  center_widget_list: [],
  report_overview_data: null,
  custom_columns_list: [],

  dashboard_layout: getDashboardLayoutFromLocalStorage() || 0,
  show_config_side_window: false,
  show_config_upper_window: false,
  show_config_trades_upper_window: false,
  show_config_center_window: false,
  show_config_trades_columns_window: false,
  show_config_dashboard_columns_window: false,
  show_config_custom_columns_window: false,
  router_name: ''
};
const mutations = {

  setWidgetList(state, data) {
    state.widgetList = data;

    let tmp = [];
    data.center_widgets.forEach(w => {
      if (w.dashboard) {
        tmp.push(w.widget)
      }
    });
    state.center_widget_list = tmp
  },
  changeCenterWidgetList(state, data) {
    state.center_widget_list = data
  },
  changeDashboardLayout: (state, newValue) => {
    state.dashboard_layout = newValue;
    setDashboardLayoutToLocalStorage(newValue)
  },
  showConfigSideWidgetsWindow: (state) => {
    state.show_config_side_window = true
  },
  hideConfigSideWidgetsWindow: (state) => {
    state.show_config_side_window = false
  },
  showConfigUpperWidgetsWindow: (state) => {
    state.show_config_upper_window = true
  },
  hideConfigUpperWidgetsWindow: (state) => {
    state.show_config_upper_window = false
  },
  showConfigTradesUpperWidgetsWindow: (state) => {
    state.show_config_trades_upper_window = true
  },
  hideConfigTradesUpperWidgetsWindow: (state) => {
    state.show_config_trades_upper_window = false
  },
  showConfigCenterWidgetsWindow: (state) => {
    state.show_config_center_window = true
  },
  hideConfigCenterWidgetsWindow: (state) => {
    state.show_config_center_window = false
  },
  changeRouterName(state, newValue) {
    state.router_name = newValue
  },
  showConfigTradesColumnsWindow: (state) => {
    state.show_config_trades_columns_window = true;
  },
  hideConfigTradesColumnsWindow: (state) => {
    state.show_config_trades_columns_window = false;
  },
  showConfigDashBoardColumnsWindow: (state) => {
    state.show_config_dashboard_columns_window = true;
  },
  hideConfigDashboardColumnsWindow: (state) => {
    state.show_config_dashboard_columns_window = false;
  },
  showConfigCustomColumnsWindow: (state) => {
    state.show_config_custom_columns_window = true;
  },
  hideConfigCustomColumnsWindow: (state) => {
    state.show_config_custom_columns_window = false;
  },
  setReportOverviewData: (state, data) => {
    state.report_overview_data = data
  },
  setCustomColumnsData: (state, data) => {
    state.custom_columns_list = data;
  }
};
const actions = {

  requestGetWidgetList({commit}) {
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/get_list_widgets',
        headers: {
          'client': 'web',
          'token': this.state.auth.token
        },
        method: 'GET'
      })
        .then(resp => {
          commit('setWidgetList', resp.data.widgets);
          resolve(resp.data.widgets)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  requestDashboardLayout({commit}) {
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/get_list_layout',
        headers: {
          'client': 'web',
          'token': this.state.auth.token
        },
        method: 'GET'
      })
        .then(resp => {
          let layout = 1;
          if (resp.data.layout.layout_1) layout = 1;
          else if (resp.data.layout.layout_2) layout = 2;
          else if (resp.data.layout.layout_3) layout = 3;
          else if (resp.data.layout.layout_4) layout = 4;
          commit('changeDashboardLayout', layout);
          resolve(layout)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  requestReportOverviewData({commit}) {

    commit('setReportOverviewData', null);
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/report/overview?view=overview',
        headers: {
          'client': 'web',
          'token': this.state.auth.token
        },
        method: 'GET'
      })
        .then(resp => {
          commit('setReportOverviewData', resp.data.overview.data);

          resolve(resp.data)
        })
        .catch(err => {
          commit('setReportOverviewData', {});
          reject(err)
        })
    })
  },

  changeCenterWidgetList({commit}, newValue) {
    commit('setReportOverviewData', null);
    let data = [];
    newValue.forEach((item, index) => {
      data.push({
        "side": "center",
        "order": index,
        "widget": item
      })
    });
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/traders/config',
        headers: {
          'client': 'web',
          'token': this.state.auth.token,
        },
        data: {"center_widgets": data},
        method: 'PUT'
      }).then(resp => {
        resolve(resp.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  changeDashboardLayout({commit, state}, newValue) {
    commit('changeDashboardLayout', newValue);
    let data = {
      "layout": {
        "layout_1": 1 === newValue,
        "layout_2": 2 === newValue,
        "layout_3": 3 === newValue,
        "layout_4": 4 === newValue
      }
    };
    axios({
      url: config.domain + '/traders/config',
      headers: {
        'client': 'web',
        'token': this.state.auth.token,
      },
      data: data,
      method: 'PUT'
    });

    return state.dashboard_layout
  },
  requestCustomColumns({commit, state}) {
    commit('setCustomColumnsData', null);
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/pp_setups',
        headers: {
          'client': 'web',
          'token': this.state.auth.token
        },
        method: 'GET'
      })
        .then(resp => {
          commit('setCustomColumnsData', resp.data.setups);
          resolve(resp.data)
        })
        .catch(err => {
          commit('setCustomColumnsData', {});
          reject(err);
        });
    });
  },
  requestPutCustomColumns({commit}, data) {
    commit('setCustomColumnsData', null);
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/traders/config',
        headers: {
          'client': 'web',
          'token': this.state.auth.token
        },
        data: {
          pp_setups: data
        },
        method: 'PUT'
      })
        .then(resp => {
          resolve(resp.data)
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  addSupportLayout({commit}, text) {
    return new Promise((resolve, reject) => {
      axios({
        url: config.domain + '/support',
        headers: {
          'client': 'web',
          'token': this.state.auth._token_
        },
        data: {"description": text},
        method: 'POST'
      })
        .then(resp => {
          resolve(resp.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  showConfigDashBoardColumnsWindow: ({commit, state}) => {
    commit('showConfigDashBoardColumnsWindow');
    return state.show_config_dashboard_columns_window;
  },
  hideConfigDashboardColumnsWindow: ({commit, state}) => {
    commit('hideConfigDashboardColumnsWindow');
    return state.show_config_dashboard_columns_window;
  },
  showConfigSideWidgetsWindow: ({commit, state}) => {
    commit('showConfigSideWidgetsWindow');
    return state.show_config_side_window
  },
  hideConfigSideWidgetsWindow: ({commit, state}) => {
    commit('hideConfigSideWidgetsWindow');
    return state.show_config_side_window
  },
  showConfigUpperWidgetsWindow: ({commit, state}) => {
    commit('showConfigUpperWidgetsWindow');
    return state.show_config_upper_window
  },
  hideConfigUpperWidgetsWindow: ({commit, state}) => {
    commit('hideConfigUpperWidgetsWindow');
    return state.show_config_upper_window
  },
  showConfigTradesUpperWidgetsWindow: ({commit, state}) => {
    commit('showConfigTradesUpperWidgetsWindow');
    return state.show_config_trades_upper_window
  },
  hideConfigTradesUpperWidgetsWindow: ({commit, state}) => {
    commit('hideConfigTradesUpperWidgetsWindow');
    return state.show_config_trades_upper_window;
  },
  showConfigCenterWidgetsWindow: ({commit}) => {
    commit('showConfigCenterWidgetsWindow');
  },
  hideConfigCenterWidgetsWindow: ({commit}) => {
    commit('hideConfigCenterWidgetsWindow');
  },
  changeRouterName({commit}, newValue) {
    commit('changeRouterName', newValue);
  },
  showConfigTradesColumnsWindow: ({commit}) => {
    commit('showConfigTradesColumnsWindow');
  },
  hideConfigTradesColumnsWindow: ({commit}) => {
    commit('hideConfigTradesColumnsWindow');
  },
  showConfigCustomColumnsWindow: ({commit}) => {
    commit('showConfigCustomColumnsWindow');
  },
  hideConfigCustomColumnsWindow: ({commit}) => {
    commit('hideConfigCustomColumnsWindow');
  }
};
const getters = {
  getWidgetList(state) {
    return state.widgetList
  },
  getCenterWidgetList(state) {
    return state.center_widget_list
  },
  getDashboardLayout(state) {
    return state.dashboard_layout
  },
  isShowConfigSideWidgetsWindow(state) {
    return state.show_config_side_window
  },
  isShowConfigUpperWidgetsWindow(state) {
    return state.show_config_upper_window
  },
  isShowConfigTradesUpperWidgetsWindow(state) {
    return state.show_config_trades_upper_window
  },
  isShowConfigCenterWidgetsWindow(state) {
    return state.show_config_center_window
  },
  isShowConfigTradesColumnsWindow(state) {
    return state.show_config_trades_columns_window;
  },
  isShowConfigDashboardColumnsWindow(state) {
    return state.show_config_dashboard_columns_window;
  },
  isShowConfigCustomColumnsWindow(state) {
    return state.show_config_custom_columns_window;
  },
  getRouterName(state) {
    return state.router_name
  },
  getCustomColumnsList(state) {
    return state.custom_columns_list;
  },
  getReportOverviewData: (state) => {
    return state.report_overview_data
  },
};

export default {
  state,
  mutations,
  getters,
  actions
}
