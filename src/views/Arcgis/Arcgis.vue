<template>
  <div class="arcgis">
    <div id="viewDiv" style="background: #eee"></div>
    <!-- 地图的工具框 -->
    <ButtonGroup id="toolbar">
      <Tooltip content="距离测量" placement="bottom">
        <Button icon="md-share" :type="type=='distance'?'primary':'default'" @click="clickToolbar('distance')" style="padding:5px 9px 6px"></Button>
      </Tooltip>
      <Tooltip content="测量面积" placement="bottom">
        <Button icon="ios-create-outline" :type="type=='area'?'primary':'default'" @click="clickToolbar('area')" style="padding:5px 9px 6px"></Button>
      </Tooltip>
    </ButtonGroup>
  </div>
</template>
<script>
import arcgisPackage from './arcgisTools'
import config from './mapConfig'
import { tdtlayer, tdtyNoteslayer, tdtclayer, tdtcNoteslayer, redLine, shengjie } from './layers'
import Basemapthumbnail from '../../assets/map_images/Basemapthumbnail.png'
import Basemapthumbnail1 from '../../assets/map_images/Basemapthumbnail1.png'
export default {
  name: 'Arcgis',
  data () {
    return {
      type: ''
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
      let Fullscreen = await arcgisPackage.Fullscreen
      let Legend = await arcgisPackage.Legend
      let BasemapGallery = await arcgisPackage.BasemapGallery
      // 天地图矢量地图
      var tdtylayer1 = await tdtclayer().then(res => { return res })
      // 天地图的矢量标注图层
      var tdtylayer2 = await tdtcNoteslayer().then(res => { return res })
      // 天地图影像地图
      var tdtylayer = await tdtlayer().then(res => { return res })
      // 天地图影像标注图层
      var tdtylayer3 = await tdtyNoteslayer().then(res => { return res })

      // 省界
      var layerProvince = await shengjie().then(res => { return res })
      // 红线斑块图层
      var layerRedLine = await redLine().then(res => { return res })

      let customBasemap = new Basemap({
        baseLayers: [tdtylayer1, layerProvince, tdtylayer2],
        title: '影像地图',
        id: 'myBasemap',
        thumbnailUrl: Basemapthumbnail
      })

      let customBasemap1 = new Basemap({
        baseLayers: [tdtylayer, layerProvince, tdtylayer3],
        title: '矢量底图',
        id: 'myBasemap1',
        thumbnailUrl: Basemapthumbnail1
      })

      this.map = new Map({
        basemap: customBasemap1
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
      this.map.layers.add(layerRedLine)
      this.addTool()
      // 添加图例
      var legend = new Legend({
        view: this.view,
        layerInfos: [{
          title: '',
          layer: this.map.layers.items[0]
        }]
      })
      this.view.ui.add(legend, 'bottom-left')
      // 增加底图切换插件
      let basemapToggle = new BasemapToggle({
        view: this.view,
        nextBasemap: customBasemap
      })
      this.view.ui.add(basemapToggle, 'top-right')
      // 多底图切换
      var basemapGallery = new BasemapGallery({
        BasemapGallery: customBasemap1,
        source: [ customBasemap, customBasemap1 ],
        view: this.view
      })
      this.view.ui.add(basemapGallery, { position: 'top-right' })
    },
    /**
     * @Description:Arcgis工具添加
     */
    async addTool () {
      let BaseTileLayer = await arcgisPackage.BaseTileLayer
      let Request = await arcgisPackage.Request
      let Draw = await arcgisPackage.Draw
      let FeatureLayer = await arcgisPackage.FeatureLayer
      let LayerList = await arcgisPackage.LayerList
      let ScaleBar = await arcgisPackage.ScaleBar
      let BasemapToggle = await arcgisPackage.BasemapToggle
      let Fullscreen = await arcgisPackage.Fullscreen
      // 增加比例尺
      let scaleBar = new ScaleBar({
        view: this.view,
        unit: 'metric'
      })
      this.view.ui.add(scaleBar, {
        position: 'bottom-right'
      })
      // 添加全屏
      let fullscreen = new Fullscreen({
        view: this.view
      })
      this.view.ui.add(fullscreen, 'top-left')
      // 添加工具框
      this.view.ui.add(document.getElementById('toolbar'), 'top-right')
      // 添加图层控制
      let layerList = new LayerList({
        view: this.view
      })
      this.view.ui.add(layerList, 'bottom-left')
    },
    /**
     * @Description:测量工具点击事件
     */
    async clickToolbar (type) {
      if (this.type === type) {
        type = null
      }
      this.type = type
      if (this.activeWidget) {
        this.view.ui.remove(this.activeWidget)
        this.activeWidget.destroy()
        this.activeWidget = null
      }
      switch (type) {
        case 'distance':
          let DistanceMeasurement2D = await arcgisPackage.DistanceMeasurement2D
          this.activeWidget = new DistanceMeasurement2D({
            view: this.view
          })
          this.activeWidget.viewModel.newMeasurement()
          this.view.ui.add(this.activeWidget, 'top-right')
          break
        case 'area':
          let AreaMeasurement2D = await arcgisPackage.AreaMeasurement2D
          this.activeWidget = new AreaMeasurement2D({
            view: this.view
          })
          this.activeWidget.viewModel.newMeasurement()
          this.view.ui.add(this.activeWidget, 'top-right')
          break
      }
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
