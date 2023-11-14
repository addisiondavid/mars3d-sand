<template>  <mars-dialog 
    :visible="true" 
    :draggable="true" 
    :closeable="true" 
    title="Menu" left="20" top="90" width="420" height="840" customClass="pannel">
    <a-space>
      <mars-button v-for="(ele1,key1) in menuData" :key="key1" @click="showSubMenu(key1)">{{ele1.subtitle}}</mars-button>
    </a-space>
    <div class="ui-container" v-if="subMenu.length>0">
      <a-collapse v-model:activeKey="activeKey" expandIconPosition="left" >
        <a-collapse-panel v-for="(ele2,key2) in subMenu" :key="key2" :header="ele2.subtitle" class="btnView">
          <a-form-item class="f-tac" >
            <a-space>
              <mars-button size="middle" v-for="(ele3,key3) in ele2.childs" :key="key3" @click="onClickShowData(ele3)" class="meteo-btn">
                {{ele3.subtitle}}
              </mars-button>
            </a-space>
          </a-form-item>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </mars-dialog>
  <mars-dialog :visible="true" :draggable="true" right="60" bottom="100" width="420" title="Layer Manage">
   <a-form-item label="Data High">
      <mars-slider v-model:value="formState.layer" :marks="layers" :min="2" :max="110000" :step="1" @change="onMarkSliderChange" />
    </a-form-item>
    <legendSlider :legendItemStr="legendItemStr">图例</legendSlider>
    <tile-layer-state />
  </mars-dialog>
  
  <mars-dialog :visible="showClockAnimate" left="60" bottom="50">
    <p class="closePannel f-mb">
      <mars-icon icon="close" width="14" @click="onClickHiddenTime" />
    </p>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">当前时间：</span>
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
        <span class="mars-pannel-item-label">时间范围：</span>
        <mars-range-picker
          v-model:value="nowTimeScope"
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['开始时间', '结束时间']"
          @change="onRangeChange"
        />
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue"
import { TableColumnType, TableProps } from "ant-design-vue"
import axios from "axios"
import dayjs, { Dayjs } from "dayjs"
import * as mapWork from "./map.js"
import { $message, $notify, $alert } from "@mars/components/mars-ui/index"
import menuData from "./menuData.js"
import boundaries from "./boundaries.js"
import TileLayerState from "../layers/layer-control.vue"
import legendData from "../layers/legendData.js"
import legendSlider from "../layers/legendSlider.vue"
import isolines from "../layers/turf-isolines/index.js"

const activeKey = ref(["0", "1", "2", "3", "4", "5", "6"])
const subMenu = ref([])
subMenu.value = menuData[0].childs
const legendItemStr = {}
const layers: Record<number, any> = {
  2: "地面",
  50000: "500",
  55000: "",
  60000: "600",
  65000: "",
  70000: "700",
  75000: "",
  80000: "",
  85000: "850",
  90000: "",
  92500: "",
  95000: "",
  97500: "",
  100000: "1000"
}
let curdataEle = {}
interface FormState {
  layer: number
}
const formState = reactive<FormState>({
  layer: 70000
})
const showClockAnimate = ref<boolean>(false)
const nowTimeScope = ref<[Dayjs, Dayjs]>()
const currrentTime = ref<Dayjs>()

mapWork.eventTarget.on("clickShowClockAnimate", (e: any) => {
  showClockAnimate.value = !showClockAnimate.value
  nowTimeScope.value = [dayjs(e.startTime), dayjs(e.stopTime)]
  currrentTime.value = dayjs(e.currentTime)
})

const showSubMenu = (ele) => {
  subMenu.value = menuData[ele].childs
  console.info(subMenu)
  // mapWork.eventTarget.fire("subMenu", { subMenu }) 
}
const onClickHiddenTime = () => {
  showClockAnimate.value = false
}
const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  mapWork.setClockAnimateTime(dateString[0], dateString[1])
}
const onChangeCurrentTime = (value: Dayjs) => {
  mapWork.setCurrentTime(value)
}

const onClickShowData = (ele) => {
  console.info(legendItemStr)
  legendItemStr.value = legendData[ele.legend]
  console.info(ele, legendItemStr)
  formState.layer = ele.defaultLevel
  curdataEle = ele
  showData(ele)
}
const showData = (ele) => {
  const time = "20230310000000"
  // 图片
  if (ele.supertype === "2") {
    mapWork.showImage(ele)
  // Geojson
  } else if (ele.supertype === "3") {
    mapWork.showGeojson(ele, time, 9, formState.layer, legendData[ele.legend])
  // Station
  } else if (ele.supertype === "4") {
    mapWork.showStation(ele, time, 9, formState.layer, legendData[ele.legend])
  // 灰度图
  } else if (ele.supertype === "5") {
    mapWork.showGray(ele, time, 9, formState.layer, legendData[ele.legend], boundaries)
  // 风流场
  } else if (ele.supertype === "7") {
    mapWork.addUVLine(ele, time, 9, formState.layer, legendData[ele.legend])
  // 等值线
  } else if (ele.supertype === "9") {
    mapWork.addIsoLine(ele, time, 9, formState.layer, legendData[ele.legend], boundaries)
  // 站点（支持站点、格点、等值线、色斑图）
  } else if (ele.supertype === "10") {
    mapWork.addStation(ele, time, 9, formState.layer, legendData[ele.legend])
  // 格点（色斑图）
  } else if (ele.supertype === "11") {
    mapWork.addIsosurface(ele, time, 9, formState.layer, legendData[ele.legend])
  // UV风
  } else if (ele.supertype === "12") {
    mapWork.addUVBarb(ele, time, 9, formState.layer, legendData[ele.legend])
  // 数值
  } else if (ele.supertype === "13") {
    mapWork.addDataValue(ele, time, 9, formState.layer, legendData[ele.legend])
  }
}
onMounted(() => {
  // 访问后端接口

})
const contrast = () => {
  mapWork.contrast()
}
// 带刻度滑动条修改事件
const onMarkSliderChange = () => {
  let layer = 0
  for (const k in layers) {
    if (formState.layer >= k) {
      layer = k
    } else {
      break 
    }
  }
  formState.layer = layer 
  console.info(formState.layer) // 调用地图方法
  showData(curdataEle)
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
  margin-top: 10px;
  height: 100%;
  overflow-y: scroll;
}
.infoView {
  width: 240px;
  height: 100%;
}
.btnView {
  width: 360px;
  color: yellow !important;
  .ant-space {
    flex-wrap: wrap;
  }
}
.mars-button {
  background-color: #2F4F4F63 !important;
}
</style>
