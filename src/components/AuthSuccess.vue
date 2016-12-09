<template>
  <div>
    Success signups
    <pre>
      {{user}}  
    </pre>
    <router-link to="/">Home</router-link>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'success',
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
};
</script>
