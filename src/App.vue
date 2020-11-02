<template>
<div>
  <header-component></header-component>
  <div class="main-container">
    <search-component
      @search-results="sendSearchResults"
      @search-recommendations="sendRecommendationsResults" 
      @no-show-results="showSearchResults"
      @no-show-recomendations="showRecommendationsResults">
    </search-component>
    <transition name="block">
      <search-results-component v-show="this.show_data && this.show_data != undefined" v-bind:artists="this.artists" v-bind:tracks="this.tracks" v-bind:albums="this.albums"></search-results-component>
    </transition>
    <transition name="block">
        <div class="no-results" v-show="!this.show_data && this.show_data != undefined">
          <div class="no-results-section">
            <div class="image-container">
              <img src="./assets/icons/error.png">
            </div>
            <div class="message-container">
              <h3>Whoops! We couldn't find any matches</h3>
              <p>Try again!</p>
            </div>              
          </div>
        </div>
    </transition>
    <recommended-items-component v-show="this.show_recommendations && this.show_data" v-bind:recommended_tracks="this.recommended_tracks"></recommended-items-component>
    <transition name="block">
        <trending-items-component></trending-items-component>
    </transition>
  </div>
  <footer-component></footer-component>
</div>
</template>

<script>

export default {
  data() {
    return {
      artists: [],
      tracks: [],
      albums: [],
      recommended_tracks: [],
      show_data: undefined,
      show_recommendations: false
    }
  },
  methods: {
    sendSearchResults(data) {
      // - This method will execute when the event 'search-results' from the Search component arrives
      // - Parsing all the data coming from the event to the props variables >> SearchResults component
      console.log('Data: ', data)
      this.artists = data.artists
      this.tracks = data.tracks
      this.albums = data.albums
    },
    sendRecommendationsResults(data) {
      //Sending the recommended data from the API to the RecommendedItems Component:
      console.log('Recommended:', data);
      this.recommended_tracks = data
    },
    showSearchResults(data){
      //This method will trigger when the HTTP Request to the API fails, in order to
      //hide the SearchResults component.
      console.log('No mostramos...');
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
@import './assets/styles/variables.css';

/* Adding Fonts*/
@font-face {
  font-family: "Roboto Light";
  src: local("Roboto Light"),
  url("./assets/fonts/RobotoCondensed-Light.ttf");
}
@font-face {
  font-family: "Roboto Regular";
  src: local("Roboto Regular"),
  url("./assets/fonts/RobotoCondensed-Regular.ttf");
}
@font-face {
  font-family: "Roboto Bold";
  src: local("Roboto Bold"),
  url("./assets/fonts/RobotoCondensed-Bold.ttf");
}
@font-face {
  font-family: "Roboto Italic";
  src: local("Roboto Italic"),
  url("./assets/fonts/RobotoCondensed-Italic.ttf");
}
#app {
  font-family: 'Roboto Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--secondary-color);
  background-color:  var(--primary-color);
  height: 100vh;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
}
body { 
  margin: 0px!important;
}
.main-container {
  width: 100%;
  max-width: 1190px;
  margin: 0 auto;
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
.no-results-section {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 70px 0px;
}
.no-results-section > .image-container {
  width: 100%;
  text-align: center;
}
.no-results-section > .image-container > img {
  width: 180px;
}
.no-results-section > .message-container {
  width: 100%;
  text-align: center; 
}
.no-results-section > .message-container > h3{
      font-size: 30px;
    font-family: 'Roboto Regular';
}
.no-results-section > .message-container > p {
      font-size: 25px;
    font-family: 'Roboto Light';
}
</style>
