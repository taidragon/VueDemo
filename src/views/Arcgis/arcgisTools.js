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

/**
 * @Description: 初始化天地图的函数
*/
/* async function init () {
  let Request = await arcgisPackage.Request
  let BaseTileLayer = await arcgisPackage.BaseTileLaye
  // 加载天地图的矢量图层和标注图层的方法
  __arcgis.TianDiTuLayer = BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    getTileUrl: function(level, row, col) {
      var url = "http://t"+col % 8 +".tianditu.gov.cn/DataServer?T=cva_w&tk=12b886b3d0f324bd6032c29503972e7c&x="+col+"&y="+row+"&l="+level;
      // var url = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX="+level+"&TILEROW="+row+"&TILECOL="+col+"&tk=12b886b3d0f324bd6032c29503972e7c";
      return url;
    },
    fetchTile: async function(level, row, col) {
      var url = this.getTileUrl(level, row, col);
      return Request(url, {
        responseType: "image"
      })
        .then(function (response) {

          var image = response.data;
          var width = this.tileInfo.size[0];
          var height = this.tileInfo.size[0];

          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;

          context.drawImage(image, 0, 0, width, height);

          return canvas
        }.bind(this))
    }
  })

  __arcgis.TiandiAnnoLayer = BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    getTileUrl: function(level, row, col) {
      var url = "http://t"+col % 8 +".tianditu.gov.cn/DataServer?T=vec_w&tk=12b886b3d0f324bd6032c29503972e7c&x="+col+"&y="+row+"&l="+level;
      return url;
    },
    fetchTile: async function(level, row, col) {
      var url = this.getTileUrl(level, row, col);
      return Request(url, {
        responseType: "image"
      })
        .then(function (response) {

          var image = response.data;
          var width = this.tileInfo.size[0];
          var height = this.tileInfo.size[0];

          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;

          context.drawImage(image, 0, 0, width, height);

          return canvas
        }.bind(this))
    }
  })
}

init() */

export default arcgisPackage
