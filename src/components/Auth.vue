<template>
  <div id="firebaseui-auth-container">
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';
import { FBApp } from '../helpers/firebaseConfig';
// import VueFire from 'vuefire';
// import Vue from 'vue';

// Vue.use(VueFire);
// const onSignInSuccess = function (currentUser, credential) {
// }.bind(Auth);


// const uiConfig = ;

const Auth = {
  name: 'auth',

  computed: {
    ...mapGetters({
      fbUiApp: 'fbUiApp',
    }),
  },

  mounted() {
    this.fbUiApp.start('#firebaseui-auth-container', this.initConfig());
  },

  destroyed() {
    this.fbUiApp.reset();
  },

  firebase: {
    users: {
      source: FBApp.database().ref('users'),
      asObject: true,
    },
  },

  methods: {
    initConfig: function initConfig() {
      return {
        callbacks: {
          signInSuccess: this.onSignInSuccess,
        },
        signInSuccessUrl: '/#/success',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        tosUrl: '/#tos',
      };
    },

    onSignInSuccess: function onSignInSuccess(currentUser) {
      const { email, photoURL, emailVerified, displayName, uid, providerData } = currentUser;
      if (!this.users[uid]) {
        this.$firebaseRefs.users.child(uid).set({
          email,
          photoURL,
          emailVerified,
          displayName,
          providerData,
        });
      }
      return true;
    },
  },

};


export default Auth;
</script>

<style src="firebaseui/dist/firebaseui.css"></style>