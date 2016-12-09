import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import firebase from 'firebase';
import router from './router';
import store from './store';
import { FBApp } from './helpers/firebaseConfig';

const db = FBApp.database();
const onConnect = (user, snap) => {
  if (snap.val() === true) {
    const myConnectionsRef = db.ref(`presence/${user.uid}/connections`);
    const lastOnlineRef = db.ref(`users/${user.uid}/lastOnline`);
    const connection = myConnectionsRef.push(navigator.userAgent);
    store.commit('SET_CONNECTION', connection);
    // when I disconnect, remove this device
    connection.onDisconnect().remove();

    // when I disconnect, update the last time I was seen online
    lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  }
};

FBApp.auth().onAuthStateChanged((user) => {
  if (user) {
    const connectedRef = db.ref('.info/connected');
    connectedRef.on('value', onConnect.bind(this, user));
  } else if (store.getters.connection) {
    store.getters.connection.remove();
    store.commit('REMOVE_CONNECTION');
  }
  store.commit('SET_USER', user);
});

Vue.use(VueFire);
Vue.use(VueRouter);
/* eslint-disable no-new */
new Vue({
  router,
  store,
}).$mount('#app');
