import Vue from 'vue';
import Vuex from 'vuex';
import { FBApp } from './helpers/firebaseConfig';

const db = FBApp.database();
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
    SET_COORDINATES(state, coordinates) {
      const coordRef = db.ref(`presence/${state.user.uid}/coordinates/`);
      coordRef.set(coordinates);
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
