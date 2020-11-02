<template>
  <footer class="footer-section">
    <div class="footer-content">
        <p> Privacy Policy</p>
        <p> Contact</p>     
        <p>© SpotiSeek 2020</p>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  width: 100%;
  height: 70px;
  max-height: 70px;
  color: var(--secondary-color);
  background: var(--terciary-color);
  clear: both;
  position: relative;
}
footer > .footer-content {
    display: inline-flex;
    width: 70%;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    height: 100%;
}
footer > .footer-content > p{
    font-size: 18px;
    padding: 0px 20px;
}
</style>
