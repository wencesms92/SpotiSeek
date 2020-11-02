<template>
  <div class="recommended-genres-component" v-show="this.show_genres">
          <div class="genres-item" v-for="(item,x) in this.recommended_genres" :key="x" @click="selectedGenre(item)">
              <p>#</p>
              <p v-bind:value="item">{{item}}</p>
          </div>
          <div class="refresh-button" @click="$event.target.classList.toggle('rotate')">
              <img @click="searchApi()" src="../assets/icons/reload.png">
          </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
      return {
          recommended_genres: [],
          show_genres: false
      }
  },
  methods: {
      searchApi(){
          // Calling Spotify API for the first time in order to get the access_token
          const getTokenFromApi = this.getApiToken().then(result => {
           //Once the acces_token is returned we can some random music genres from the API.
           const config = {
               headers: {
                    'Authorization':'Bearer ' + result,
                }
           }
           //HTTP GET request with AXIOS
           axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', config).then(async response => {
               // GET request returned results so we can show some random genres to the user
               const genre_array = new Array;
               const response_length = response.data.genres.length;
               for (var i = 0; i < 9; i++) {
                   const random_genres = parseInt(Math.random() * (response_length) + 1);
                   genre_array.push(response.data.genres[random_genres]);
               }
               this.recommended_genres = genre_array;
               this.show_genres = true;
           }).catch(error => {
               //Setting the error handler in case that the API returns an error
               // Emitting an event in this case to know that we can't display results
                this.$emit('no-genre-recommendations', false);
                this.show_genres = false;
            })
          }).catch(error => {
              //Setting the error handler in case that the API returns an error when getting the access_token
              // Emitting an event in this case to know that we can't display results
              this.$emit('no-genre-recommendations', false);
              this.show_genres = false;
          })
      },
      getApiToken(){
          //Spotify credentials
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
      selectedGenre(event) {
          //Emitting the event which sends the genre selected to the user and will show the results throught Searh Component template
          this.$emit('recommended-genre-value', event);
      }
  },
  mounted() {
    //When the component reach this state, we call searchApi in order to have the genres ready to show.
    this.searchApi()
  },
  emits: [
      'recommended-genre-value',
      'no-genre-recommendations'
  ]
}
</script>