<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import config from '@/views/Arcgis/mapConfig'
import { loadCss } from 'esri-loader'
loadCss(config.esriCss)
export default {}
</script>

<style lang="scss">
  body,html{
    height:100%;
    width:100%;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width:100%;
}
</style>
