<template>
  <div class="arcgis">
    <div id="viewDiv" style="background: #eee"></div>
  </div>
</template>
<script>
import arcgisPackage from './arcgisTools'
import config from './mapConfig'
import { tdtlayer, tdtNoteslayer } from './layers'
export default {
  name: 'Arcgis',
  data () {
    return {
    }
  },
  mounted () {
    // 加载地图
    this.createMap()
  },
  methods: {
    /**
     * @Description:初始化地图的函数
     */
    async createMap () {
      // 加载arcgis地图的依赖
      let MapView = await arcgisPackage.MapView
      let Map = await arcgisPackage.Map
      let Basemap = await arcgisPackage.Basemap
      let BaseTileLayer = await arcgisPackage.BaseTileLayer
      let Request = await arcgisPackage.Request
      let Draw = await arcgisPackage.Draw
      let FeatureLayer = await arcgisPackage.FeatureLayer
      let LayerList = await arcgisPackage.LayerList
      let ScaleBar = await arcgisPackage.ScaleBar
      let BasemapToggle = await arcgisPackage.BasemapToggle

      // 天地图影像地图
      var tdtylayer = await tdtlayer().then(res => { return res })
      // 天地图影像标注图层
      var tdtylayer1 = await tdtNoteslayer().then(res => { return res })

      let customBasemap = new Basemap({
        baseLayers: [tdtylayer, tdtylayer1],
        title: 'Custom Basemap',
        id: 'myBasemap'
      })

      this.map = new Map({
        basemap: customBasemap
      })
      this.view = new MapView({
        map: this.map,
        container: 'viewDiv',
        center: config.centerPoint,
        zoom: 7
      })

      // 增加比例尺
      let scaleBar = new ScaleBar({
        view: this.view,
        unit: 'metric'
      })
      this.view.ui.add(scaleBar, {
        position: 'bottom-right'
      })
      // 实例化绘制
      this.draw = new Draw({
        view: this.view
      })

    }
  }
}
</script>
<style scoped lang="scss">
  .arcgis{
    height: 100%;
    overflow: hidden;
    /* 地图框样式 */
    #viewDiv{
      height: 100%;
    }
  }
</style>
