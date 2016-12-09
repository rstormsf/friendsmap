<template>
  <div>
    Success signups
    <pre>
      {{user}}  
    </pre>
    
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
