<template>
  <header-component></header-component>
  <search-component
    @search-results="sendSearchResults"
    @search-recommendations="sendRecommendationsResults" 
    @no-show-results="showSearchResults"
    @no-show-recomendations="showRecommendationsResults">
  </search-component>
  <transition name="block">
    <search-results-component v-show="this.show_data" v-bind:artists="this.artists" v-bind:tracks="this.tracks" v-bind:albums="this.albums"></search-results-component>
  </transition>
  <recommended-items-component v-show="this.show_recommendations && this.show_data" v-bind:recommended_tracks="this.recommended_tracks"></recommended-items-component>
  
</template>

<script>

export default {
  data() {
    return {
      artists: [],
      tracks: [],
      albums: [],
      recommended_tracks: [],
      show_data: false,
      show_recommendations: false
    }
  },
  methods: {
    sendSearchResults(data) {
      //This method will execute when the event 'search-results' from the Search component emits
      // Parsing all the data coming from the event to the props variables >> SearchResults components
      this.artists = data.artists
      this.tracks = data.tracks
      this.albums = data.albums
    },
    sendRecommendationsResults(data) {
      //Sending the recommended data from the API to the RecommendedItems Component:
      this.recommended_tracks = data
    },
    showSearchResults(data){
      //This method will trigger when the HTTP Request to the API fails, in order to
      //hide the SearchResults component.
      this.show_data = data
    },
    showRecommendationsResults(data){
      //This method will trigger when the HTTP Request for Recommended content to the API fails, in order to
      //hide the Recommendations component.
      this.show_recommendations = data
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body { 
  margin: 0px!important;
}
.main-container {
  width: 100%;
  background: rgb(31,81,128);
  height: 100vh;
}
.block-enter-active {
    animation: block 0.3s ease-in;
}
@keyframes block {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1)
    }
}
</style>
