<template>
  <div class="recommended-genres-component">
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
          recommended_genres: []
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
               for (var i = 0; i < 9; i++) {
                   const random_genres = parseInt(Math.random() * (115 - 1) + 1);
                   console.log(response.data.genres[random_genres])
                   genre_array.push(response.data.genres[random_genres]);
               }
               this.recommended_genres = genre_array;
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
          console.log(event);
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
    width: 590px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.recommended-genres-component .genres-item {
    margin: 0px 15px;
    border: transparent;
    background: var(--terciary-color);;
    color: #fff;
    border-radius: 0px;
    padding: 0px 5px;
    height: 30px;
    width: 26%;
    margin-bottom: 15px;
    cursor: pointer;
    transition: all .2s ease-in;
    display: inline-flex;
    justify-content: center;
}
.recommended-genres-component .genres-item:hover {
    transform: scale(1.05);
}
.recommended-genres-component .genres-item > p {
    margin: 4px 0px;
}
.recommended-genres-component .refresh-button {
    margin: 4px 0px;
    cursor: pointer;
    width: 100%;
}
.recommended-genres-component .refresh-button > img {
    width: 28px;
    transition: transform 0.4s linear;
}
.recommended-genres-component .refresh-button > img.rotate {
    transform: rotate(180deg);
}
</style>
