import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import firebase from 'firebase';
import router from './router';
import store from './store';
import { FBApp } from './helpers/firebaseConfig';

const anonymousUid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  /* eslint-disable prefer-template */
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

const db = FBApp.database();
const onConnect = (user, snap) => {
  if (snap.val() === true) {
    const myConnectionsRef = db.ref(`presence/${user.uid}`);
    const lastOnlineRef = db.ref(`users/${user.uid}/lastOnline`);
    myConnectionsRef.set({ email: user.email });
    const connection = myConnectionsRef.child('connections').push(navigator.userAgent);
    store.commit('SET_CONNECTION', connection);
    // when I disconnect, remove this device
    myConnectionsRef.onDisconnect().remove();
    // when I disconnect, update the last time I was seen online
    lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  }
};

FBApp.auth().onAuthStateChanged((user) => {
  if (user === null) {
    /* eslint-disable no-param-reassign */
    const uid = anonymousUid();
    user = { uid, email: `anonymous-${uid}`, anonymous: true };
  }
  if (user) {
    const connectedRef = db.ref('.info/connected');
    connectedRef.on('value', onConnect.bind(this, user));
  } else if (store.getters.connection) {
    store.getters.connection.remove();
    store.commit('REMOVE_CONNECTION');
  }
  console.log('user', user);
  store.commit('SET_USER', user);
});

Vue.use(VueFire);
Vue.use(VueRouter);
/* eslint-disable no-new */
new Vue({
  router,
  store,
}).$mount('#app');
