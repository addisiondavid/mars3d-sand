/**
 * 图层管理
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
let measureObj
export const eventTabel = new mars3d.BaseClass()
export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars3d.Map) {
  map = mapInstance // 记录首次创建的map

  addMeasure()
}

function addMeasure() {
  measureObj = new mars3d.thing.Measure({
    // 设置文本样式
    label: {
      color: "#ffffff",
      font_family: "楷体",
      font_size: 20
    }
  })
  map.addThing(measureObj)

  // 触发事件：开始分析前
  measureObj.on(mars3d.EventType.start, function (e) {
    // console.log("开始分析", e)
    // showLoading()
  })

  // 触发事件：异步分析完成后
  measureObj.on(mars3d.EventType.end, function (e) {
    // console.log("分析结束", e)

    // hideLoading()
    if (e.graphic?.type === mars3d.graphic.SectionMeasure.type) {
      eventTarget.fire("measureEnd", e)
    }
  })

  measureObj.on(mars3d.EventType.click, function (e) {
    // console.log("单击了对象", e)
    hideTipMarker()

    if (e.graphic?.type === mars3d.graphic.SectionMeasure.type) {
      eventTarget.fire("measureClick", { value: e.graphic?.measured })
    }
  })
}

export function removeAll() {
  measureObj.clear()
  hideTipMarker()
}

export function measureSection() {
  measureObj.section({
    // maxPointNum:2,
    splitNum: 300, // 插值次数
    exact: false // 是否进行精确计算， 传false时是否快速概略计算方式，该方式计算精度较低，但计算速度快，仅能计算在当前视域内坐标的高度
  })
}

export function calculation(params) {
  const len = mars3d.MeasureUtil.formatDistance(Number(params.axisValue))
  const hbgdStr = mars3d.MeasureUtil.formatDistance(Number(params.value))

  return { len, hbgdStr }
}

let tipGraphic
/**
 *  echart图表中的图标
 *
 * @export
 * @param {Array} point 坐标点
 * @param {number} z 海拔高度
 * @param {html} inthtml html
 * @returns {void}
 */
export function showTipMarker(point, z, inthtml) {
  const _position_draw = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, z)

  if (!tipGraphic) {
    tipGraphic = new mars3d.graphic.BillboardEntity({
      name: "当前点",
      position: _position_draw,
      style: {
        image: "img/marker/mark-blue.png",
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.2)
      }
    }).addTo(map.graphicLayer)
    tipGraphic._setPositionsToCallback()
  }
  tipGraphic._position_draw = _position_draw
  tipGraphic.bindPopup(inthtml).openPopup()
}

export function hideTipMarker() {
  if (!tipGraphic) {
    return
  }
  tipGraphic.remove(true)
  tipGraphic = null
}
