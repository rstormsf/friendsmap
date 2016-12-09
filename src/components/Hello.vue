<template>
  <div class="hello">
    <pre>current user: {{user}}</pre>
       <ul v-for="us in users">
          <li>{{us.uid}} .. {{us.email}}</li>
       </ul>
    <h1>Links
    <ul>
       <router-link v-if="!user" to="/auth">Login</router-link>
       <button v-if="user" @click="signOut">Sign out</button>
    </ul>
    </h1>

    <div id="map"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GoogleMapsLoader from 'google-maps';
import getCurrentPositon from '../helpers/geolocation';
import { FBApp } from '../helpers/firebaseConfig';

const googleMapsInit = (cb) => {
  /* eslint-disable prefer-arrow-callback */
  getCurrentPositon().then(function onFirstLocation(p) {
    const currentPos = { lat: p.coords.latitude, lng: p.coords.longitude };
    const options = {
      zoom: 10, center: currentPos,
    };
    GoogleMapsLoader.KEY = 'AIzaSyBe6DHQ84pb2qx7_Q8dlm8or9ohEQk2iIs';
    GoogleMapsLoader.load((google) => {
      const mapEl = document.getElementById('map');
      const map = new google.maps.Map(mapEl, options);
      const marker = new google.maps.Marker({
        map,
      });
      marker.setPosition(currentPos);
      map.setOptions({ center: currentPos, zoom: 10 });
      setInterval(function onInterval() {
        getCurrentPositon().then(cb.bind(this, map, marker));
      }, 1000);
    });
  });
};

function onGotLocation(map, marker, p) {
  const currentPos = { lat: p.coords.latitude, lng: p.coords.longitude };
  marker.setPosition(currentPos);
}


export default {
  name: 'hello',

  firebase: {
    users: FBApp.database().ref('users'),
  },

  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },

  methods: {
    signOut() {
      FBApp.auth().signOut().then(this.onSignOut, this.onError);
    },
    onSignOut() {
      console.log('onSignOut');
    },
    onError() {
      console.error('onError');
    },
  },

  mounted() {
    googleMapsInit(onGotLocation);
  },
};
</script>

<style scoped>  
#map {
  height: 800px;
  width: 100%;
}
</style>

