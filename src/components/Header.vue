<template>
  <header class="header-section">
    <div class="header-content">
      <div class="logo">
        <img src="../assets/icons/logo.png">
      </div>
      <div class="app-name">        
        <h1><b>Spoti</b>Seek</h1>
      </div>
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
  width: 100%;
  height: 70px;
  max-height: 70px;
  color: var(--secondary-color);
  background: var(--terciary-color);
}
header > .header-content {
    display: flex;
    width: 70%;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    height: 100%;
}
header > .header-content > div {
    width: 50%;
}
header > .header-content > .logo {
  text-align: right;
  margin-right: 3px;
  width: 45%;
}
header > .header-content > .logo > img {
  width: 40px;
  margin-top: 12px;
}
header > .header-content > .app-name {
  text-align: left;
      margin-left: 3px;
      width: 55%;
}
header > .header-content > .app-name h1 {
  display: table-cell;
  vertical-align: middle;
  margin-block-start: 0px;
  margin-block-end: 0px;
  font-family: 'Roboto Light';
  color: var(--secondary-color);
  letter-spacing: 2.5px;
}
header > .header-content > .app-name h1 > b {
  font-family: 'Roboto Regular';
}
</style>
