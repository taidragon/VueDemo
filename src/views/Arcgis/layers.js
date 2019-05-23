import arcgisPackage from './arcgisTools'
import config from './mapConfig'

// 天地图影像地图
export const tdtlayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
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
  let layer = await new TDT()
  return layer
}
// 天地图影像标注图层
export const tdtyNoteslayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
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
  let layer = new TDT()
  return layer
}
// 天地图矢量图层
export const tdtclayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    getTileUrl: function (level, row, col) {
      var url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=vec_w&tk=12b886b3d0f324bd6032c29503972e7c&x=' + col + '&y=' + row + '&l=' + level
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
  let layer = new TDT()
  return layer
}
// 天地图矢量标注图层
export const tdtcNoteslayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    getTileUrl: function (level, row, col) {
      var url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=cva_w&tk=12b886b3d0f324bd6032c29503972e7c&x=' + col + '&y=' + row + '&l=' + level
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
  let layer = new TDT()
  return layer
}

// 红线斑块图层
export const redLine = async (id) => {
  let FeatureLayer = await arcgisPackage.FeatureLayer
  let layerRedLine = new FeatureLayer({
    id: id === undefined ? 0 : id.toString(),
    name: '红线斑块',
    title: '红线斑块',
    url: config.serverUrl + '/arcgis/rest/services/qhhx/hongxian/MapServer',
    outFields: ['*'],
    opacity: 0.7,
    popupTemplate: {
      title: '{name}',
      expressionInfos: [
        {
          name: 'redLineType',
          title: '红线类型',
          expression:
            `if ($feature.type == "01") {
                        return '生态功能重要区'
                }
                else if($feature.type == "02") {
                        return '生态环境敏感区'
                }`
        },
        {
          name: 'redLineAttribute',
          title: '功能属性',
          expression:
            `if ($feature.attribute == "01") {
                        return '水土流失'
                }
                else if($feature.attribute == "02") {
                        return '土地沙化'
                }
                else if($feature.attribute == "02") {
                        return '石漠化'
                }
                else if($feature.attribute == "02") {
                        return '盐渍化'
                }
                else if($feature.attribute == "02") {
                        return '其他敏感性'
                }`
        }
      ],
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'Id',
              label: '红线Id'
            },
            {
              fieldName: '行政区',
              label: '行政区划名称'
            },
            {
              fieldName: 'pac',
              label: '行政区划编码'
            },
            {
              fieldName: 'hxcode',
              label: '红线编码'
            },
            {
              fieldName: '面积',
              label: '斑块面积/m²',
              format: {
                digitSeparator: true,
                places: 2
              }
            },
            {
              fieldName: 'expression/redLineType'
            },
            {
              fieldName: 'expression/redLineAttribute'
            }
          ]
        }
      ]
    }
  })
  layerRedLine.renderer = {
    type: 'simple',
    symbol: {
      type: 'simple-fill',
      size: 6,
      color: [0, 0, 0, 0.01],
      outline: {
        width: 0.8,
        color: [255, 0, 0, 0.8]
      }
    },
    label: '红线斑块'
  }
  const nameArcade = '$feature.hxcode'
  const nameClass = {
    labelExpressionInfo: {
      expression: nameArcade
    },
    symbol: {
      type: 'text',
      color: 'black',
      haloSize: 1,
      haloColor: 'white'
    }
  }
  layerRedLine.labelingInfo = [nameClass]
  return layerRedLine
}

// 省界
export const shengjie = async (id) => {
  let FeatureLayer = await arcgisPackage.FeatureLayer
  let layer = new FeatureLayer({
    id: id === undefined ? 0 : id.toString(),
    name: '省界',
    url: config.serverUrl + '/arcgis/rest/services/qhhx/shengjie/MapServer',
    legendEnabled: true,
    outFields: ['*'],
    opacity: 0.7
  })
  layer.renderer = {
    type: 'simple',
    symbol: {
      type: 'simple-line',
      width: '2px',
      color: [0, 0, 0, 1],
      style: 'solid'
    },
    label: '省界'
  }
  return layer
}
