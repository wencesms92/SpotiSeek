<template>
  <div class="search-component">
      <section>
          <div class="search-width">
            <div class="title-section">
                <h3> What you'd like to listen today?</h3>
            </div>
            <div class="search-input">
                <img @click="searchApi(this.query)" class="search-icon" src="../assets/icons/search-icon.png">
                <input type="search" v-model="query" @focus="this.onFocus" @keyup.enter="this.enteredQuery()" placeholder="Search artists, tracks or albums">
            </div>
            <div class="recommended-genres">
                <transition name="block">
                    <recommended-genres-component  @recommended-genre-value="sendGenreSelect" v-show="this.show_genres"></recommended-genres-component>
                </transition>
            </div>
          </div>
      </section>
  </div>
</template>

<script>
//Importing libraries
import axios from "axios";
import { debounce } from "debounce";

export default {
  data () {
      return {
          query: '',
          show_genres: false
      }
  },
  methods: {
      enteredQuery(){              
            this.searchApi(this.query)
            this.show_genres = false
      },
      searchApi(event){
          // Calling Spotify API for the first time in order to get the access_token
          const getTokenFromApi = this.getApiToken().then(result => {
           //Once the acces_token is returned we can GET tracks, albums & artists from the API
           const config = {
               headers: {
                    'Authorization':'Bearer ' + result,
                }
           }
           //HTTP GET request with AXIOS
           axios.get('https://api.spotify.com/v1/search?q=' + event + '&type=track,album,artist&limit=6', config).then(async response => {
               // GET request returned results so we emit an event to send it to SearchResults Component
               this.$emit('no-show-results', true);
               this.$emit('search-results', response.data);
               this.show_genres = false;
               this.getRecommendedItems(response.data)
           }).catch(error => {
               //Setting the error handler in case that the API returns an error
               // Emitting an event in this case to know that we can display results
                this.$emit('no-show-results', false);
                this.show_genres = false;
            })
          }).catch(error => {
              //Setting the error handler in case that the API returns an error when getting the access_token
              // Emitting an event in this case to know that we can display results
              this.$emit('no-show-results', false);
              this.show_genres = false;
          })
      },
      getApiToken(){
          //Spotify public credentials
          const clientId = 'd68f5e987d004caa98426cdc9dc76664'
          const clientSecret = '20a325df35a64581a782a23d2d9b7878'
          //Setting the POST request headers and body 
           const config = {
               headers: {
                    'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization':'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
           }
           const body = 'grant_type=client_credentials';
          //Performing the POST request with AXIOS library, and returning the data (access_token)
          return axios.post('https://accounts.spotify.com/api/token',  body ,config).then(async response => {
                return response.data.access_token
           })
      },
      getRecommendedItems(data) {
          const artist_id = (data.artists.items[0].id) ? data.artists.items[0].id : false;
          if (artist_id != false) {
                const getTokenFromApi = this.getApiToken().then(result => {
                //Once the acces_token is returned we can GET tracks, albums & artists from the API
                const config = {
                    headers: {
                        'Authorization':'Bearer ' + result,
                    }
                }   
           //HTTP GET request with AXIOS
           axios.get('https://api.spotify.com/v1/recommendations?seed_artists=' + artist_id + '&limit=6', config).then(async response => {
               // GET request returned results so we emit an event to send it to SearchResults Component
               if (response.data.tracks.length > 0) {
                   this.$emit('search-recommendations', response.data);
                   this.$emit('no-show-recomendations', true);
               }
           }).catch(error => {
               //Setting the error handler in case that the API returns an error
               // Emitting an event in this case to know that we can't display results
                this.$emit('no-show-recomendations', false);
            })
          }).catch(error => {
              //Setting the error handler in case that the API returns an error when getting the access_token
              // Emitting an event in this case to know that we can't display results
              this.$emit('no-show-recomendations', false);
          })
        }
        },
        sendGenreSelect(data) {
            this.searchApi(data);
            this.show_genres = false;
        },
        onFocus() {
            this.show_genres = true;
        }
  },
  watch: {
      //Everytime we type in the search input, the query entered will be used to
      //make a request to de API, with a delay of 0.3s
      query:  debounce(function () {
          if (this.query.length >= 2) {              
            this.searchApi(this.query)
            this.show_genres = false
          }
      }, 300)
  },
  emits: [
      'search-results',
      'search-recommendations',
      'no-show-recomendations'
  ]
}
</script>

