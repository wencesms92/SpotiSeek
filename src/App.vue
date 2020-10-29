<template>
  <header-component></header-component>
  <search-component @my-event="sendSearchResults" @no-show-results="setNoShow"></search-component>
  <search-results-component v-show="this.show" v-bind:artists="this.artists" v-bind:tracks="this.tracks" v-bind:albums="this.albums"></search-results-component>
</template>

<script>

export default {
  data() {
    return {
      //Declaring all props variables that SearchResults has to show
      artists: [],
      tracks: [],
      albums: [],
      show: false
    }
  },
  methods: {
    //This method will execute when the event 'my-event' from the Search component emits
    // Parsing all the data coming from the event to the props variables >> SearchResults components
    sendSearchResults(data) {
      this.artists = data.artists
      this.tracks = data.tracks
      this.albums = data.albums

    },
    setNoShow(data){
      //This method will trigger when the HTTP Request to the API fails, in order to
      //hide the SearchResults component.
      this.show = data
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
</style>
