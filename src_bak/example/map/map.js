import * as mars3d from "mars3d"

// import * as mappingWind from "./lib/mars3d/plugins/wind/mars3d-wind.js"

export let map // mars3d.Map三维地图对象
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    clock: {
      startTime: "2017/08/25 08:00:00"
    }
  }
}
/**
 * 构造bloom效果对象
 * @type {mars3d.BloomEffect}
 */
let bloomEffect
let earthWindData
// 加载气象
let dongnanWindData

// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()

export const colors = { "01": "#FF0000", "02": "#1E90FF", "03": "#FF00FF", "04": "#FFFF00", "05": "#00FFFF" }
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  console.log("onMounted执行了")
  map = mapInstance // 记录首次创建的map

  // 构造bloom效果 用于滑动条测试
  bloomEffect = new mars3d.effect.BloomEffect()
  map.addEffect(bloomEffect)

  eventTarget.fire("init", {
    value: 10
  })
  showChinaLine()
  showDroughtLine()
  // showDesertLayer()
  // showSandLayer()
    
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
  
  /*
  const layers = map.getLayers()
  const arr = []
  for (const key in layers) {
    arr.push(layers[key].id)
  }
  console.info(arr)
  */
}

export function showDesertLayer() {
  this.parent.$message("数据加载中，请稍后")
  const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    id: "Desert",
    name: "沙漠图层",
    url: "data/survey/desert_area.json",
    symbol: {
      type: "polygon",
      hasHeightEdit: true,
      styleOptions: {
        fill: true,
        color: "#FFD700",
        diffHeight: 0,
        zIndex: 3,
        opacity: 0.4,
        materialType: mars3d.MaterialType.LineFlow,
        materialOptions: {
          image: "img/textures/desert_area.jpg",
          axisY: true,
          speed: 1
        }
      }
    },
    flyTo: true,
    popup: "{name}"
  })
  map.addLayer(geoJsonLayer)
  geoJsonLayer.on(mars3d.EventType.load, (event) => {
    console.log("数据加载完成", event)
  })
}
export function showSandLayer() {
  this.parent.$message("数据加载中，请稍后")
  const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    id: "Shadi",
    name: "沙地图层",
    url: "data/survey/sand_area.json",
    symbol: {
      type: "polygon",
      hasHeightEdit: true,
      styleOptions: {
        fill: true,
        color: "#A0522D",
        diffHeight: 0,
        opacity: 0.4,
        zIndex: 3,
        materialType: mars3d.MaterialType.LineFlow,
        materialOptions: {
          axisY: true,
          image: "img/textures/shadi.jpg",
          speed: 1
        }
      }
    },
    flyTo: true,
    popup: "{name}"
  })
  map.addLayer(geoJsonLayer)
  geoJsonLayer.on(mars3d.EventType.load, (event) => {
    console.log("数据加载完成", event)
  })
}
export function showGebi() {
  this.parent.$message("数据加载中，请稍后")
  const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    id: "Gebi",
    name: "戈壁图层",
    url: "data/survey/Gebi_Ch_200_GBK_new.json",
    symbol: {
      type: "polygon",
      hasHeightEdit: true,
      styleOptions: {
        fill: true,
        color: "#A0522D",
        diffHeight: 1,
        opacity: 0.4,
        zIndex: 3,
        materialType: mars3d.MaterialType.LineFlow,
        materialOptions: {
          axisY: true,
          image: "img/textures/gebi.jpg",
          speed: 1
        }
      }
    },
    flyTo: true,
    popup: "{name}"
  })
  map.addLayer(geoJsonLayer)
  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, (event) => {
    console.log("数据加载完成", event)
  })
}

export function showRegion1() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "Region1" })
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.GatheringPlace({
    id: "Region1",
    name: "Region1",
    positions: [
      [
        90.222475,
        49.700587,
        1444.9
    ],
    [
        95.523499,
        44.405393,
        1290.1
    ],
    [
        106.186705,
        43.503422,
        903.6
    ]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "blue",
        alphaPower: 0.8
      },
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例8" }
  })
  console.log("graphic...", graphic)
  graphicLayer.addGraphic(graphic)
}
export function showRegion6() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "Region6" })
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.GatheringPlace({
    id: "Region1",
    name: "Region1",
    positions: [
      [
        106.55072,
        43.494182,
        1131.5
    ],
    [
        109.846414,
        42.733588,
        949.8
    ],
    [
        114.671918,
        48.062989,
        265.6
    ]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "blue",
        alphaPower: 0.8
      },
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例8" }
  })
  console.log("graphic...", graphic)
  graphicLayer.addGraphic(graphic)
}
export function showRegion2() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "Region2" })
  map.addLayer(graphicLayer)

  const graphic = new mars3d.graphic.GatheringPlace({
    id: "Region2",
    positions: [
      [
        110.60811,
        41.600987,
        1331.2
    ],
    [
        117.039632,
        44.631641,
        887.5
    ],
    [
        113.82896,
        44.010671,
        885.7
    ]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "blue",
        alphaPower: 0.8
      },
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}
export function showRegion3() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "Region3" })
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.GatheringPlace({
    id: "Region3",
    positions: [
      [
        109.307782,
        42.309022,
        1057.2
    ],
    [
        106.247368,
        39.769767,
        1031.9
    ],
    [
        111.287331,
        40.90103,
        1250.9
    ]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "blue",
        alphaPower: 0.8
      },
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}
export function showRegion4() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "Region4" })
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.GatheringPlace({
    id: "Region4",
    positions: [
      [
        99.795581,
        42.235718,
        824
    ],
    [
        105.051159,
        37.970373,
        1315.3
    ],
    [
        105.789749,
        40.571134,
        831.1
    ]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "blue",
        alphaPower: 0.8
      },
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}
export function showRegion5() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "Region5" })
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.GatheringPlace({
    id: "Region5",
    positions: [
      [
        77.943821,
        36.306382,
        3802.8
    ],
    [
        85.615957,
        43.573902,
        3200.3
    ],
    [
        99.189121,
        38.604572,
        3746.6
    ]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "blue",
        alphaPower: 0.8
      },
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic2() {
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.DivBoderLabel({
    position: [116.460722, 31.140888, 781],
    style: {
      text: "火星科技Mars3D平台",
      font_size: 15,
      font_family: "微软雅黑",
      color: "#ccc",
      boderColor: "#15d1f2"
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic)
}

export function showChinaLine() {
  const provinceLine = new mars3d.layer.GeoJsonLayer({
    name: "全国省界",
    url: "data/survey/china.json",
    format: simplifyGeoJSON, // 用于自定义处理geojson
    symbol: {
      type: "polyline",
      styleOptions: {
        width: 1,
        color: "rgba(0,255,255,0)",
        zIndex: 1,
        label: {
          text: "{name}",
          position: "{center}", // 省会位置center
          font_size: 20,
          color: "#ffffff",
          outline: true,
          outlineWidth: 2,
          outlineColor: "#000000",
          scaleByDistance: true,
          scaleByDistance_far: 60000000,
          scaleByDistance_farValue: 0.2,
          scaleByDistance_near: 1000000,
          scaleByDistance_nearValue: 1,
          distanceDisplayCondition: true,
          distanceDisplayCondition_far: 10000000,
          distanceDisplayCondition_near: 100000,
          setHeight: 10000
        }
      },
      styleField: "adcode",
      styleFieldOptions: {
        110000: { color: "rgba(0,100,255,0.9)" },
        120000: { color: "rgba(0,100,255,0.9)" },
        130000: { color: "rgba(0,100,255,0.9)" },
        140000: { color: "rgba(0,100,255,0.9)" },
        150000: { color: "rgba(0,100,255,0.9)" },
        210000: { color: "rgba(0,255,100,0.9)" },
        220000: { color: "rgba(0,255,100,0.9)" },
        230000: { color: "rgba(0,255,100,0.9)" },
        310000: { color: "rgba(0,255,255,0.9)" },
        320000: { color: "rgba(0,255,255,0.9)" },
        330000: { color: "rgba(0,255,255,0.9)" },
        340000: { color: "rgba(0,255,255,0.9)" },
        350000: { color: "rgba(0,255,255,0.9)" },
        360000: { color: "rgba(0,255,255,0.9)" },
        370000: { color: "rgba(0,255,255,0.9)" },
        410000: { color: "rgba(0,255,255,0.9)" },
        420000: { color: "rgba(0,255,255,0.9)" },
        430000: { color: "rgba(0,255,255,0.9)" },
        440000: { color: "rgba(0,255,255,0.9)" },
        450000: { color: "rgba(0,255,255,0.9)" },
        460000: { color: "rgba(0,255,255,0.9)" },
        500000: { color: "rgba(0,255,255,0.9)" },
        510000: { color: "rgba(0,255,255,0.9)" },
        520000: { color: "rgba(0,255,255,0.9)" },
        530000: { color: "rgba(0,255,255,0.9)" },
        540000: { color: "rgba(0,255,255,0.9)" },
        610000: { color: "rgba(0,100,255,0.9)" },
        620000: { color: "rgba(0,100,255,0.9)" },
        630000: { color: "rgba(0,100,255,0.9)" },
        640000: { color: "rgba(0,100,255,0.9)" },
        650000: { color: "rgba(0,100,255,0.9)" },
        710000: { color: "rgba(0,255,255,0.9)" },
        720000: { color: "rgba(0,255,255,0.9)" },
        810000: { color: "rgba(0,255,255,0.9)" }
      }
    }
  })
  map.addLayer(provinceLine)
}
export function showDroughtLine() {
  const provinceLine = new mars3d.layer.GeoJsonLayer({
    name: "drought",
    url: "data/survey/drought_line.json",
    format: this.simplifyGeoJSON, // 用于自定义处理geojson
    symbol: {
      type: "polyline",
      styleOptions: {
        zIndex: 4,
        width: 5,
        color: "#ff0070"
      }
    }
  })
  map.addLayer(provinceLine)
}
export function flyToMap(name) {
  console.log("name......", name)
  const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: name + "沙漠治理情况",
    url: "data/manage/" + name + ".json",
    symbol: {
      styleOptions: {
        // fill: true,
        color: "rgb(2,26,79)",
        zIndex: 10,
        opacity: 0.9,
        outline: true,
        diffHeight: 1000,
        outlineColor: "#39E09B",
        outlineWidth: 8,
        outlineOpacity: 0.8,
        arcType: Cesium.ArcType.GEODESIC,
        clampToGround: true,
        highlight: {
          type: "click",
          color: "#ffff00"
        }
      },
      callback: (attr, styleOpt) => {
        const randomHeight = (attr.childrenNum || 1) * 500 // 测试的高度
        styleOpt.opacity = 0.6
        return {
          materialOptions: {
            color: getDesertColor(attr)
          },
          height: 0,
          opacity: 0.6
        }
      }
    },
    flyTo: true
  })
  console.log("geoJsonLayer....", geoJsonLayer)
  map.addLayer(geoJsonLayer)
  /*
  const graphicLayer = new mars3d.layer.GeoJsonLayer({
    name: name + "边界",
    url: "data/manage/" + name + "boundary.json",
    symbol: {
      type: "wall",
      styleOptions: {
        width: 5,
        diffHeight: 10000, // 墙高
        materialType: mars3d.MaterialType.LineFlow,
        materialOptions: {
          color: "#025460", // 颜色
          opacity: 1, // 透明度
          image: "img/textures/fence.png", // 图片
          repeatX: 1, // 重复数量
          axisY: true, // 竖直方向
          speed: 10 // 速度
        },
        highlight: {
          type: "click",
          color: "#ffff00"
        }
      }
    },
    popup: "{name}",
    flyTo: true,
    flyToOptions: {
      pitch: -43
    }
  })
  map.addLayer(graphicLayer)
  graphicLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
  */
}
export function simplifyGeoJSON(geojson) {
  try {
    geojson = turf.simplify(geojson, {
      tolerance: 0.0001,
      highQuality: true,
      mutate: true
    })
  } catch (e) {
  }
  console.info(geojson)
  return geojson
}
export function getDesertColor(attr) {
  if (attr.type.includes("生态治理")) {
    return "green"
  } else if (attr.type.includes("安装光伏")) {
    return "red"
  } else {
    return "rgba(255,255,255,0.3)"
  }
}
// 是否运行地图鼠标交互
export function enableMapMouseController(value) {
  map.setSceneOptions({
    cameraController: {
      enableZoom: value,
      enableTranslate: value,
      enableRotate: value,
      enableTilt: value
    }
  })
}

// 调整亮度 （演示滑动条）
export function updateBrightness(val) {
  bloomEffect.brightness = val
}

// 调整对比度 （演示滑动条）
export function updateContrast(val) {
  bloomEffect.contrast = val
}

// 创建图层
export function createLayer(layer) {
  return mars3d.LayerUtil.create(layer)
}

// 数据获取
function queryTilesetData() {
  mars3d.Util.fetchJson({ url: "config/tileset.json" })
    .then(function (arr) {
      const modelData = arr.layers
      eventTarget.fire("loadTypeList", { modelData })
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
    })
}

export function flyToWest() {

  
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "WRoute" })
  map.addLayer(graphicLayer)

  map.clock.currentTime = Cesium.JulianDate.fromDate(new Date(2017, 7, 25, 8, 0, 5))
  console.log("map.clock.currentTime...", map.clock.currentTime)
  mars3d.Util.fetchJson({ url: "data/transpath/west_route.json" }).then(function (arrData) {
    
    for (let i = 0; i < arrData.length; i++) {
      // if (tempTime.secondsOfDay !== 43252){
      // }
      const data = arrData[i]
      // 动态坐标属性
      const property = new Cesium.SampledPositionProperty()
      data.path.forEach((item, index) => {
        const startTime = item.time
        console.log("startTime....", startTime)
        let tempTime = Cesium.JulianDate.fromDate(new Date(startTime))
        console.log("tempTime_julian_time", tempTime)
              
        
        tempTime = Cesium.JulianDate.addSeconds(tempTime, 0, new Cesium.JulianDate())
        property.addSample(tempTime, Cesium.Cartesian3.fromDegrees(...item.position))
      })
   
      const times = [].concat(property._property._times)
      const positions = [property.getValue(times.shift())]

      const graphicTriangle = new mars3d.graphic.AttackArrow({
        positions: new Cesium.CallbackProperty(function (time) {
          for (let index = 0, len = times.length; index < len; index++) {
            const item = times[index]
            if (item.secondsOfDay === Math.round(time.secondsOfDay)) {
              if (property.getValue(time)) {
                positions.push(property.getValue(time))
                times.shift()
                break
              }
            }
          }
          const point = property.getValue(time)
          if (point) {
            return positions.concat(point)
          } else {
            return positions
          }
        }, false),
        style: {
          color: "#FF8C00",
          opacity: 1,
          outline: true,
          outlineWidth: 3,
          outlineColor: "#ffffff"
        }
      })
      graphicLayer.clear()
      graphicLayer.addGraphic(graphicTriangle)
      
      this.parent.$message("数据加载中，请稍后") 
      
      
      console.log("graphicLayer....", graphicLayer)
    }
  })
  setTimeout(() => {
    addRouteDesc()
  }, 7000)
  
}
function addRouteDesc() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "WRouteDesc" })
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.DivGraphic({
    position: [97.89, 40.47, 0],
    style: {
      html: `<div class="marsBlueGradientPnl" style="text-align: center;
                padding: 5px 30px;
                margin: 0;
                color: #fff;
                background: linear-gradient(rgb(7 10 203 / 75%), rgb(16 238 220));
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                max-height: 130px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                white-space: nowrap;">
              <div><strong>描述：</strong><br>沙尘天气起源于蒙古国、我国内蒙古西部或新疆南部，<br>受偏西气流引导, 沙尘主体向偏东方向移动，<br>主要影响我国西北、华北，有时还影响到东北地区西部和南部</div>
              <div style="position: absolute;
              bottom: -60px;
              left: calc(50% - 3px);
              display: block;
              width: 3px;
              height: 60px;
              border-right: 3px solid #2bcdbb;"></div>
            </div>`,
      offsetY: -60,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,

      // 高亮时的样式
      highlight: {
        type: mars3d.EventType.click,
        className: "marsBlueGradientPnl-highlight"
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}
function addRouteDescNW() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "NWRouteDesc" })
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.DivGraphic({
    position: [113.52, 43.26, 0],
    style: {
      html: `<div class="marsBlueGradientPnl" style="text-align: center;
                padding: 5px 30px;
                margin: 0;
                color: #fff;
                background: linear-gradient(rgb(7 10 203 / 75%), rgb(16 238 220));
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                max-height: 130px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                white-space: nowrap;">
              <div><strong>描述：</strong>沙尘天气一般起源于蒙古国或我国内蒙古西部，受西北气流引导，<br> 沙尘主体自西北向东南方向移动，或先向东南方向移动，而后随气旋收缩北上转向东北方向移动，<br> 主要影响我国西北和华北，甚至还会影响到黄淮、江淮等地</div>
              <div style="position: absolute;
              bottom: -60px;
              left: calc(50% - 3px);
              display: block;
              width: 3px;
              height: 60px;
              border-right: 3px solid #2bcdbb;"></div>
            </div>`,
      offsetY: -60,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,

      // 高亮时的样式
      highlight: {
        type: mars3d.EventType.click,
        className: "marsBlueGradientPnl-highlight"
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}
function addRouteDescN() {
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "NRouteDesc" })
  map.addLayer(graphicLayer)
  
  const graphic = new mars3d.graphic.DivGraphic({
    position: [112.87, 43.85, 0],
    style: {
      html: `<div class="marsBlueGradientPnl" style="text-align: center;
                padding: 5px 30px;
                margin: 0;
                color: #fff;
                background: linear-gradient(rgb(7 10 203 / 75%), rgb(16 238 220));
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                max-height: 130px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                white-space: nowrap;">
              <div><strong>描述：</strong>沙尘天气一般起源于蒙古国或我国内蒙古西部，受西北气流引导，<br> 沙尘主体自西北向东南方向移动，或先向东南方向移动，而后随气旋收缩北上转向东北方向移动，<br> 主要影响我国西北和华北，甚至还会影响到黄淮、江淮等地</div>
              <div style="position: absolute;
              bottom: -60px;
              left: calc(50% - 3px);
              display: block;
              width: 3px;
              height: 60px;
              border-right: 3px solid #2bcdbb;"></div>
            </div>`,
      offsetY: -60,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,

      // 高亮时的样式
      highlight: {
        type: mars3d.EventType.click,
        className: "marsBlueGradientPnl-highlight"
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}
export function flyToNorthwest() {
  map.clock.currentTime = Cesium.JulianDate.fromDate(new Date(2017, 7, 24, 8, 0, 5))
  console.log("map.clock.currentTime...", map.clock.currentTime)
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "NWRoute" })
  graphicLayer.clear()
  map.addLayer(graphicLayer)
  mars3d.Util.fetchJson({ url: "data/transpath/nw_route.json" }).then(function (arrData) {
    for (let i = 0; i < arrData.length; i++) {
      const data = arrData[i]
      // 动态坐标属性
      const property = new Cesium.SampledPositionProperty()
      data.path.forEach((item, index) => {
        const startTime = item.time
        let tempTime = Cesium.JulianDate.fromDate(new Date(startTime))
        tempTime = Cesium.JulianDate.addSeconds(tempTime, 0, new Cesium.JulianDate())
        console.log("tempTime......nothwest....", tempTime)
        property.addSample(tempTime, Cesium.Cartesian3.fromDegrees(...item.position))
      })
   
      const times = [].concat(property._property._times)
      const positions = [property.getValue(times.shift())]

      const graphicTriangle = new mars3d.graphic.AttackArrow({
        positions: new Cesium.CallbackProperty(function (time) {
          for (let index = 0, len = times.length; index < len; index++) {
            const item = times[index]
            if (item.secondsOfDay === Math.round(time.secondsOfDay)) {
              if (property.getValue(time)) {
                positions.push(property.getValue(time))
                times.shift()
                break
              }
            }
          }
          const point = property.getValue(time)
          if (point) {
           
            return positions.concat(point)
          } else {
    
            return positions
          }
        }, false),
        style: {
          color: "#FF8C00",
          opacity: 0.6,
          outline: true,
          outlineWidth: 3,
          outlineColor: "#ffffff"
        }
      })
      this.parent.$message("数据加载中，请稍后") 
      graphicLayer.addGraphic(graphicTriangle)
    }
  })

  setTimeout(() => {
    addRouteDescNW()
  }, 3000)
}
export function flyToNorth() {
  map.clock.currentTime = Cesium.JulianDate.fromDate(new Date(2017, 7, 23, 8, 0, 5))
  const graphicLayer = new mars3d.layer.GraphicLayer({ id: "NRoute" })
  graphicLayer.clear()
  map.addLayer(graphicLayer)
  mars3d.Util.fetchJson({ url: "data/transpath/north_route.json" }).then(function (arrData) {
    for (let i = 0; i < arrData.length; i++) {
      const data = arrData[i]
      // 动态坐标属性
      const property = new Cesium.SampledPositionProperty()
      data.path.forEach((item, index) => {
        const startTime = item.time
        let tempTime = Cesium.JulianDate.fromDate(new Date(startTime))
        tempTime = Cesium.JulianDate.addSeconds(tempTime, 0, new Cesium.JulianDate())
        property.addSample(tempTime, Cesium.Cartesian3.fromDegrees(...item.position))
      })
   
      const times = [].concat(property._property._times)
      const positions = [property.getValue(times.shift())]
      const graphicTriangle = new mars3d.graphic.AttackArrow({
        positions: new Cesium.CallbackProperty(function (time) {
          for (let index = 0, len = times.length; index < len; index++) {
            const item = times[index]
            if (item.secondsOfDay === Math.round(time.secondsOfDay)) {
              if (property.getValue(time)) {
                positions.push(property.getValue(time))
                times.shift()
                break
              }
            }
          }
          const point = property.getValue(time)
          if (point) {
            return positions.concat(point)
          } else {
            return positions
          }
        }, false),
        style: {
          color: "#FF8C00",
          opacity: 0.6,
          outline: true,
          outlineWidth: 3,
          outlineColor: "#ffffff"
        }
      })
      this.parent.$message("数据加载中，请稍后") 
      graphicLayer.addGraphic(graphicTriangle)
    }
  })

  setTimeout(() => {
    addRouteDescN()
  }, 4000)
}
export function playCaseProcess(caseId, temp) {
   console.log("echarts....", echarts)

   const canvasWindLayer = new mars3d.layer.CanvasWindLayer({
    color: "rgba(255,0,0,.8)", // 颜色
    frameRate: 20, // 每秒刷新次数
    speedRate: 10, // 风前进速率
    particlesNumber: 900,
    maxAge: 120,
    lineWidth: 3
  })
  map.addLayer(canvasWindLayer)

  mars3d.Util.fetchJson({ url: "data/dust_sa_20.json" })
    .then((data) => {
    if (earthWindData) {
        canvasWindLayer.data = earthWindData
        return
    }
    earthWindData = data
    canvasWindLayer.data = earthWindData
    })
    .catch((err) => {
      console.log("failed", err)
    })
    showImages()
/*
    const tileLayer = new mars3d.layer.ImageLayer({
      url: "img/101678337446_.pic.jpg",
      rectangle: { xmin: 70, xmax: 140, ymin: 0, ymax: 60 },
      alpha: 0.7
    })
    map.addLayer(tileLayer)
*/

  /*
  const urlArr = []
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  for (let i = 0; i < 16; i++) {
    urlArr.push("data/" + caseId + "/dust_sa_" + (i < 10 ? "0" + i : i) + ".json")
  }
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })
  })
  const intTask = setInterval(function() {
    // 创建视点，duration参数调节每个步骤时长
    const start = new Date().getTime()
    const graphics = []
    mars3d.Util.fetchJson({
      url: urlArr[0]
    }).then(function(json) {
      // 创建Mapv
      const mid1 = new Date().getTime()
      // graphicLayer.removeGraphic(graphics)
      const radius = 22000
      for (const j in json) {
            const arrData = []
            console.info(temp, temp.indexOf(j), json[j].length)
            if (!temp.indexOf(j) || json[j].length === 0) {
                continue
            }
            const cps = {
                0.1: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.1,
                                speed: 0
                            }),
                0.2: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.2,
                                speed: 0
                            }),
                0.3: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.3,
                                speed: 0
                            }),
                0.4: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.4,
                                speed: 0
                            }),
                0.5: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.5,
                                speed: 0
                            }),
                0.6: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.6,
                                speed: 0
                            }),
                0.7: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.7,
                                speed: 0
                            }),
                0.8: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.8,
                                speed: 0
                            }),
                0.9: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 0.9,
                                speed: 0
                            }),
                1.0: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
                                image: "img/textures/line-arrow-right.png",
                                color: colors[j],   
                                opacity: 1.0,
                                speed: 0
                            })
                }
            for (let k = 0; k < json[j].length; k++) {
                console.log("abc....")
                const item = json[j][k]
                const position = Cesium.Cartesian3.fromDegrees(item[0], item[1], 0)
                let pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, item[4], radius)
                pt1 = mars3d.PointUtil.setPositionsHeight(pt1, 0)
                arrData.push({
                    positions: [position, pt1],
                    style: {
                        width: 8,
                        material: cps[item[6] + ""],
                        opacity: 0.1
                    },
                    attr: item
                })
            }
            console.info("==========", urlArr.length, j, arrData.length, colors[j])
              // 多个线对象的合并渲染。
            const graphic = new mars3d.graphic.PolylineCombine({
                instances: arrData
            })
            graphics.push(graphic)
        }
        graphicLayer.clear()
        graphicLayer.addGraphic(graphics)
        urlArr.shift()
        if (urlArr.length === 0) {
            window.clearInterval(intTask)
        }
        const end = new Date().getTime()
        console.info("用时==========", urlArr.length, end - start)
    }).catch(function(error) {
        console.log("加载JSON出错", error)
    })
  }, 1600)
  */
  // console.log("mappingWind....", mappingWind)
  /*
  const canvasWindLayer = new mars3d.layer.CanvasWindLayer({
    color: "#ffffff", // 颜色
    frameRate: 20, // 每秒刷新次数
    speedRate: 10, // 风前进速率
    particlesNumber: 1000,
    maxAge: 120,
    lineWidth: 2
  })
  map.addLayer(canvasWindLayer)

  loadNetCDF("./data/wind.nc").then((data) => {
    if (earthWindData) {
        canvasWindLayer.data = earthWindData
        return
    }
    earthWindData = data
    canvasWindLayer.data = earthWindData
  })
  */
  
  
}
function showImages() {
  const urlArr = [
    "/img/dust_sa_20.png",
    "/img/dust_sa_21.png",
    "/img/dust_sa_22.png",
    "/img/dust_sa_23.png",
    "/img/dust_sa_24.png",
    "/img/dust_sa_30.png",
    "/img/dust_sa_31.png",
    "/img/dust_sa_32.png",
    "/img/dust_sa_33.png",
    "/img/dust_sa_34.png",
    "/img/dust_sa_35.png",
    "/img/dust_sa_36.png",
    "/img/dust_sa_37.png",
    "/img/dust_sa_38.png",
    "/img/dust_sa_39.png",
    "/img/dust_sa_40.png",
    "/img/dust_sa_41.png",
    "/img/dust_sa_42.png",
    "/img/dust_sa_43.png",
    "/img/dust_sa_43.png",
    "/img/dust_sa_44.png",
    "/img/dust_sa_45.png",
    "/img/dust_sa_46.png",
    "/img/dust_sa_47.png",
    "/img/dust_sa_48.png",
    "/img/dust_sa_49.png",
    "/img/dust_sa_50.png"

  ]

  const arrTileLayer = []
  for (let i = 0, len = urlArr.length; i < len; i++) {
    const tileLayer = new mars3d.layer.ImageLayer({
      url: urlArr[i],
      rectangle: { xmin: 73.16895, xmax: 134.86816, ymin: 12.2023, ymax: 54.11485 },
      alpha: 0
    })
    map.addLayer(tileLayer)
    arrTileLayer.push(tileLayer)
  }

  let step = 0
  const alphaStep = 0.01
  let idxTimer

  function changeRadarAlpha(time) {
    if (step > arrTileLayer.length - 1) {
      step = 0
      arrTileLayer[arrTileLayer.length - 1].alpha = 0
    }
    const layer1 = arrTileLayer[step]
    const layer2 = arrTileLayer[step + 1]
    if (!layer1 || !layer2) {
      return
    }
    layer1.alpha = 1
    layer2.alpha = 0

    clearInterval(idxTimer)
    idxTimer = window.setInterval(function () {
      layer1.alpha -= alphaStep
      layer2.alpha += alphaStep

      if (layer1.alpha < alphaStep) {
        layer1.alpha = 0
        step++
        changeRadarAlpha(time)
      }
    }, time * 300 * alphaStep)
  }

  changeRadarAlpha(1)
}

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
      console.log("variables......", variables)
      // const uAttributes = arrayToMap(variables.u10.attributes)
      // const vAttributes = arrayToMap(variables.v10.attributes)
      const uAttributes = arrayToMap(variables.U.attributes)
      const vAttributes = arrayToMap(variables.V.attributes)
      
      // const arrLon = NetCDF.getDataVariable("longitude").flat()
      // const arrLat = NetCDF.getDataVariable("latitude").flat()
      const arrLon = NetCDF.getDataVariable("lon").flat()
      const arrLat = NetCDF.getDataVariable("lat").flat()
      // const arrU = NetCDF.getDataVariable("u10").flat()
      const arrU = NetCDF.getDataVariable("U").flat()
      // const maxU = 11.5764
      const maxU = uAttributes.max.value
      // const minU = -11.30544
      const minU = uAttributes.min.value
      // const arrV = NetCDF.getDataVariable("v10").flat()
      const arrV = NetCDF.getDataVariable("V").flat()
      const maxV = vAttributes.max.value
      const minV = vAttributes.min.value
      // const maxV = 9.521942
      // const minV = -12.27591

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
