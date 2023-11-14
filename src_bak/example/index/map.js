import * as mars3d from "mars3d"
import axios from "axios"
export let map // mars3d.Map三维地图对象
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）

export let graphicLayer // 矢量图层对象
let mapSplit

// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()

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
  


  const mapDom1 = document.getElementById("centerDiv3D")
  mapDom1.style.width = "50%"
  mapDom1.style.height = "100%"
  mapDom1.style.left = "0%"

  const mapDom2 = mars3d.DomUtil.create("div", "", document.body)
  mapDom2.setAttribute("id", "centerDiv02")
  mapDom2.style.width = "50%"
  mapDom2.style.height = "100%"
  mapDom2.style.left = "0%"
  mapDom2.style.display = "block"
  const mapOptions2 = map.getCurrentOptions() // map.getOptions()
  mapOptions2.control = false
  mapSplit = new mars3d.control.MapCompare({
    ...mapOptions2,
    parentContainer: mapDom2
  })
  map.addControl(mapSplit)


  eventTarget.fire("init", {
    value: 10
  })

  
  
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  console.log("onUnmounted执行了")
  map.graphicLayer.clear()
  
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

/**
 * 打开geojson文件
 *
 * @export
 * @param {FileInfo} file 文件
 * @returns {void} 无
 */
export function openGeoJSON(name, url) {
  // geojson = simplifyGeoJSON(geojson) // 简化geojson的点
  graphicLayer = new mars3d.layer.GeoJsonLayer({
    name: name,
    hasEdit: true,
    url: url
  })
  map.addLayer(graphicLayer)
}

export function viewToActually() {
  const mapDom1 = document.getElementById("centerDiv3D")
  const mapDom2 = document.getElementById("centerDiv02")
  mapDom2.style.display = "none"
  mapDom1.style.display = "block"
  mapDom1.style.left = "0"
  mapDom1.style.width = "100%"
}

export function viewToForecast() {
  const mapDom1 = document.getElementById("centerDiv3D")
  const mapDom2 = document.getElementById("centerDiv02")
  mapSplit.setOptions({ className: "mars3d-container mars3d-mapCompare1" })
  mapDom1.style.display = "none"
  mapDom2.style.width = "100%"
  mapDom2.style.height = "100%"
  mapDom2.style.left = "0%"
  mapDom2.style.display = "block"

}

export function viewToSynthesize() {
  const mapDom1 = document.getElementById("centerDiv3D")
  const mapDom2 = document.getElementById("centerDiv02")
  mapDom1.style.width = "50%"
  mapDom1.style.height = "100%"
  mapDom1.style.left = "0%"
  mapDom2.style.width = "50%"
  mapDom2.style.height = "100%"
  mapDom2.style.left = "0%"
  mapDom2.style.display = "block"
  mapSplit.setOptions({ className: "mars3d-mapCompare" })
}
