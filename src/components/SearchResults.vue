<template>
    <div class="search-results-component">
        <div class="artists-section results-section">
                <div class="section-title">
                    <h2> TOP ARTISTS </h2>
                </div>
            <div class="section-container">
                <div class="artist-item" v-for="(artist,x) in this.artists.items" :key="x" :class="{'top-artist' : x < 3 , 'other-artist' : x >= 3}">
                    <div class=artist-img>
                        <img v-if="artist.images[0]" :src="artist.images[0].url"  @click="openLink(artist.external_urls.spotify)">
                        <img v-else-if="!artist.images[0]" src="../assets/icons/user.png" @click="openLink(artist.external_urls.spotify)">
                    </div>
                    <div class="artist-name">
                        <a :href="artist.external_urls.spotify">{{artist.name}}</a>
                    </div>
                    <div class="artist-followers">
                        <p>{{ artist.followers.total }} followers</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="tracks-section results-section">
            <div class="section-title">
                <h2> TOP TRACKS </h2>
            </div>
            <div class="section-container cards-grid">
                <div class="item" v-for="(track,x) in this.tracks.items" :key="x" @click="openLink(track.external_urls.spotify)">
                    <div class="header">
                        <div class="icon">
                            <img src="../assets/icons/song.png">
                        </div>
                        <div class="info">
                            <a :href="track.external_urls.spotify">{{track.name}}</a>
                            <a :href="track.artists[0].external_urls.spotify" v-if="Object.keys(track.artists).length === 1">by {{ track.artists[0].name }} </a>
                            <a :href="track.artists[0].external_urls.spotify" v-if="Object.keys(track.artists).length > 1">by {{ track.artists[0].name }}, {{ track.artists[1].name }}  </a>
                        </div>
                    </div>
                    <div class="image">                        
                        <img v-if="track.album.images[0].url" :src="track.album.images[0].url" @click="openLink(track.external_urls.spotify)">
                        <img v-else-if="!track.album.images[0].url" src="../assets/icons/user.png" @click="openLink(track.external_urls.spotify)">
                    </div>
                    
                    <iframe v-bind:src="'https://open.spotify.com/embed/track/' + track.id" width="100%" height="80" frameborder="0" allow="encrypted-media" allowtransparency="true"></iframe>
                </div>     
            </div>
        </div>
        <div class="albums-section results-section">
            <div class="section-title">
                <h2> RELATED ALBUMS </h2>
            </div>
            <div class="section-container cards-grid">
                <div class="item" v-for="(album,x) in this.albums.items" :key="x" @click="openLink(album.external_urls.spotify)">
                    <div class="header">
                        <div class="icon">
                            <img src="../assets/icons/album.png">
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

export default {
  props: {
      artists: {
          type: Object
      },
      tracks: {
          type: Object
      },
      albums: {
          type: Object
      }
  },
  methods: {
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
.results-section .section-title > h2{
    color: var(--primary-color);
    background: var(--secondary-color);
    display: inline-block;
    padding: 0px 10px;
    margin: 0 auto;
    text-align: center;
}
.search-results-component > .results-section .section-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-center;
}
.search-results-component > .results-section .section-container .artist-item {
    text-align: center;
    margin-bottom: 30px;
    transition: transform 0.3s ease-in;
}
.search-results-component > .results-section .section-container .artist-item:hover {
        transform: scale(1.05);
}
.search-results-component > .results-section .section-container .top-artist{
    width: 33%;
}
.search-results-component > .results-section .section-container .top-artist > .artist-img > img {
    width: 200px;
    height: 200px;
    border-radius: 100%;    
    cursor: pointer;
    box-shadow: 1px 1px 20px 0px #00000061;
}
.search-results-component > .results-section .section-container .top-artist > .artist-name {
    margin-top: 13px;
}
.search-results-component > .results-section .section-container .top-artist > .artist-name > a {
    font-size: 25px;
    text-decoration: none;
    color: #fff;
    font-family: 'Roboto Regular';
}
.search-results-component > .results-section .section-container .other-artist{
    width: 33%;
}
.search-results-component > .results-section .section-container .other-artist > .artist-img > img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    cursor: pointer;
    box-shadow: 1px 1px 20px 0px #00000061;
}
.search-results-component > .results-section .section-container .other-artist > .artist-name {
    margin-top: 13px;
}
.search-results-component > .results-section .section-container .other-artist > .artist-name > a {
    font-size: 20px;
    text-decoration: none;
    color: #fff;
    font-family: 'Roboto Light';
    cursor: pointer;
}
.search-results-component > .results-section .section-container .artist-item > .artist-followers >  p {
    font-size: 15px;
    text-decoration: none;
    color: var(--secondary-color); 
    font-family: 'Roboto Italic';
    cursor: pointer;
    margin-top: 5px;
}

/* Tracks and albums GRID LAYOUT*/
.search-results-component > .results-section .section-container .item {
    display: flex;
    flex-wrap: wrap;
    width: 31%;
    background: var(--terciary-color);
    justify-content: center;
    margin: 20px 10px;
    cursor: pointer;
    position: relative;
    flex-direction: column;
}
.search-results-component > .results-section .section-container .item .header {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.search-results-component > .results-section .section-container .item .header > .icon {
    width: 40px;
    padding: 25px 5px 0px 36px;
    height: 42px;
}
.search-results-component > .results-section .section-container .item .header > .icon > img {
    width: 35px;
}
.search-results-component > .results-section .section-container .item .header > .info {
    width: 70%;
    display: grid;
    margin-top: 5px;
    align-items: center;
}
.search-results-component > .results-section .section-container .item .header > .info > a:nth-child(1) {
    width: 100%;
    font-size: 20px;
    font-family: 'Roboto Regular';
    text-decoration: none;
    color: #fff;
    margin: 15px 15px 0px 15px;
}
.search-results-component > .results-section .section-container .item .header > .info > a:nth-child(2) {
    width: 100%;
    font-size: 18px;
    font-family: 'Roboto Light';
    text-decoration: none;
    color: #fff;
    margin: 0px 15px 15px 15px;
}
.search-results-component > .results-section .section-container .item .image {
    width: 100%;
    margin: 10px 0px 20px 0px;
    position: relative;
    text-align: center;
}
.search-results-component > .results-section .section-container .item .image > img{
    width: 80%;
}
.search-results-component > .results-section .section-container .item > iframe {
    margin-top: auto;
}
</style>
