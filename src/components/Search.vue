<template>
  <div class="search-component">
      <input type="search" v-model="query" @focus="onFocus" @blur="onBlur" @keyup.enter="enteredQuery()" placeholder="Search artits, tracks or albums">
      <div class="recommended-genres">
          <transition name="block">
            <recommended-genres-component @recommended-genre-value="sendGenreSelect" v-show="this.show_genres"></recommended-genres-component>
          </transition>
      </div>
  </div>
</template>

<script>
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
          //Test method
          console.log('Searched query: ' + this.query);
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
           axios.get('https://api.spotify.com/v1/search?q=' + event + '&type=track,album,artist&limit=5', config).then(async response => {
               // GET request returned results so we emit an event to send it to SearchResults Component
               this.$emit('no-show-results', true);
               this.$emit('search-results', response.data);
               this.show_genres = true;
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
      getRecommendedItems(data) {
          console.log('llego aqui')
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
           axios.get('https://api.spotify.com/v1/recommendations?seed_artists=' + artist_id + '&limit=5', config).then(async response => {
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
            this.searchApi(data)
        },
        onFocus() {
            this.show_genres = true;
        },
        onBlur() {
            this.show_genres = false;
      }
  },
  watch: {
      //Everytime we type in the search input, the query entered will be used to
      //make a request to de API, with a delay of 0.4s
      query: debounce(function () {
          this.searchApi(this.query)
      }, 400)
  },
  emits: [
      'search-results',
      'search-recommendations'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background: #000;
  width: 100%;
  height: 70px;
  max-height: 70px;
  
}
header > div {
  width: 100%;
  height: 100%;
  text-align:center; 
  display:table;
}
header > div > h1 {
  display: table-cell;
  vertical-align: middle;
  margin-block-start: 0px;
  margin-block-end: 0px;
  color: #fff;
}
.block-enter-active {
    animation: block-in 0.3s ease-in;
}
.block-leave-to {
  animation: block-out 0.5s ease-out;
}
@keyframes block-in {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1)
    }
}
@keyframes block-out {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.9)
    }
}
</style>
