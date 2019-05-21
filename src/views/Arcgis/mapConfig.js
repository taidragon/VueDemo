/*
arcgis初始化配置
*/
export default {
  baseUrl: 'http://192.168.1.158:8080/410/init.js',
  dojoUrl: 'http://192.168.1.158:8080/410/dojo',
  esriCss: 'http://192.168.1.158:8080/410/esri/css/main.css',
  serverUrl: 'http://192.168.1.158:6080',
  mapWkid: 10200,
  inflectionPointcolor: [226, 119, 40], // 拐点颜色
  boundaryColor: [226, 119, 40], // 界碑颜色
  centerPoint: [98.880521, 37.762178] // 地图中心经纬度
}
/* export default {
  baseUrl: 'http://localhost:8081/410/init.js',
  dojoUrl: 'http://localhost:8081/410/dojo',
  esriCss: 'http://localhost:8081/410/esri/css/main.css',
  serverUrl: 'http://localhost:6080',
  mapWkid: 10200,
  inflectionPointcolor: [226, 119, 40], // 拐点颜色
  boundaryColor: [226, 119, 40], // 界碑颜色
  centerPoint: [98.880521, 37.762178], // 地图中心经纬度
} */
