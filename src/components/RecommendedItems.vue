<template>
  <div class="recommended-items-component">
      <table>
          <ul>
              <h2> Songs you may also like</h2>
              <li v-for="(item,x) in this.recommended_tracks.tracks" :key="x">
                  <a>{{item.name}}</a>
              </li>
          </ul>
      </table>
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
.search-results-component h2{
    color: red;
}
</style>
