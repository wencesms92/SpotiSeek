<template>
<div class="app-container">
  <header-component></header-component>
  <div class="main-container">
    <search-component
      @search-results="sendSearchResults"
      @search-recommendations="sendRecommendationsResults" 
      @no-show-results="showSearchResults"
      @no-show-recomendations="showRecommendationsResults">
    </search-component>
    <transition name="block">
      <search-results-component v-show="this.show_data && this.show_data != undefined" v-bind:artists="artists" v-bind:tracks="tracks" v-bind:albums="albums"></search-results-component>
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
    <recommended-items-component v-show="this.show_recommendations && this.show_data" v-bind:recommended_tracks="recommended_tracks"></recommended-items-component>
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
      artists: {
        valid: false
      },
      tracks: {
        valid: false
      },
      albums: {
        valid: false
      },
      recommended_tracks: {
        valid: false
      },
      show_data: undefined,
      show_recommendations: false
    }
  },
  methods: {
    sendSearchResults(data) {
      // - This method will execute when the event 'search-results' from the Search component arrives
      // - Parsing all the data coming from the event to the props variables >> SearchResults component
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
@import './assets/styles/variables.css';
@import './assets/styles/main.css';

</style>
