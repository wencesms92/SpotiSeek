<template>
  <header class="header-section">
    <div>
      <h1>SpotiSeek</h1>
    </div>    
  </header>
</template>

<script>
export default {
  props: {
    msg: String
  }
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
</style>
