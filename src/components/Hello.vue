<template>
  <div class="hello">
    <pre v-if="user">current user: {{user.email}}</pre>

        <h2>Online users:</h2>
       <ul v-for="user in onlineUsers">
          <li>
            email: {{user.email}}
            coords: {{user.coordinates}}
          </li>
       </ul>
    <h1>Links</h1>
    <ul>
       <router-link v-if="user.anonymous" to="/auth">Login</router-link>
       <button v-if="!user.anonymous" @click="signOut">Sign out</button>
    </ul>
    </h1>
    
    <div id="map"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GoogleMapsLoader from 'google-maps';
import { getCurrentPositon, watchPosition } from '../helpers/geolocation';
import { FBApp } from '../helpers/firebaseConfig';

function onGotLocation(map, marker, store, p) {
  const currentPos = { lat: p.coords.latitude, lng: p.coords.longitude };
  store.commit('SET_COORDINATES', currentPos);
  marker.setPosition(currentPos);
}


export default {
  name: 'hello',
  data() {
    return {
      displayOnlineUsers: false,
    };
  },

  firebase: {
    onlineUsers: FBApp.database().ref('presence'),
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
    googleMapsInit(cb, store) {
      getCurrentPositon().then((p) => {
        const currentPos = { lat: p.coords.latitude, lng: p.coords.longitude };
        store.commit('SET_COORDINATES', currentPos);
        const options = {
          zoom: 10, center: currentPos,
        };
        GoogleMapsLoader.KEY = 'AIzaSyBe6DHQ84pb2qx7_Q8dlm8or9ohEQk2iIs';
        GoogleMapsLoader.load((google) => {
          const mapEl = document.getElementById('map');
          const map = new google.maps.Map(mapEl, options);
          this.map = map;
          const marker = new google.maps.Marker({
            map,
          });
          marker.setPosition(currentPos);
          map.setOptions({ center: currentPos, zoom: 10 });
          watchPosition(cb.bind(this, map, marker, store));
        });
      });
    },
  },

  beforeMount() {
    this.googleMapsInit(onGotLocation, this.$store);
  },

  updated() {
    if (this.map) {
      this.onlineUsers.forEach((u) => {
        const marker = new window.google.maps.Marker({
          map: this.map,
        });
        marker.setPosition(u.coordinates);
      });
    }
  },
};
</script>

<style scoped>  
#map {
  height: 800px;
  width: 100%;
}
</style>

