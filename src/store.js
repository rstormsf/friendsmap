import Vue from 'vue';
import Vuex from 'vuex';

const getters = {
  user: state => state.user,
  coordinates: state => state.coordinates,
  connection: state => state.connection,
};

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: null,
    fbApp: null,
    fbUiApp: null,
    coordinates: null,
    connection: null,
  },
  getters,
  mutations: {
    /* eslint-disable no-param-reassign */
    SET_USER(state, user) {
      state.user = user;
    },
    SET_GET_COORDINATES(state, coordinates) {
      state.coordinates = coordinates;
    },
    SET_CONNECTION(state, connection) {
      state.connection = connection;
    },
    REMOVE_CONNECTION(state) {
      state.connection = null;
    },
  },
});

export default store;
