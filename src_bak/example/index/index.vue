<template>
  <mars-dialog :visible="true" :defaultFold="true" :closeable="true" left="10" top="70" height="400" width="380">
    <div class="ui-container">
      <a-form :model="formState" >
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="left">
          <a-collapse-panel key="1" header="Short-term and Imminent Forecast">
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Weather Process Forecast">
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
  </mars-dialog>
  <mars-dialog :visible="true" right="10" top="80">
    <a-space>
      <mars-button @click="viewToSynthesize">Synthesize</mars-button>
      <mars-button @click="viewToActually">Only actually </mars-button>
      <mars-button @click="viewToForecast">Only Forecast</mars-button>
    </a-space>
  </mars-dialog>  
  <mars-dialog :visible="showClockAnimate" left="60" bottom="50">
    <p class="closePannel f-mb">
      <mars-icon icon="close" width="14" @click="onClickHiddenTime" />
    </p>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">current Time：</span>
        <mars-date-picker
          style="width: 170px"
          v-model:value="currrentTime"
          format="YYYY-MM-DD HH:mm:ss"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
          @change="onChangeCurrentTime"
        />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">time Range：</span>
        <mars-range-picker
          v-model:value="nowTimeScope"
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['begin time', 'end time']"
          @change="onRangeChange"
        />
      </a-space>
    </div>
  </mars-dialog>

  <mars-dialog :visible="true" left="0" bottom="0" height="240" width="1920">
    <div class="ui-container">
      <a-form :model="formState" :rules="rules" :label-col="{ span: 1 }" :wrapper-col="{ span: 18 }">
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="right">
          <a-form-item label="多选" class="f-push-20-t">
            <a-checkbox-group v-model:value="formState.checkAlarmTypes" @change="onCheckboxChange">
              <a-checkbox value="Rainstorm">Rainstorm</a-checkbox>
              <a-checkbox value="HeatWave">HeatWave</a-checkbox>
              <a-checkbox value="ColdWave">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
              <a-checkbox value="ColdWave1">ColdWave</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-collapse>
      </a-form>
    </div>
    <div class="chartProcess" id="chartProcess">
      <div id="chartProcess_ul" class="chartProcess_ul"></div>
    </div>    
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue"
import { TableColumnType, TableProps } from "ant-design-vue"
import TileLayerState from "../../components/mars-sample/tile-layer-state.vue"
import axios from "axios"
import dayjs, { Dayjs } from "dayjs"
import * as echarts from "echarts"
import * as mapWork from "./map.js"
import { $message, $notify, $alert } from "@mars/components/mars-ui/index"

const activeKey = ref(["0", "1", "2"])

interface FormState {
  checkAlarmTypes: string[]
}

const formState = reactive<FormState>({
  checkAlarmTypes: ["Rainstorm", "HeatWave", "ColdWave"]
})

const viewToSynthesize = () => {
  mapWork.viewToSynthesize()
}

const viewToActually = () => {
  mapWork.viewToActually()
}
const viewToForecast = () => {
  mapWork.viewToForecast()
}

const HEIGHT_RATIO = 0.6
const DIM_CATEGORY_INDEX = 0
const DIM_TIME_ARRIVAL = 1
const DIM_TIME_DEPARTURE = 2
const DATA_ZOOM_AUTO_MOVE_THROTTLE = 30
const DATA_ZOOM_X_INSIDE_INDEX = 1
const DATA_ZOOM_Y_INSIDE_INDEX = 3
const DATA_ZOOM_AUTO_MOVE_SPEED = 0.2
const DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH = 30
let _draggable
let _draggingEl
let _dropShadow
let _draggingCursorOffset = [0, 0]
let _draggingTimeLength
let _draggingRecord
let _dropRecord
const _cartesianXBounds = []
const _cartesianYBounds = []
let _rawData
let _autoDataZoomAnimator

onMounted(() => {
  const myChart = echarts.init(document.getElementById("chartProcess_ul"))
  const url = "data/process.json"
  axios.get(url).then(function (res: any) {
    _rawData = res.data
    myChart.setOption(makeOption())
    initDrag(myChart)
  })
})


function makeOption() {
  return {
    tooltip: {},
    animation: false,
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        filterMode: "weakFilter",
        height: 20,
        bottom: 0,
        start: 0,
        end: 26,
        handleIcon:
          "path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
        handleSize: "80%",
        showDetail: false
      },
      {
        type: "inside",
        id: "insideX",
        xAxisIndex: 0,
        filterMode: "weakFilter",
        start: 0,
        end: 26,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true
      },
      {
        type: "slider",
        yAxisIndex: 0,
        zoomLock: true,
        width: 10,
        right: 10,
        top: 70,
        bottom: 20,
        start: 95,
        end: 100,
        handleSize: 0,
        showDetail: false
      },
      {
        type: "inside",
        id: "insideY",
        yAxisIndex: 0,
        start: 95,
        end: 100,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
      }
    ],
    grid: {
      show: true,
      top: 4,
      bottom: 4,
      left: 10,
      right: 10,
      backgroundColor: "#ffffff",
      borderWidth: 0
    },
    xAxis: {
      type: "time",
      position: "top",
      splitLine: {
        lineStyle: {
          color: ["#E9EDFF"]
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        lineStyle: {
          color: "#929ABA"
        }
      },
      axisLabel: {
        color: "#929ABA",
        inside: false,
        align: "center"
      }
    },
    yAxis: {
      axisTick: { show: false },
      splitLine: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
      min: 0,
      max: _rawData.parkingApron.data.length
    },
    series: [
      {
        id: "flightData",
        type: "custom",
        renderItem: renderGanttItem,
        dimensions: _rawData.flight.dimensions,
        encode: {
          x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
          y: DIM_CATEGORY_INDEX,
          tooltip: [DIM_CATEGORY_INDEX, DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE]
        },
        data: _rawData.flight.data
      },
      {
        type: "custom",
        renderItem: renderAxisLabelItem,
        dimensions: _rawData.parkingApron.dimensions,
        encode: {
          x: -1,
          y: 0
        },
        data: _rawData.parkingApron.data.map(function (item, index) {
          return [index].concat(item)
        })
      }
    ]
  }
}
function renderGanttItem(params, api) {
  const categoryIndex = api.value(DIM_CATEGORY_INDEX)
  const timeArrival = api.coord([api.value(DIM_TIME_ARRIVAL), categoryIndex])
  const timeDeparture = api.coord([api.value(DIM_TIME_DEPARTURE), categoryIndex])
  const coordSys = params.coordSys
  _cartesianXBounds[0] = coordSys.x
  _cartesianXBounds[1] = coordSys.x + coordSys.width
  _cartesianYBounds[0] = coordSys.y
  _cartesianYBounds[1] = coordSys.y + coordSys.height
  const barLength = timeDeparture[0] - timeArrival[0]
  // Get the heigth corresponds to length 1 on y axis.
  const barHeight = api.size([0, 1])[1] * HEIGHT_RATIO
  const x = timeArrival[0]
  const y = timeArrival[1] - barHeight
  const flightNumber = api.value(3) + ""
  const flightNumberWidth = echarts.format.getTextRect(flightNumber).width
  const text =
    barLength > flightNumberWidth + 40 && x + barLength >= 180
      ? flightNumber
      : ""
  const rectNormal = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength,
    height: barHeight
  })
  const rectVIP = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength / 2,
    height: barHeight
  })
  const rectText = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength,
    height: barHeight
  })
  return {
    type: "group",
    children: [
      {
        type: "rect",
        ignore: !rectNormal,
        shape: rectNormal,
        style: api.style()
      },
      {
        type: "rect",
        ignore: !rectVIP && !api.value(4),
        shape: rectVIP,
        style: api.style({ fill: "#ddb30b" })
      },
      {
        type: "rect",
        ignore: !rectText,
        shape: rectText,
        style: api.style({
          fill: "transparent",
          stroke: "transparent",
          text: text,
          textFill: "#fff"
        })
      }
    ]
  }
}
function renderAxisLabelItem(params, api) {
  const y = api.coord([0, api.value(0)])[1]
  if (y < params.coordSys.y + 5) {
    return
  }
  return {
    type: "group",
    position: [10, y],
    children: [
      {
        type: "path",
        shape: {
          d: "M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z",
          x: 0,
          y: -20,
          width: 90,
          height: 20,
          layout: "cover"
        },
        style: {
          fill: "#368c6c"
        }
      },
      {
        type: "text",
        style: {
          x: 24,
          y: -3,
          text: api.value(1),
          textVerticalAlign: "bottom",
          textAlign: "center",
          textFill: "#fff"
        }
      },
      {
        type: "text",
        style: {
          x: 75,
          y: -2,
          textVerticalAlign: "bottom",
          textAlign: "center",
          text: api.value(2),
          textFill: "#000"
        }
      }
    ]
  }
}
function clipRectByRect(params, rect) {
  return echarts.graphic.clipRectByRect(rect, {
    x: params.coordSys.x,
    y: params.coordSys.y,
    width: params.coordSys.width,
    height: params.coordSys.height
  })
}
// -------------
//  Enable Drag
// -------------

function initDrag(myChart) {
  _autoDataZoomAnimator = makeAnimator(dispatchDataZoom)
  myChart.on("mousedown", function (param) {
    if (!_draggable || !param || param.seriesIndex == null) {
      return
    }
    // Drag start
    _draggingRecord = {
      dataIndex: param.dataIndex,
      categoryIndex: param.value[DIM_CATEGORY_INDEX],
      timeArrival: param.value[DIM_TIME_ARRIVAL],
      timeDeparture: param.value[DIM_TIME_DEPARTURE]
    }
    const style = {
      lineWidth: 2,
      fill: "rgba(255,0,0,0.1)",
      stroke: "rgba(255,0,0,0.8)",
      lineDash: [6, 3]
    }
    _draggingEl = addOrUpdateBar(_draggingEl, _draggingRecord, style, 100)
    _draggingCursorOffset = [
      _draggingEl.position[0] - param.event.offsetX,
      _draggingEl.position[1] - param.event.offsetY
    ]
    _draggingTimeLength =
      _draggingRecord.timeDeparture - _draggingRecord.timeArrival
  })
  myChart.getZr().on("mousemove", function (event) {
    if (!_draggingEl) {
      return
    }
    const cursorX = event.offsetX
    const cursorY = event.offsetY
    // Move _draggingEl.
    _draggingEl.attr("position", [
      _draggingCursorOffset[0] + cursorX,
      _draggingCursorOffset[1] + cursorY
    ])
    prepareDrop()
    autoDataZoomWhenDraggingOutside(cursorX, cursorY)
  })
  myChart.getZr().on("mouseup", function () {
    // Drop
    if (_draggingEl && _dropRecord) {
      updateRawData() &&
        myChart.setOption({
          series: {
            id: "flightData",
            data: _rawData.flight.data
          }
        })
    }
    dragRelease()
  })
  myChart.getZr().on("globalout", dragRelease)
  function dragRelease() {
    _autoDataZoomAnimator.stop()
    if (_draggingEl) {
      myChart.getZr().remove(_draggingEl)
      _draggingEl = null
    }
    if (_dropShadow) {
      myChart.getZr().remove(_dropShadow)
      _dropShadow = null
    }
    _dropRecord = _draggingRecord = null
  }
  function addOrUpdateBar(el, itemData, style, z) {
    const pointArrival = myChart.convertToPixel("grid", [
      itemData.timeArrival,
      itemData.categoryIndex
    ])
    const pointDeparture = myChart.convertToPixel("grid", [
      itemData.timeDeparture,
      itemData.categoryIndex
    ])
    const barLength = pointDeparture[0] - pointArrival[0]
    const barHeight =
      Math.abs(
        myChart.convertToPixel("grid", [0, 0])[1] -
          myChart.convertToPixel("grid", [0, 1])[1]
      ) * HEIGHT_RATIO
    if (!el) {
      el = new echarts.graphic.Rect({
        shape: { x: 0, y: 0, width: 0, height: 0 },
        style: style,
        z: z
      })
      myChart.getZr().add(el)
    }
    el.attr({
      shape: { x: 0, y: 0, width: barLength, height: barHeight },
      position: [pointArrival[0], pointArrival[1] - barHeight]
    })
    return el
  }
  function prepareDrop() {
    // Check droppable place.
    const xPixel = _draggingEl.shape.x + _draggingEl.position[0]
    const yPixel = _draggingEl.shape.y + _draggingEl.position[1]
    const cursorData = myChart.convertFromPixel("grid", [xPixel, yPixel])
    if (cursorData) {
      // Make drop shadow and _dropRecord
      _dropRecord = {
        categoryIndex: Math.floor(cursorData[1]),
        timeArrival: cursorData[0],
        timeDeparture: cursorData[0] + _draggingTimeLength
      }
      const style = { fill: "rgba(0,0,0,0.4)" }
      _dropShadow = addOrUpdateBar(_dropShadow, _dropRecord, style, 99)
    }
  }
  // This is some business logic, don't care about it.
  function updateRawData() {
    const flightData = _rawData.flight.data
    const movingItem = flightData[_draggingRecord.dataIndex]
    // Check conflict
    for (let i = 0; i < flightData.length; i++) {
      const dataItem = flightData[i]
      if (
        dataItem !== movingItem &&
        _dropRecord.categoryIndex === dataItem[DIM_CATEGORY_INDEX] &&
        _dropRecord.timeArrival < dataItem[DIM_TIME_DEPARTURE] &&
        _dropRecord.timeDeparture > dataItem[DIM_TIME_ARRIVAL]
      ) {
        alert("Conflict! Find a free space to settle the bar!")
        return
      }
    }
    // No conflict.
    movingItem[DIM_CATEGORY_INDEX] = _dropRecord.categoryIndex
    movingItem[DIM_TIME_ARRIVAL] = _dropRecord.timeArrival
    movingItem[DIM_TIME_DEPARTURE] = _dropRecord.timeDeparture
    return true
  }
  function autoDataZoomWhenDraggingOutside(cursorX, cursorY) {
    // When cursor is outside the cartesian and being dragging,
    // auto move the dataZooms.
    const cursorDistX = getCursorCartesianDist(cursorX, _cartesianXBounds)
    const cursorDistY = getCursorCartesianDist(cursorY, _cartesianYBounds)
    if (cursorDistX !== 0 || cursorDistY !== 0) {
      _autoDataZoomAnimator.start({
        cursorDistX: cursorDistX,
        cursorDistY: cursorDistY
      })
    } else {
      _autoDataZoomAnimator.stop()
    }
  }
  function dispatchDataZoom(params) {
    const option = myChart.getOption()
    const optionInsideX = option.dataZoom[DATA_ZOOM_X_INSIDE_INDEX]
    const optionInsideY = option.dataZoom[DATA_ZOOM_Y_INSIDE_INDEX]
    const batch = []
    prepareBatch(
      batch,
      "insideX",
      optionInsideX.start,
      optionInsideX.end,
      params.cursorDistX
    )
    prepareBatch(
      batch,
      "insideY",
      optionInsideY.start,
      optionInsideY.end,
      -params.cursorDistY
    )
    batch.length &&
      myChart.dispatchAction({
        type: "dataZoom",
        batch: batch
      })
    function prepareBatch(batch, id, start, end, cursorDist) {
      if (cursorDist === 0) {
        return
      }
      const sign = cursorDist / Math.abs(cursorDist)
      const size = end - start
      const delta = DATA_ZOOM_AUTO_MOVE_SPEED * sign
      start += delta
      end += delta
      if (end > 100) {
        end = 100
        start = end - size
      }
      if (start < 0) {
        start = 0
        end = start + size
      }
      batch.push({
        dataZoomId: id,
        start: start,
        end: end
      })
    }
  }
  function getCursorCartesianDist(cursorXY, bounds) {
    const dist0 = cursorXY - (bounds[0] + DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH)
    const dist1 = cursorXY - (bounds[1] - DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH)
    const data = 0
    if (dist0 * dist1 > 0) {
       return dist0 < 0 ? dist0 : dist1
    } else {
       return 0 
    }
  }
  function makeAnimator(callback) {
    let requestId
    let callbackParams
    // Use throttle to prevent from calling dispatchAction frequently.
    callback = echarts.throttle(callback, DATA_ZOOM_AUTO_MOVE_THROTTLE)
    function onFrame() {
      callback(callbackParams)
      requestId = requestAnimationFrame(onFrame)
    }
    return {
      start: function (params) {
        callbackParams = params
        if (requestId == null) {
          onFrame()
        }
      },
      stop: function () {
        if (requestId != null) {
          cancelAnimationFrame(requestId)
        }
        requestId = callbackParams = null
      }
    }
  }
}
</script>
<style lang="less">
.infoView {
  overflow-y: auto;
}

.color-state {
  padding-bottom: 1.3px;
}
.ui-container {
  // height: 100%;
  // overflow-y: scroll;
}
.infoView {
  width: 240px;
  height: 100%;
}
.chartProcess{
  width: 98%;
  height: 96%;
  margin-bottom: 6px;
  position: relative;
  border: 1px solid #17366c;
  background: linear-gradient(to left, #3897cf, #3897cf) left top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left top no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) right top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) right top no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) left bottom no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left bottom no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat, linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat;
  background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
  background-color: rgba(0, 0, 0, 0.1);
  h6 {
    color: #ffffff;
  }
}
.chartProcess_ul{
  width: 100%;
  height: 90%;
  position: absolute;
  left: 0%;
  bottom: 0px;
}
</style>
