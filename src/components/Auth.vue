<template>
  <div id="firebaseui-auth-container">
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';

const uiConfig = {
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

export default {
  name: 'auth',

  computed: {
    ...mapGetters({
      fbUiApp: 'fbUiApp',
    }),
  },

  mounted() {
    this.fbUiApp.start('#firebaseui-auth-container', uiConfig);
  },

  destroyed() {
    this.fbUiApp.reset();
  },
};
</script>

<style src="firebaseui/dist/firebaseui.css"></style>