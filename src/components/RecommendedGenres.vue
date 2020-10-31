<template>
  <div class="recommended-genres-component">
          <div v-for="(item,x) in this.recommended_genres" :key="x">
              <p @click="selectedGenre($event.target.textContent)" v-bind:value="item">{{ item }}</p>
          </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
      return {
          recommended_genres: []
      }
  },
  methods: {
      searchApi(event){
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
               const processed_genres =  response.data.genres.slice(0, 6)
               this.recommended_genres = processed_genres;
           }).catch(error => {
               //Setting the error handler in case that the API returns an error
               // Emitting an event in this case to know that we can't display results
                this.$emit('no-genre-recommendations', false);
            })
          }).catch(error => {
              //Setting the error handler in case that the API returns an error when getting the access_token
              // Emitting an event in this case to know that we can't display results
              this.$emit('no-genre-recommendations', false);
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
          //Emitting the event which sends the genre selected to the user and will show the results throught Searh Component
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recommended-genres-component {
    color: #fff;
    background: grey;
}
</style>
