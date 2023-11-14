export let map // mars3d.Map三维地图对象
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
/**
 * 构造bloom效果对象
 * @type {mars3d.BloomEffect}
 */
let bloomEffect
let imgLayer
// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()

let grayLayer
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  console.log("onMounted执行了")
  map = mapInstance // 记录首次创建的map



  eventTarget.fire("init", {
    value: 10
  })
  // 时钟控制（可替代cesium本身的animation）
  const clockAnimate = new mars3d.control.ClockAnimate({
    format: "MM/dd HH:mm"
  })
  map.addControl(clockAnimate)

  clockAnimate.on(mars3d.EventType.click, function (event) {
      console.log("单击了时间文本区域", event)
    if (event.targetType === "label") {
      console.log("单击了时间文本区域", event)
      const startTime = Cesium.JulianDate.toDate(map.clock.startTime)
      const stopTime = Cesium.JulianDate.toDate(map.clock.stopTime)
      const currentTime = Cesium.JulianDate.toDate(map.clock.currentTime)
      eventTarget.fire("clickShowClockAnimate", { startTime, stopTime, currentTime })
    } else if (event.targetType === "state" && event.state === true) {
      console.log("单击了时间文本区域", event)
      eventTarget.fire("clickClockStop")
    }
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  console.log("onUnmounted执行了")
  map.graphicLayer.clear()
  map.removeEffect(bloomEffect, true)
  bloomEffect = null
  map = null
}

export function clearLayer(layerId) {
  const layer = map.getLayerById(layerId)
  map.removeLayer(layer)
  const layers = map.getLayers()
  const arr = []
  for (const key in layers) {
    arr.push(layers[key].id)
  }
  console.info(arr)
}
const layers = []
export function showImage(ele) {
  removeLayer(layers)
  mars3d.Util.fetchJson({ url: "data/fy2g.json" }).then(function (data) {
    const array = data.DS
    const startTimes = array[array.length - 1].dateTime
    const stopTimes = array[0].dateTime
    console.info(startTimes, stopTimes)
    const startTime = Cesium.JulianDate.fromDate(new Date(startTimes))
    const stopTime = Cesium.JulianDate.fromDate(new Date(stopTimes))
    if (map.controls.timeline) {
      map.controls.timeline.zoomTo(startTime, stopTime)
      map.clock.multiplier = 60000
      map.clock.currentTime = startTime
    }
    for (const i in array) {
      let status = false
      if (layers.length === 0) {
        status = true
      }
      const imgLayer = new mars3d.layer.ImageLayer({
        id: array[i].dateTime,
        pid: "dataLayer",
        name: formatDate(new Date(array[i].dateTime), "MM/dd HH:mm"),
        url: array[i].url,
        rectangle: { xmin: 50, xmax: 145, ymin: 0, ymax: 70 },
        opacity: 0.8,
        show: status
      })
      map.addLayer(imgLayer)
      layers.push(imgLayer)
    }
  })
}

const formatDate = (oldDate, format = "yyyy-MM-dd HH:mm:ss") => {
  const date = new Date(oldDate)
  const config = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    MM: formatNum(date.getMonth() + 1),
    W: date.getDay(),
    WW: formatNum(date.getDay()),
    d: date.getDate(),
    dd: formatNum(date.getDate()),
    H: date.getHours(),
    HH: formatNum(date.getHours()),
    h: date.getHours() > 12 ? (date.getHours() - 12) : date.getHours(),
    hh: formatNum(date.getHours()) > 12 ? (formatNum(date.getHours()) - 12) : formatNum(date.getHours()),
    m: date.getMinutes(),
    mm: formatNum(date.getMinutes()),
    s: date.getSeconds(),
    ss: formatNum(date.getSeconds()),
    A: date.getHours() < 12 ? "AM" : "PM",
    a: date.getHours() < 12 ? "am" : "pm"
  }
  const formatConfigs = format.match(/[a-zA-Z]+/g)
  formatConfigs.forEach(item => {
    format = format.replace(item, config[item])
  })
  return format
}
function formatNum(num) {
  return num < 10 ? `0${num}` : num
}


export function removeLayer(layers) {
  for (let layer in layers) {
    map.removeLayer(layers[layer], true)
    layer = null
  }
}

export function setCurrentTime(currentTime) {
  map.clock.currentTime = Cesium.JulianDate.fromDate(new Date(currentTime))
}

export function setClockAnimateTime(startTimes, stopTimes) {
  const startTime = Cesium.JulianDate.fromDate(new Date(startTimes))
  const stopTime = Cesium.JulianDate.fromDate(new Date(stopTimes))

  if (map.controls.timeline) {
    map.controls.timeline.zoomTo(startTime, stopTime)
  }
}

// 加载演示数据
let windBarbLayer
export function addUVBarb(ele, time, valid, level, legend) {
  if (windBarbLayer) {
    windBarbLayer.clear()
  } else {
    windBarbLayer = new mars3d.layer.GraphicLayer({
        id: "labelValue",
        pid: "dataLayer",
        name: ele.subtitle
        // name: formatDate(new Date("2023/03/02 00:00:00"), "MM/dd HH:mm")
    })
    map.addLayer(windBarbLayer)
    bindWindLayerPopup()
  }
  let arr = []
  let curLevel = map.level
  const extent = map.getExtent()
  mars3d.Util.fetchJson({ url: "http://47.93.3.128:7889/gridUdi/getGridDataInRect?userId=hitec&pwd=admin&dataCode=" + ele.dataCode + "&interfaceId=getGridDataInRect&times=" + time + "&prodCode=" + ele.element + "&valid=" + valid + "&level=" + level + "&wlng=" + 52 + "&slat=" + 22 + "&elng=" + 85 + "&nlat=" + 39 })
    .then(function (result) {
      arr = result.DS
      if (!arr) {
        return
      }
      const level = 10 - map.level
      // const level = 2
      const arrData = []
      for (let i = 0, len = arr.length; i < len; i = i + level) {
        for (let j = 0, len = arr[i].length; j < len; j = j + level) {
          const value = (arr[i][j]).toFixed(1)
          const x = extent.xmin + j * 0.25
          const y = extent.ymin + i * 0.25
          if (x > extent.xmin & x < extent.xmax & y > extent.ymin & y < extent.ymax) {
            arrData.push(new mars3d.graphic.LabelPrimitive({
              position: [x, y],
              style: {
                text: value,
                font_size: 8,
                scale: 1,
                font_family: "楷体",
                color: "#ffff00",
                outline: true,
                outlineColor: "#000000",
                outlineWidth: 2,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
              }
            }))
          }
        }
      }
      valueBarbLayer.addGraphic(arrData)
      eventTarget.fire("addTableData", { valueBarbLayer })
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
    })

  map.on("cameraChanged", function (event) {
    valueBarbLayer.clear()
    if (map.level !== curLevel || extent !== map.getExtent()) {
      curLevel = map.level
      const level = 10 - map.level
      // const level = 2
      const arrData = []
      for (let i = 0, len = arr.length; i < len; i = i + level) {
        for (let j = 0, len = arr[i].length; j < len; j = j + level) {
          const value = (arr[i][j]).toFixed(1)
          const x = extent.xmin + j * 0.25
          const y = extent.ymin + i * 0.25
          if (x > extent.xmin & x < extent.xmax & y > extent.ymin & y < extent.ymax) {
            arrData.push(new mars3d.graphic.LabelPrimitive({
              position: Cesium.Cartesian3.fromDegrees(x, y, 1000),
              style: {
                text: value,
                font_size: 8,
                scale: 1,
                font_family: "楷体",
                color: "#ffff00",
                outline: true,
                outlineColor: "#000000",
                outlineWidth: 2,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
              }
            }))
          }
        }
      }
      valueBarbLayer.addGraphic(arrData)
    }
  })
}
// export function addUVBarb(ele, time, valid, level, legend) {
//   if (windBarbLayer) {
//     windBarbLayer.clear()
//   } else {
//     windBarbLayer = new mars3d.layer.GraphicLayer({
//         id: "array[i].dateTime",
//         pid: "dataLayer",
//         name: formatDate(new Date("2023/03/02 00:00:00"), "MM/dd HH:mm")
//     })
//     map.addLayer(windBarbLayer)
//     bindWindLayerPopup()
//   }
//   let arr = []
//   let curLevel = map.level
//   let extent = map.getExtent()
//   mars3d.Util.fetchJson({ url: "//data.mars3d.cn/file/apidemo/windpoint.json" })
//     .then(function (result) {
//       arr = result.data
//       const level = 10 - map.level
//       const arrData = []
//       extent = map.getExtent()
//       for (let i = 0, len = arr.length; i < len; i = i + level) {
//         const item = arr[i]
//         const x = (item.x - 80) * 1.9
//         const y = (item.y - 17) * 2.3
//         if (x > extent.xmin & x < extent.xmax & y > extent.ymin & y < extent.ymax) {
//           arrData.push({
//             position: Cesium.Cartesian3.fromDegrees(x, y, 1000),
//             style: {
//               angle: 360 - item.dir, // 方向
//               image: getImageBySpeed(item.speed), // 速度 ，使用不同图片
//               width: 30, // 单位：像素
//               height: 60,
//               color: "#ffffff"
//             },
//             attr: item
//           })
//         }
//       }

//       windBarbLayer.addGraphic(new mars3d.graphic.FlatBillboard({
//         instances: arrData
//       }))

//       eventTarget.fire("addTableData", { windBarbLayer })
//     })
//     .catch(function (error) {
//       console.log("加载JSON出错", error)
//     })

//   map.on("cameraChanged", function (event) {
//     windBarbLayer.clear()
//     if (map.level !== curLevel || extent !== map.getExtent()) {
//       curLevel = map.level
//       extent = map.getExtent()
//       const level = 10 - curLevel
//       const arrData = []
//       for (let i = 0, len = arr.length; i < len; i = i + level) {
//         const item = arr[i]
//         const x = (item.x - 80) * 1.9
//         const y = (item.y - 17) * 2.3
//         if (x > extent.xmin & x < extent.xmax & y > extent.ymin & y < extent.ymax) {
//           arrData.push({
//             position: Cesium.Cartesian3.fromDegrees(x, y, 1000),
//             style: {
//               angle: 360 - item.dir, // 方向
//               image: getImageBySpeed(item.speed), // 速度 ，使用不同图片
//               width: 30, // 单位：像素
//               height: 60,
//               color: "#ffffff"
//             },
//             attr: item
//           })
//         }
//       }
      
//       windBarbLayer.addGraphic(new mars3d.graphic.FlatBillboard({
//         instances: arrData
//       }))
//     }
//   })
// }

// 在图层绑定Popup弹窗
export function bindWindLayerPopup() {
  windBarbLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    return mars3d.Util.getTemplateHtml({ title: "Wind Data", template: "all", attr: attr })
  })
}
function getImageBySpeed(speed) {
  let windVaneUrl = "img/windVane/white/01.svg"
  if (speed >= 0 && speed <= 2) {
    windVaneUrl = "img/windVane/white/01.svg"
  } else if (speed > 2 && speed <= 4) {
    windVaneUrl = "img/windVane/white/02.svg"
  } else if (speed > 4 && speed <= 6) {
    windVaneUrl = "img/windVane/white/03.svg"
  } else if (speed > 6 && speed <= 8) {
    windVaneUrl = "img/windVane/white/04.svg"
  } else if (speed > 8 && speed <= 10) {
    windVaneUrl = "img/windVane/white/05.svg"
  } else if (speed > 10 && speed <= 12) {
    windVaneUrl = "img/windVane/white/06.svg"
  } else if (speed > 12 && speed <= 14) {
    windVaneUrl = "img/windVane/white/07.svg"
  } else if (speed > 14 && speed <= 16) {
    windVaneUrl = "img/windVane/white/08.svg"
  } else if (speed > 16 && speed <= 18) {
    windVaneUrl = "img/windVane/white/09.svg"
  } else if (speed > 18 && speed <= 20) {
    windVaneUrl = "img/windVane/white/10.svg"
  } else if (speed > 20 && speed <= 22) {
    windVaneUrl = "img/windVane/white/11.svg"
  } else if (speed > 22 && speed <= 24) {
    windVaneUrl = "img/windVane/white/12.svg"
  } else if (speed > 24 && speed <= 26) {
    windVaneUrl = "img/windVane/white/13.svg"
  } else if (speed > 26 && speed <= 28) {
    windVaneUrl = "img/windVane/white/14.svg"
  } else if (speed > 28 && speed <= 30) {
    windVaneUrl = "img/windVane/white/15.svg"
  } else if (speed > 30 && speed <= 32) {
    windVaneUrl = "img/windVane/white/16.svg"
  } else if (speed > 32 && speed <= 34) {
    windVaneUrl = "img/windVane/white/17.svg"
  } else if (speed > 34 && speed <= 36) {
    windVaneUrl = "img/windVane/white/18.svg"
  } else if (speed > 36 && speed <= 38) {
    windVaneUrl = "img/windVane/white/19.svg"
  } else if (speed > 38 && speed <= 40) {
    windVaneUrl = "img/windVane/white/20.svg"
  } else if (speed > 40 && speed <= 42) {
    windVaneUrl = "img/windVane/white/21.svg"
  } else if (speed > 42 && speed <= 44) {
    windVaneUrl = "img/windVane/white/22.svg"
  } else if (speed > 44 && speed <= 46) {
    windVaneUrl = "img/windVane/white/23.svg"
  } else if (speed > 46 && speed <= 48) {
    windVaneUrl = "img/windVane/white/24.svg"
  } else if (speed > 48 && speed <= 50) {
    windVaneUrl = "img/windVane/white/25.svg"
  } else if (speed > 50 && speed <= 52) {
    windVaneUrl = "img/windVane/white/26.svg"
  } else if (speed > 52 && speed <= 54) {
    windVaneUrl = "img/windVane/white/27.svg"
  } else if (speed > 54 && speed <= 56) {
    windVaneUrl = "img/windVane/white/28.svg"
  } else if (speed > 56) {
    windVaneUrl = "img/windVane/white/29.svg"
  }
  return windVaneUrl
}


let windLineLayer
export function addUVLine(ele, time, valid, level, legend) {
  windLineLayer = new mars3d.layer.WindLayer({
    particlesNumber: 9000,
    fadeOpacity: 0.996,
    dropRate: 0.003,
    dropRateBump: 0.01,
    speedFactor: 0.2,
    lineWidth: 4.0,
    // 色带配置
    colors: [
      "rgb(4,14,216)",
      "rgb(32,80,255)",
      "rgb(65,150,255)",
      "rgb(109,193,255)",
      "rgb(134,217,255)",
      "rgb(156,238,255)",
      "rgb(175,245,255)",
      "rgb(206,255,255)",
      "rgb(255,254,71)",
      "rgb(255,235,0)",
      "rgb(255,196,0)",
      "rgb(255,144,0)",
      "rgb(255,72,0)",
      "rgb(255,0,0)",
      "rgb(213,0,0)",
      "rgb(158,0,0)"
    ]
  })
  map.addLayer(windLineLayer)

  loadNetCDF("//data.mars3d.cn/file/apidemo/wind.nc").then((data) => {
    windLineLayer.setData(data)
  })
}
// 加载并解析NC数据
function loadNetCDF(filePath) {
  return new Promise(function (resolve) {
    const request = new XMLHttpRequest()
    request.open("GET", filePath)
    request.responseType = "arraybuffer"

    request.onload = function () {
      const arrayToMap = function (array) {
        return array.reduce(function (map, object) {
          map[object.name] = object
          return map
        }, {})
      }

      // eslint-disable-next-line new-cap
      const NetCDF = new netcdfjs(request.response)
      const variables = arrayToMap(NetCDF.variables)
      const uAttributes = arrayToMap(variables.U.attributes)
      const vAttributes = arrayToMap(variables.V.attributes)

      const arrLon = NetCDF.getDataVariable("lon").flat()
      const arrLat = NetCDF.getDataVariable("lat").flat()
      const arrU = NetCDF.getDataVariable("U").flat()
      const maxU = uAttributes.max.value
      const minU = uAttributes.min.value
      const arrV = NetCDF.getDataVariable("V").flat()
      const maxV = vAttributes.max.value
      const minV = vAttributes.min.value

      // 构造WindLayer类需要的格式数据
      const result = {
        xmin: Math.min(...arrLon),
        xmax: Math.max(...arrLon),
        ymin: Math.min(...arrLat),
        ymax: Math.max(...arrLat),
        rows: arrLat.length,
        cols: arrLon.length,
        udata: arrU, // 横向风速
        vdata: arrV, // 纵向风速
        umin: minU,
        umax: maxU,
        vmin: minV,
        vmax: maxV
      }
      resolve(result)
    }
    request.send()
  })
}


// 地图绘制数值显示
let valueBarbLayer
export function addDataValue(ele, time, valid, level, legend) {
  if (valueBarbLayer) {
    valueBarbLayer.clear()
  } else {
    valueBarbLayer = new mars3d.layer.GraphicLayer({
        id: "labelValue",
        pid: "dataLayer",
        name: ele.subtitle
        // name: formatDate(new Date("2023/03/02 00:00:00"), "MM/dd HH:mm")
    })
    map.addLayer(valueBarbLayer)
    valueLayerPopup()
  }
  let arr = []
  let curLevel = map.level
  const extent = map.getExtent()
  mars3d.Util.fetchJson({ url: "http://47.93.3.128:7889/gridUdi/getGridDataInRect?userId=hitec&pwd=admin&dataCode=" + ele.dataCode + "&interfaceId=getGridDataInRect&times=" + time + "&prodCode=" + ele.element + "&valid=" + valid + "&level=" + level + "&wlng=" + extent.xmin + "&slat=" + extent.ymin + "&elng=" + extent.xmax + "&nlat=" + extent.ymax })
    .then(function (result) {
      arr = result.DS
      if (!arr) {
        return
      }
      const level = 10 - map.level
      // const level = 2
      const arrData = []
      for (let i = 0, len = arr.length; i < len; i = i + level) {
        for (let j = 0, len = arr[i].length; j < len; j = j + level) {
          const value = (arr[i][j]).toFixed(1)
          const x = extent.xmin + j * 0.25
          const y = extent.ymin + i * 0.25
          if (x > extent.xmin & x < extent.xmax & y > extent.ymin & y < extent.ymax) {
            arrData.push(new mars3d.graphic.LabelPrimitive({
              position: [x, y],
              style: {
                text: value,
                font_size: 8,
                scale: 1,
                font_family: "楷体",
                color: "#ffff00",
                outline: true,
                outlineColor: "#000000",
                outlineWidth: 2,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
              }
            }))
          }
        }
      }
      valueBarbLayer.addGraphic(arrData)
      eventTarget.fire("addTableData", { valueBarbLayer })
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
    })

  map.on("cameraChanged", function (event) {
    valueBarbLayer.clear()
    if (map.level !== curLevel || extent !== map.getExtent()) {
      curLevel = map.level
      const level = 10 - map.level
      // const level = 2
      const arrData = []
      for (let i = 0, len = arr.length; i < len; i = i + level) {
        for (let j = 0, len = arr[i].length; j < len; j = j + level) {
          const value = (arr[i][j]).toFixed(1)
          const x = extent.xmin + j * 0.25
          const y = extent.ymin + i * 0.25
          if (x > extent.xmin & x < extent.xmax & y > extent.ymin & y < extent.ymax) {
            arrData.push(new mars3d.graphic.LabelPrimitive({
              position: Cesium.Cartesian3.fromDegrees(x, y, 1000),
              style: {
                text: value,
                font_size: 8,
                scale: 1,
                font_family: "楷体",
                color: "#ffff00",
                outline: true,
                outlineColor: "#000000",
                outlineWidth: 2,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
              }
            }))
          }
        }
      }
      valueBarbLayer.addGraphic(arrData)
    }
  })
}

// 在图层绑定Popup弹窗
export function valueLayerPopup() {
  valueBarbLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })
  })
}


// 地图绘制数值显示
let isoPolyLayer
export function addIsosurface(ele, time, valid, level, legend, boundaries) {
  if (isoPolyLayer) {
    isoPolyLayer.clear()
  } else {
    isoPolyLayer = new mars3d.layer.GeoJsonLayer({
        id: "array[i].dateTime",
        pid: "dataLayer",
        name: ele.subtitle
        // name: formatDate(new Date("2023/03/02 00:00:00"), "MM/dd HH:mm")
    })
    map.addLayer(isoPolyLayer)
  }
  const curLevel = map.level
  const extent = map.getExtent()
  
  mars3d.Util.fetchJson({ url: "http://47.93.3.128:7889/gridUdi/getGridDataInRect?userId=hitec&pwd=admin&dataCode=" + ele.dataCode + "&interfaceId=getGridDataInRect&times=" + time + "&prodCode=" + ele.element + "&valid=" + valid + "&level=" + level + "&wlng=" + extent.xmin + "&slat=" + extent.ymin + "&elng=" + extent.xmax + "&nlat=" + extent.ymax })
    .then(function (result) {
    const arr = result.DS
    const pointGrid = []
    for (let j = 0, len = arr.length; j < len; j++) {
      for (let i = 0, len = arr[0].length; i < len; i++) {
        const x = extent.xmin + i * 0.25
        const y = extent.ymin + j * 0.25
        pointGrid.push({
          type: "Feature",
          properties: { val: arr[j][i], lat: y, lon: x },
          geometry: {
            type: "Point",
            coordinates: [x, y]
          }
        })
      }
    }
    const points = {
      type: "FeatureCollection",
      features: pointGrid
    }
    
    // 等值面
    let geojsonPoly = turf.isobands(points, getBreaks(legend, 3), {
      zProperty: "val"
    })
    // 按照面积对图层进行排序，规避turf的一个bug
    geojsonPoly.features.sort(sortArea)
    const features = [] // 裁剪后的结果集
    if (boundaries) {
      geojsonPoly.features.forEach(function(feature1) {
          boundaries.features.forEach(function(feature2) {
              let intersection = null
              try {
                  intersection = turf.intersect(feature1, feature2)
              } catch (e) {
                  try {
                      // 色斑图绘制之后，可能会生成一些非法 Polygon
                      // 解决的方法通常就是做一次 turf.buffer() 操作，这样可以把一些小的碎片 Polygon 清理掉。
                      feature1 = turf.buffer(feature1, 0)
                      intersection = turf.intersect(feature1, feature2)
                  } catch (e) {
                      intersection = feature1 // 实在裁剪不了就不裁剪了,根据业务需求自行决定
                  }
       
              }
              console.info(intersection)
              // && intersection.geometry.coordinates.length > 10
              if (intersection != null) {
                  intersection.properties = feature1.properties
                  intersection.id = (Math.random() * 100000).toFixed(0)
                  features.push(intersection)
              }
          })
      })
      geojsonPoly = turf.featureCollection(features)
    }
    console.info(JSON.stringify(geojsonPoly))
    isoPolyLayer.load({
      name: "等值面",
      data: geojsonPoly,
      popup: "{val}",
      symbol: {
        styleOptions: {
          fill: true, // 是否填充
          color: "#ffff00", // 颜色
          opacity: 0.5 // 透明度
        },
        callback: function (attr, styleOpt) {
          // 得到点的权重，计算落在那个色度带
          const val = Number(attr.val.split("-")[0] || 0)
          const color = getColor(legend.value, val)
          return {
            color: color
          }
        }
      }
    })
  }).catch(function (error) {
      console.log("加载JSON出错", error)
  })
}

function sortArea(a, b) {
  return turf.area(b) - turf.area(a)
}
// 地图绘制数值显示
let isoLineLayer
export function addIsoLine(ele, time, valid, level, legend) {
  if (isoLineLayer) {
    isoLineLayer.clear()
  } else {
    isoLineLayer = new mars3d.layer.GeoJsonLayer({
        id: "array[i].dateTime",
        pid: "dataLayer",
        name: ele.subtitle
        // name: formatDate(new Date("2023/03/02 00:00:00"), "MM/dd HH:mm")
    })
    map.addLayer(isoLineLayer)
  }
  const curLevel = map.level
  const extent = map.getExtent()
  mars3d.Util.fetchJson({ url: "http://47.93.3.128:7889/gridUdi/getGridDataInRect?userId=hitec&pwd=admin&dataCode=" + ele.dataCode + "&interfaceId=getGridDataInRect&times=" + time + "&prodCode=" + ele.element + "&valid=" + valid + "&level=" + level + "&wlng=" + extent.xmin + "&slat=" + extent.ymin + "&elng=" + extent.xmax + "&nlat=" + extent.ymax })
    .then(function (result) {
    const arr = result.DS
    const pointGrid = []
    for (let j = 0, len = arr.length; j < len; j++) {
        for (let i = 0, len = arr[0].length; i < len; i++) {
        const x = extent.xmin + i * 0.25
        const y = extent.ymin + j * 0.25
          pointGrid.push({
            type: "Feature",
            properties: { val: arr[j][i], lat: y, lon: x },
            geometry: {
              type: "Point",
              coordinates: [x, y]
            }
          })
      }
    }
    const points = {
      type: "FeatureCollection",
      features: pointGrid
    }
    // 等值线
    const geojsonLine = turf.isolines(points, getBreaks(legend, 10 - map.level), {
      zProperty: "val"
    })
    
    // 进行平滑处理
    const features = geojsonLine.features
    for (let i = 0; i < features.length; i++) {
        const _coords = features[i].geometry.coordinates
        const _lCoords = []
        for (let j = 0; j < _coords.length; j++) {
            const _coord = _coords[j]
            const line = turf.lineString(_coord)
            const curved = turf.bezierSpline(line)
            _lCoords.push(curved.geometry.coordinates)
        }
        features[i].geometry.coordinates = _lCoords
    }
    
    isoLineLayer.load({
      name: "等值线",
      data: geojsonLine,
      popup: "{val}",
      symbol: {
        styleOptions: {
          width: 2, // 边框宽度
          color: "#0000ff", // 边框颜色
          opacity: 0.8, // 边框透明度
          clampToGround: false // 是否贴地
        }
      }
    })
  }).catch(function (error) {
      console.log("加载JSON出错", error)
  })
}
let map3d
let map2d
export function contrast() {
 // // 修改已有地图为50%
  const mapOld = document.getElementById("centerDiv3D")
  mapOld.style.width = "60%"

  // 获取原来地图的参数
  const mapOptions2 = map.getCurrentOptions() // map.getOptions()
  mapOptions2.control.baseLayerPicker = false // basemaps底图切换按钮
  mapOptions2.control.sceneModePicker = false
  // mapOptions2.control.fullscreenButton = false
  // mapOptions2.control.homeButton = false
  // mapOptions2.control.zoom = false
  // 用于双屏同图层，不同配置展示
  for (let i = 0, len = mapOptions2.layers.length; i < len; i++) {
    const item = mapOptions2.layers[i]
    if (item.compare) {
      for (const key in item.compare) {
        item[key] = item.compare[key] // 存在compare属性时
      }
    }
  }
  console.log("分屏地图配置", mapOptions2)

  const mapSplit = new mars3d.control.MapCompare({
    ...mapOptions2,
    parentContainer: document.body
  })
  map.addControl(mapSplit)
  // 修改对比地图
  mapSplit.mapEx.basemap = "腾讯影像"
}

function getColor(legend, value) {
  const val = Math.round(value, 1)
  for (const i in legend) {
    if (value >= legend[i].start & value < legend[i].end) {
      return legend[i].color
    }
  }
}
function getBreaks(legend, interval) {
  const breaks = [legend.value[0].start]
  for (let i = 0; i < legend.value.length; i = i + interval) {
    breaks.push(legend.value[i].end)
  }
  return breaks
}

export function showGeojson(ele, time, valid, level, legend) {
  console.info(ele, time, valid, level, legend)
}
export function showStation(ele, time, valid, level, legend) {
  console.info(ele, time, valid, level, legend)
}
export function showGray(ele, time, valid, level, legend, boundaries) {
  const curLevel = map.level
  const extent = map.getExtent()
  
  mars3d.Util.fetchJson({ url: "http://47.93.3.128:7889/gridUdi/getGridDataInRect?userId=hitec&pwd=admin&dataCode=" + ele.dataCode + "&interfaceId=getGridDataInRect&times=" + time + "&prodCode=" + ele.element + "&valid=" + valid + "&level=" + level + "&wlng=" + extent.xmin + "&slat=" + extent.ymin + "&elng=" + extent.xmax + "&nlat=" + extent.ymax })
    .then(function (result) {
    const grid = result.DS
    // const colors = getColorArray(legend)
    const canvas = mars3d.DomUtil.create("canvas")
    canvas.width = grid[0].length
    canvas.height = grid.length
    const zlim = [legend.min, legend.max]
    // 3.将得到的格网预测值渲染到canvas画布上
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const n = grid.length
    const m = grid[0].length
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const z = (grid[i][j] - zlim[0]) / (zlim[1] - zlim[0]) * 255
        ctx.fillStyle = getColor(legend.value, grid[i][j])
        ctx.fillRect(j, n - i, 1, 1)
      }
    }
    const image = canvas.toDataURL("image/png")
    grayLayer = map.getLayerById("grayLayer")
    if (grayLayer) {
      grayLayer.reload({
        id: "grayLayer",
        name: ele.name,
        url: image,
        rectangle: {
          xmin: extent.xmin,
          xmax: extent.xmax,
          ymin: extent.ymin,
          ymax: extent.ymax
        },
        alpha: 0.6
      })
    } else {
      grayLayer = new mars3d.layer.ImageLayer({
          id: "grayLayer",
          name: ele.subtitle,
          url: image,
          rectangle: {
            xmin: extent.xmin,
            xmax: extent.xmax,
            ymin: extent.ymin,
            ymax: extent.ymax
          },
          alpha: 0.6
        })
        map.addLayer(grayLayer)
    }
  }).catch(function (error) {
      console.log("加载JSON出错", error)
  })
}
export function addStation(ele, time, valid, level, legend) {
  console.info(ele, time, valid, level, legend)
}

