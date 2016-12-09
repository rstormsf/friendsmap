<template>
  <div class="hello">
    <pre>current user: {{user}}</pre>

    <h1>Links
    <ul>
       <router-link v-if="!user" to="/auth">Login</router-link>
       <button v-if="user" @click="signOut">Sign out</button>
    </ul>
    </h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'hello',
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },

  methods: {
    signOut() {
      firebase.auth().signOut().then(this.onSignOut, this.onError);
    },
    onSignOut() {
      console.log('onSignOut');
    },
    onError() {
      console.error('onError');
    },
  },
};
</script>

