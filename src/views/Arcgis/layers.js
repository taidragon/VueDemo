import arcgisPackage from './arcgisTools'
// 天地图影像地图
export const tdtlayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    getTileUrl: function (level, row, col) {
      var url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=img_w&tk=b7bfb591f7435f530314cff9a16d40e3&x=' + col + '&y=' + row + '&l=' + level
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
  let tdtylayer = await new TDT()
  return tdtylayer
}
// 天地图影像标注图层
export const tdtNoteslayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
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
  let tdtylayer1 = new TDT1()
  return tdtylayer1
}
