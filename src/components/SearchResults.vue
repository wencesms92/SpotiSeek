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
      artists: Object,
      tracks: Object,
      albums: Object
  },
  methods: {
      openLink: function(link){
          window.open(link, '_blank');
      }
  }
}
</script>

