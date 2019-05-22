import { loadModules } from 'esri-loader'
import config from './mapConfig'

// 配置arcgis中各个包与相对应的路径
const __arcgisUrl = {
  MapView: 'esri/views/MapView',
  Map: 'esri/Map',
  Basemap: 'esri/Basemap',
  TileLayer: 'esri/layers/TileLayer',
  FeatureLayer: 'esri/layers/FeatureLayer',
  GraphicsLayer: 'esri/layers/GraphicsLayer',
  Graphic: 'esri/Graphic',
  Point: 'esri/geometry/Point',
  SpatialReference: 'esri/geometry/SpatialReference',
  PictureMarkerSymbol: 'esri/symbols/PictureMarkerSymbol',
  WebTileLayer: 'esri/layers/WebTileLayer',
  WMTSLayer: 'esri/layers/WMTSLayer',
  TileInfo: 'esri/layers/support/TileInfo',
  Extent: 'esri/geometry/Extent',
  BaseTileLayer: 'esri/layers/BaseTileLayer',
  Request: 'esri/request',
  LayerList: 'esri/widgets/LayerList',
  Print: 'esri/widgets/Print',
  DistanceMeasurement2D: 'esri/widgets/DistanceMeasurement2D',
  AreaMeasurement2D: 'esri/widgets/AreaMeasurement2D',
  ScaleBar: 'esri/widgets/ScaleBar',
  BasemapToggle: 'esri/widgets/BasemapToggle',
  Legend: 'esri/widgets/Legend',
  geometryEngine: 'esri/geometry/geometryEngine',
  Geoprocessor: 'esri/tasks/Geoprocessor',
  FeatureSet: 'esri/tasks/support/FeatureSet',
  ImageParameters: 'esri/layers/support/ImageParameters',
  Draw: 'esri/views/2d/draw/Draw'
}

// 不暴漏在外的存储对象
const __arcgis = {}

// 定义暴露的arcgis变量
const arcgisPackage = new Proxy({}, {
  // 拦截取值
  async get (target, key, receiver) {
    let val = {}
    if (typeof __arcgis[key] === 'undefined') {
      [val] = await loadModules([__arcgisUrl[key]], {
        url: config.baseUrl,
        dojoConfig: {
          baseUrl: config.dojoUrl
        }
      })
      __arcgis[key] = val
    } else {
      val = __arcgis[key]
    }

    return val
  },
  set () {
    console.warn('arcgisPackage对象属性不能赋值')
  }
})

export default arcgisPackage
