<template>
  <div class="search-results-component">
      <table>
          <ul>
              <h2> Related Artists</h2>
              <li v-for="(artist,x) in this.artists.items" :key="x">
                  <img v-if="artist.images[2]" :src="artist.images[2].url">
                  <a :href="artist.external_urls.spotify">{{artist.name}}</a>
              </li>
          </ul>
          <ul>
              <h2> Top Songs</h2>
              <li v-for="(track,x) in this.tracks.items" :key="x">
                  <img v-if="track.album.images[2]" :src="track.album.images[2].url">
                  <a :href="track.href">{{track.name}}</a>
                  <iframe v-bind:src="'https://open.spotify.com/embed/track/' + track.id" width="300" height="80" frameborder="0" allow="encrypted-media" allowtransparency="true"></iframe>
              </li>
          </ul>
          <ul>
              <h2> Related Albums </h2>
              <li v-for="(album,x) in this.albums.items" :key="x">
                  <img :src="album.images[2].url">
                  <a :href="album.href">{{album.name}}</a>
              </li>
          </ul>
      </table>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-results-component h2{
    color: red;
}
</style>
