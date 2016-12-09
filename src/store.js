import Vue from 'vue';
import Vuex from 'vuex';

const getters = {
  user: state => state.user,
  fbApp: state => state.fbApp,
  fbUiApp: state => state.fbUiApp,
};

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: null,
    fbApp: null,
    fbUiApp: null,
  },
  getters,
  mutations: {
    /* eslint-disable no-param-reassign */
    SET_USER(state, user) {
      state.user = user;
    },
    SET_FB_APP(state, fbApp) {
      state.fbApp = fbApp;
    },
    SET_FB_UI_APP(state, fbUiApp) {
      state.fbUiApp = fbUiApp;
    },
  },
});

export default store;
