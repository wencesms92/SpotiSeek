<template>
    <div class="trending-items-component">
        <div class="albums-section results-section" v-show="this.results">
            <div class="section-title">
                <h2> TOP TRENDING USA </h2>
            </div>
            <div class="section-container cards-grid">
                <div class="item" v-for="(album,x) in this.albums.items" :key="x" @click="openLink(album.external_urls.spotify)">
                    <div class="header">
                        <div class="icon">
                            <img src="../assets/icons/album-blue.png">
                        </div>
                        <div class="info">
                            <a class="" :href="album.external_urls.spotify">{{album.name}}</a>
                            <a class="" :href="album.artists[0].external_urls.spotify" v-if="Object.keys(album.artists).length == 1">by {{ album.artists[0].name }} </a>
                            <a class="" :href="album.artists[0].external_urls.spotify" v-if="Object.keys(album.artists).length > 1">by {{ album.artists[0].name }}, {{ album.artists[1].name }}  </a>
                        </div>
                    </div>
                    <div class="image">                        
                        <img v-if="album.images[0].url" :src="album.images[0].url" @click="openLink(album.external_urls.spotify)">
                        <img v-else-if="!track.images[0].url" src="../assets/icons/user.png" @click="openLink(album.external_urls.spotify)">
                    </div>
                 </div>     
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      albums: Object,
      results: false
    }
  },
  mounted() {
      this.searchApi();
    },
    methods: {
        searchApi(){
          // Calling Spotify API for the first time in order to get the access_token
          const getTokenFromApi = this.getApiToken().then(result => {
           //Once the acces_token is returned we can GET trending results of USA from the API
           const config = {
               headers: {
                    'Authorization':'Bearer ' + result,
                }
           }
           //HTTP GET request with AXIOS
           axios.get('https://api.spotify.com/v1/browse/new-releases?country=US&limit=6', config).then(async response => {
               // GET request returned results so we bind the variable "this.albums"
               this.albums = response.data.albums;
               this.results = true
           }).catch(error => {
               //Setting the error handler in case that the API returns an error
               // Emitting an event in this case to know that we can't display results
               this.results = false
            })
          }).catch(error => {
              //Setting the error handler in case that the API returns an error when getting the access_token
              // Emitting an event in this case to know that we can't display results
              this.no_results = false
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
        openLink: function(link){
          window.open(link, '_blank');
      }
    }
}
</script>

<style scoped>
.results-section {
    margin: 40px 0px 55px 0px;
    text-align: left;
    
}
.results-section .section-title {
    font-size: 24px!important;
    font-family: 'Roboto Regular';
    margin: 30px 0px;
        text-align: center;
}
.trending-items-component .results-section .section-title > h2{
    color: var(--primary-color);
    background: var(--secondary-color);
    display: inline-block;
    padding: 0px 10px;
    margin: 0 auto;
    text-align: center;
}
.trending-items-component > .results-section .section-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-center;
}

/* Tracks and albums GRID LAYOUT*/
.trending-items-component > .results-section .section-container .item {
    display: flex;
    flex-wrap: wrap;
    width: 31%;
    background: var(--secondary-color);
    justify-content: center;
    margin: 20px 10px;
    cursor: pointer;
    position: relative;
    flex-direction: column;
}
.trending-items-component > .results-section .section-container .item .header {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.trending-items-component > .results-section .section-container .item .header > .icon {
    width: 40px;
    padding: 25px 5px 0px 36px;
    height: 42px;
}
.trending-items-component > .results-section .section-container .item .header > .icon > img {
    width: 45px;
    margin-top: -5px;
}
.trending-items-component > .results-section .section-container .item .header > .info {
    width: 70%;
    display: grid;
    margin-top: 5px;
    align-items: center;
}
.trending-items-component > .results-section .section-container .item .header > .info > a:nth-child(1) {
    width: 100%;
    font-size: 20px;
    font-family: 'Roboto Regular';
    text-decoration: none;
    color: var(--terciary-color);
    margin: 15px 15px 0px 15px;
}
.trending-items-component > .results-section .section-container .item .header > .info > a:nth-child(2) {
    width: 100%;
    font-size: 18px;
    font-family: 'Roboto Light';
    text-decoration: none;
    color: var(--terciary-color);
    margin: 0px 15px 15px 15px;
}
.trending-items-component > .results-section .section-container .item .image {
    width: 100%;
    margin: 10px 0px 20px 0px;
    position: relative;
    text-align: center;
}
.trending-items-component > .results-section .section-container .item .image > img{
    width: 80%;
}
.trending-items-component > .results-section .section-container .item > iframe {
    margin-top: auto;
}
</style>
