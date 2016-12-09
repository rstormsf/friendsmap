<template>
  <div id="firebaseui-auth-container">
  </div>
</template>


<script>
import firebase from 'firebase';
import { FBApp, FBUIApp } from '../helpers/firebaseConfig';

const Auth = {
  name: 'auth',

  mounted() {
    FBUIApp.start('#firebaseui-auth-container', this.initConfig());
  },

  destroyed() {
    FBUIApp.reset();
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