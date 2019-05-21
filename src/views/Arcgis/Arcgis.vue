<template>
  <div class="arcgis">
    <div id="viewDiv"></div>
  </div>
</template>
<script>
import arcgisPackage from './arcgisTools'
import config from './mapConfig'
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

      // 天地图影像地图
      let TDT = BaseTileLayer.createSubclass({
        properties: {
          urlTemplate: null
        },
        getTileUrl: function (level, row, col) {
          var url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=img_w&tk=12b886b3d0f324bd6032c29503972e7c&x=' + col + '&y=' + row + '&l=' + level
          // var url = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX="+level+"&TILEROW="+row+"&TILECOL="+col+"&tk=12b886b3d0f324bd6032c29503972e7c";
          return url
        },
        fetchTile: function (level, row, col) {
          var url = this.getTileUrl(level, row, col)
          return Request(url, {
            responseType: 'image'
          })
            .then(function (response) {
              var image = response.data
              var width = this.tileInfo.size[0]
              var height = this.tileInfo.size[0]

              var canvas = document.createElement('canvas')
              var context = canvas.getContext('2d')
              canvas.width = width
              canvas.height = height

              context.drawImage(image, 0, 0, width, height)

              return canvas
            }.bind(this))
        }
      })

      // 天地图影像标注图层
      let TDT1 = BaseTileLayer.createSubclass({
        properties: {
          urlTemplate: null
        },
        getTileUrl: function (level, row, col) {
          var url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=cia_w&tk=12b886b3d0f324bd6032c29503972e7c&x=' + col + '&y=' + row + '&l=' + level
          // var url = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX="+level+"&TILEROW="+row+"&TILECOL="+col+"&tk=12b886b3d0f324bd6032c29503972e7c";
          return url
        },
        fetchTile: function (level, row, col) {
          var url = this.getTileUrl(level, row, col)
          return Request(url, {
            responseType: 'image'
          })
            .then(function (response) {
              var image = response.data
              var width = this.tileInfo.size[0]
              var height = this.tileInfo.size[0]

              var canvas = document.createElement('canvas')
              var context = canvas.getContext('2d')
              canvas.width = width
              canvas.height = height
              context.drawImage(image, 0, 0, width, height)
              return canvas
            }.bind(this))
        }
      })
      let tdtylayer = new TDT()
      let tdtylayer1 = new TDT1()

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
