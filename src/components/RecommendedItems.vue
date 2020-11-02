<template>
    <div class="recommended-items-component">
        <div class="tracks-section results-section">
            <div class="section-title">
                <h2> SONGS YOU MAY ALSO LIKE </h2>
            </div>
            <div class="section-container cards-grid">
                <div class="item" v-for="(track,x) in this.recommended_tracks.tracks" :key="x" @click="openLink(track.external_urls.spotify)">
                    <div class="header">
                        <div class="icon">
                            <img src="../assets/icons/song.png">
                        </div>
                        <div class="info">
                            <a :href="track.href" @click="openLink(track.external_urls.spotify)">{{track.name}}</a>
                            <a :href="track.artists[0].external_urls.spotify" v-if="Object.keys(track.artists).length == 1">by {{ track.artists[0].name }} </a>
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
    </div>
</template>

<script>

export default {
  props: {
      recommended_tracks: {
          type: Object
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recommended-items-component > .results-section .section-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-center;
}
.recommended-items-component > .results-section .section-container .item {
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
.recommended-items-component > .results-section .section-container .item .header {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.recommended-items-component > .results-section .section-container .item .header > .icon {
    width: 40px;
    padding: 25px 5px 0px 36px;
    height: 42px;
}
.recommended-items-component > .results-section .section-container .item .header > .icon > img {
    width: 35px;
}
.recommended-items-component > .results-section .section-container .item .header > .info {
    width: 70%;
    display: grid;
    margin-top: 5px;
    align-items: center;
}
.recommended-items-component > .results-section .section-container .item .header > .info > a:nth-child(1) {
    width: 100%;
    font-size: 20px;
    font-family: 'Roboto Regular';
    text-decoration: none;
    color: #fff;
    margin: 15px 15px 0px 15px;
    text-align: left;
}
.recommended-items-component > .results-section .section-container .item .header > .info > a:nth-child(2) {
    width: 100%;
    font-size: 16px;
    font-family: 'Roboto Light';
    text-decoration: none;
    color: #fff;
    margin: 0px 15px 15px 15px;
    text-align: left;
}
.recommended-items-component > .results-section .section-container .item .image {
    width: 100%;
    margin: 10px 0px 20px 0px;
    position: relative;
    text-align: center;
}
.recommended-items-component > .results-section .section-container .item .image > img{
    width: 300px;
}
.recommended-items-component > .results-section .section-container .item > iframe {
    margin-top: auto;
}
</style>
