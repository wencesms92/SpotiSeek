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
