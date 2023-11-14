<template>
  <mars-dialog :visible="true" left="10" top="80" bottom="50" width="400">
    <div class="ui-container">
      <a-form :model="formState" >
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="left">
          <a-collapse-panel key="1" header="沙漠分布">  
            <a-checkbox-group v-model:value="formState.checkLayVal" @change="onClickShowLayer">
              <a-checkbox value="Desert">沙漠</a-checkbox>
              <a-checkbox value="Shadi">沙地</a-checkbox>
              <a-checkbox value="Gebi">戈壁</a-checkbox>
            </a-checkbox-group> 
          </a-collapse-panel>
          <a-collapse-panel key="2" header="传输路径">
          
              <a-checkbox value="WRoute" @change="onClickShowLayerW">偏西路径</a-checkbox>
              <a-checkbox value="NWRoute" @change="onClickShowLayerN">西北路径</a-checkbox>
              <a-checkbox value="NRoute"  @change="onClickShowLayerNW">偏北路径</a-checkbox>
             
          </a-collapse-panel>
          <a-collapse-panel key="3" header="沙源地">  
            <a-checkbox-group v-model:value="formState.checkSourceVal" @change="onClickShowRegionLayer">
              <a-checkbox value="Region1">蒙古国西南部</a-checkbox>
              <a-checkbox value="Region6">蒙古国东南部</a-checkbox>
              <a-checkbox value="Region2" >内蒙古中部</a-checkbox>
              <a-checkbox value="Region3" >河套周边</a-checkbox>
              <a-checkbox value="Region4" >内蒙西部</a-checkbox>
              <a-checkbox value="Region5" >其它</a-checkbox>
            </a-checkbox-group> 
          </a-collapse-panel>
          <a-collapse-panel key="4" header="个例选择">
            <mars-table
              size="small"
              :customRow="customTableRow"
              bordered
              :pagination="{ pageSize: 18 }"
              :columns="columns"
              :dataSource="caseList"
              rowKey="id"
            >
            </mars-table>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
  </mars-dialog>
  <!-- ecahrt图表 -->
  <mars-dialog v-model:visible="infoShow" :right="40"  :top="100" :bottom="40" style="height:100px !important">
    <a-form :model="showInfo" class="infoView" >
        <a-form-item label="沙漠名称">
            <mars-input v-model:value="showInfo.name" aria-readonly="true"/>
        </a-form-item>
        <a-form-item label="地理位置">
            <mars-input v-model:value="showInfo.position" aria-readonly="true"/>
        </a-form-item>
        <a-form-item label="沙漠面积">
            <mars-input v-model:value="showInfo.area" aria-readonly="true"/>
        </a-form-item>
        <a-form-item label="气候类型">
            <mars-input v-model:value="showInfo.climate" aria-readonly="true"/>
        </a-form-item>
        <a-form-item label="气候概述">
            <mars-textarea v-model:value="showInfo.climateInfo" aria-readonly="true" style="height: 262px" />
        </a-form-item>
        <a-form-item label="生态治理">
            <mars-input v-model:value="showInfo.ecoGovernanceSize" aria-readonly="true"/>
        </a-form-item>
        <a-form-item label="生态治理占比">
            <mars-input v-model:value="showInfo.ecoGovernancePercentage" aria-readonly="true"/>
        </a-form-item>
        <a-form-item label="光伏治理">
            <mars-input v-model:value="showInfo.phoGovernanceSize" aria-readonly="true"/>
        </a-form-item>
        <a-form-item label="光伏治理占比">
            <mars-input v-model:value="showInfo.phoGovernancePercentage" aria-readonly="true"/>
        </a-form-item>
        <a-form-item label="沙漠景象">
            <img :src="showInfo.img" style="width: 162px" />
        </a-form-item>
    </a-form>
  </mars-dialog>
  
  <mars-dialog :right="40"  :top="100" :bottom="40" v-model:visible="individualExample" width="450" height="100">
    <div class="bg">
      <div class="_item_top">
        <div class="_item_title">历次沙尘过程中对北京PM浓度的贡献率(%)</div>
      </div>
      <div class="_item_row _item_full_box_width justify-between">
        <div class="row1 flex-1">
          <img src="/img/icon/监测建筑.png" alt="" class="icon" />
          <div class="row1_right">
            <div class="right_title">过程时间</div>
            <div class="right_sub_title">20210110</div>
          </div>
        </div>
        
      </div>
    <div class="_item_row" style="align-items: center">
        <div class="row3">
          <div class="_item_row_box3">
            <div class="ring1">
              <div ref="ring" id="ring"></div>
            </div>
          </div>
        </div>
        <div class="row2 flex items-center">
          <div class="_item_row_box2">
            <div class="box2_item" count="28.1" style="font-size:18px;padding-left:40px">蒙古国西南部</div>
            <div class="box2_item1" count="8.1" style="font-size:18px;padding-left:40px">蒙古国东南部</div>
            <div class="box2_item2" count="1.7" style="font-size:18px;padding-left:40px">内蒙古中部</div>
            <div class="box2_item5" id="box2_item8" count="15.7" style="font-size:18px;padding-left:40px">河套周边</div>
            <div class="box2_item4" id="box2_item9" count="6.8" style="font-size:18px;padding-left:40px">内蒙西部</div>
            <div class="box2_item5" id="box2_item10" count="4.8" style="font-size:18px;padding-left:40px">其他</div>
          </div>
        </div>
    </div>
    <div class="bg">
      <div class="right_item">
        <div class="_item_top item_bottom" style="padding-top:1em">
          
        </div>
        <div class="_item_full_box">
          <div class="bar">
            <div id="bar" ref="bar"></div>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue"
import { TableColumnType, TableProps } from "ant-design-vue"
import axios from "axios"
import type { Dayjs } from "dayjs"
import * as mapWork from "./map.js"
import { $message, $notify, $alert } from "@mars/components/mars-ui/index"
import { Target } from "@icon-park/svg"
import * as mars3d from "mars3d"
import * as echarts from "echarts"
import Data1 from "../../../public/data/chart/20210110"
import Data2 from "../../../public/data/chart/20210315"

const activeKey = ref(["0", "1", "2", "3", "4"])
const individualExample = ref<boolean>(false)
const piechartData = ref(
  Data1
)

const infoShow = ref<boolean>(false)
interface FormState {
  checkLayVal: string[]
  checkRouteVal: string[]
  checkSourceVal: string[]
}

const formState = reactive<FormState>({
  checkLayVal: [],
  checkRouteVal: [],
  checkSourceVal: []
})

const onClickShowRegionLayer = () => {
  const arr = []
  for (const key in formState.checkSourceVal) {
    arr.push(formState.checkSourceVal[key])
  } 
  console.log("formState.checkLayVal....", formState.checkSourceVal)
  console.log("arr.........", arr)
  if (arr.indexOf("Region1") > -1) {
    mapWork.showRegion1()
  } 
  if (arr.indexOf("Region6") > -1) {
    mapWork.showRegion6()
  } else {
    mapWork.clearLayer("Region6")
  }
  if (arr.indexOf("Region2") > -1) {
    mapWork.showRegion2()
  } else {
    mapWork.clearLayer("Region2")
  }
  if (arr.indexOf("Region3") > -1) {
    mapWork.showRegion3()
  } else {
    mapWork.clearLayer("Region3")
  }
  if (arr.indexOf("Region4") > -1) {
    mapWork.showRegion4()
  } else {
    mapWork.clearLayer("Region4")
  }
  if (arr.indexOf("Region5") > -1) {
    mapWork.showRegion5()
  } else {
    mapWork.clearLayer("Region5")
  }
}
// 显示消息提示，自动消失
const onClickShowLayer = () => {
  const arr = []
  for (const key in formState.checkLayVal) {
    arr.push(formState.checkLayVal[key])
  } 
  console.log("formState.checkLayVal....", formState.checkLayVal)
  console.info(arr)
  if (arr.indexOf("Desert") > -1) {
    mapWork.showDesertLayer()
  } else {
    mapWork.clearLayer("Desert")
  }
  if (arr.indexOf("Shadi") > -1) {
    mapWork.showSandLayer()
  } else {
    mapWork.clearLayer("Shadi")
  }
  if (arr.indexOf("Gebi") > -1) {
    mapWork.showGebi()
  } else {
    mapWork.clearLayer("Gebi")
  }
}
const onClickShowLayerW = (val) => {
  if (val.target.checked === false) {
    mapWork.clearLayer("WRoute")
    mapWork.clearLayer("WRouteDesc")
  } else {
    mapWork.flyToWest()
  }
}
const onClickShowLayerNW = (val) => {
  if (val.target.checked === false) {
    mapWork.clearLayer("NWRoute")
    mapWork.clearLayer("NWRouteDesc")
  } else {
    mapWork.flyToNorthwest()
  }
}
const onClickShowLayerN = (val) => {
  if (val.target.checked === false) {
    mapWork.clearLayer("NRoute")
    mapWork.clearLayer("NRouteDesc")
  } else {
    mapWork.flyToNorth()
  }
}
const region1 = (val) => {
  if (val.target.checked === false) {
    mapWork.clearLayer("Region1")
   
  } else {
    mapWork.showRegion1()
  }
}
const region2 = (val) => {
  if (val.target.checked === false) {
    mapWork.clearLayer("Region2")
   
  } else {
    mapWork.showRegion2()
  }
}
const region3 = (val) => {
  if (val.target.checked === false) {
    mapWork.clearLayer("Region3")
   
  } else {
    mapWork.showRegion3()
  }
}
const region4 = (val) => {
  if (val.target.checked === false) {
    mapWork.clearLayer("Region4")
   
  } else {
    mapWork.showRegion4()
  }
}
const region5 = (val) => {
  if (val.target.checked === false) {
    mapWork.clearLayer("Region5")
   
  } else {
    mapWork.showRegion5()
  }
}


// 按钮点击事件，演示loading持续三秒
const onClickLoading = async () => {
  $message("演示遮盖loading 持续三秒")

  window.$showLoading()
  setTimeout(() => {
    // 关闭loading
    window.$hideLoading()

    // 默认的信息提示
    $message("演示加载完成提示")
  }, 3000)
}

// 按钮点击事件，演示顶部不遮盖的loading
const onClickTopLoading = () => {
  $message("演示顶部不遮盖的loaing,看上面", "warning")

  window.$showLoading("top") // top 调用出现在顶部的加载进度
  setTimeout(() => {
    window.$hideLoading("top")

    $message("演示加载失败提示", "error")
  }, 3000)
}

// ========================= 表格控件相关处理============================

// 表格列头
const columns: TableColumnType[] = [
  {
    title: "开始时间",
    dataIndex: "beginName"
  },
  {
    title: "结束时间",
    dataIndex: "endName"
  }
]

interface sandcase {
  id: number
  beginName: string
  endName: string
  begin: string
  end: string
}
const caseList = ref<sandcase[]>([]) // 列表数据
onMounted(() => {
  // 访问后端接口，取台风列表数据
  const url = "data/case.json"
  axios.get(url).then(function (res: any) {
    const data = res.data
    caseList.value = data.caseList.map((item: any) => ({
      id: item[0],
      beginName: item[1],
      endName: item[2],
      begin: item[3],
      end: item[4]
    }))
  })
})


// 点击表格列表的行
const customTableRow = (selectedRow: any) => {
  return {
    onClick: (row: any) => {
      $message("点击表格的行：" + selectedRow.begin + selectedRow.begin + "个例")
      const params = []
      for (const key in formState.checkSourceVal) {
        params.push(formState.checkSourceVal[key])
      }
      mapWork.playCaseProcess(selectedRow.begin, params)
      individualExample.value = true
      console.log("selectedRow.begin,,,,...................,", selectedRow.begin)
      const yearTime = selectedRow.begin
      if (yearTime === "20210110") {
         piechartData.value = Data1
      } else if (yearTime === "20210315") {
         piechartData.value = Data2
      }
      setTimeout(() => {
        initEcharts()
      }, 100)
      
      // 20210110
      
    }
  }
}

const ring = ref()
const line = ref()
const bar = ref()

const initEcharts = () => {
  // 饼形图
  const myChart = echarts.init(ring.value)
  const option = {
    backgroundColor: "transparent",
    legend: {
      show: false,
      top: "0%",
      left: "center",
      icon: "roundRect",
      itemWidth: 8,
      textStyle: {
        fontSize: fontSize(0.68)
      }
    },

    series: [
      {
        type: "pie",
        radius: "99%",
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderType: "solid",
          borderColor: "#ffffff"
        },
        emphasis: {
          scale: false,
          scaleSize: 2
        },
        label: {
          show: true,
          position: "center",
          lineHeight: 28,
          formatter: () => {
            return ""
          },
          emphasis: {
            formatter: (params: any) => {
              return "{p|" + params.data.name + "}" + "\n{nm|" + params.data.value + "}"
            }
          },
          rich: {
            p: {
              width: 130,
              itemWidth: 100,
              color: "#fff",
              fontSize: fontSize(1),
              lineHeight: fontSize(1),
              fontWeight: "bold"
              //   backgroundColor: "rgba(15, 21, 70, 1)", // 覆盖index=0时的数据
            },
            nm: {
              width: 130,
              itemWidth: 100,
              color: "#fff",
              fontSize: fontSize(1.5),
              lineHeight: fontSize(1.625),
              fontWeight: "bold"
              //   backgroundColor: "rgba(15, 21, 70, 1)", // 覆盖index=0时的数据
            }
          }
        },
        labelLine: {
          show: false
        },
        data: piechartData.value
      }
    ]
  }
  console.log("piechartData.value...", piechartData.value)
  
  myChart.setOption(option)

}
const fontSize = (res: number) => {
  return res * 16
}

interface ShowInfo {
  name: string
  area: string
  position: string
  ecoGovernanceSize :string
  phoGovernanceSize :string
  ecoGovernancePercentage :string
  phoGovernancePercentage :string
  climate: string
  climateInfo: string
  img: string

}

const showInfo = reactive<ShowInfo>({
  name: "",
  area: "",
  position: "",
  climate: "",
  climateInfo: "",
  ecoGovernanceSize: "",
  phoGovernanceSize: "",
  ecoGovernancePercentage: "",
  phoGovernancePercentage: "",
  img: ""
})
onMounted(() => {
  // 访问后端接口，取台风列表数据
  showSandName()
  // mapWork.showRegion1()
  // mapWork.showRegion2()
  // mapWork.showRegion3()
  // mapWork.showRegion4()

})

const showSandName = () => {
    // 添加矢量图层
    /*
  const sandNameLayer = new mars3d.layer.GeoJsonLayer({
    name: "沙漠名称数据",
    url: "data/survey/sandName.json",
    zIndex: 90
  })
  mapWork.map.addLayer(sandNameLayer)
  */
  const sandNameLayer = new mars3d.layer.GraphicLayer()
  const url = "data/survey/sandName.json"
  axios.get(url).then(function (res: any) {
    console.log("res....", res)
    res.data.features.forEach(elem => {
      
      const graphic = new mars3d.graphic.DivBoderLabel({
      position: elem.geometry.coordinates,
        style: {
          text: elem.properties.name,
          font_size: 15,
          font_family: "微软雅黑",
          color: "black",
          boderColor: "#15d1f2"
        },
        attr: elem.properties
      })
      sandNameLayer.addGraphic(graphic)
    })
  })
  mapWork.map.addLayer(sandNameLayer)
  
  sandNameLayer.on(mars3d.EventType.click, (event) => {
    console.log("event....", event)
    const property = event.graphic.options.attr
    infoShow.value = true
    if (property.group !== "") {
      // mapWork.flyToMap(property.group)
      mapWork.flyToMap(property.group2)
    }
    nextTick(() => {
      showInfo.name = property.name
      showInfo.area = property.area
      showInfo.position = property.position
      showInfo.climate = property.climate
      showInfo.climateInfo = property.climateInfo
      showInfo.ecoGovernanceSize = property.ecoGovernanceSize
      showInfo.ecoGovernancePercentage = property.ecoGovernancePercentage
      showInfo.phoGovernanceSize = property.phoGovernanceSize
      showInfo.phoGovernancePercentage = property.phoGovernancePercentage
      showInfo.img = "img/sand/" + property.group + ".jpeg"
      console.info(infoShow, showInfo)
    })
  })
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
  height: 100%;
  overflow-y: scroll;
}
.infoView {
  width: 240px;
  height: 100%;
}
.marsBlackPanel {
  min-width: 90px;
  min-height: 35px;
  position: absolute;
  left: 16px;
  bottom: 31px;
  cursor: default;
  border-radius: 4px;
  opacity: 0.96;
  border: 1px solid #14171c;
  box-shadow: 0px 2px 21px 0px rgba(33, 34, 39, 0.55);
  border-radius: 4px;
  box-sizing: border-box;
  background: linear-gradient(0deg, #1e202a 0%, #0d1013 100%);
}

.marsBlackPanel::before {
  content: "";
  width: calc(100% + 22px);
  height: 39px;
  position: absolute;
  bottom: -39px;
  left: -22px;
  background: url("../../img/icon/popupLbl.png") 0px 0px no-repeat;
  background-position: 0px 0px;
}

.marsBlackPanel-text {
  width: 100%;
  height: 100%;
  min-height: 33px;
  text-align: center;
  padding: 10px 5px 0 5px;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  border: 1px solid #ffffff4f;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}

.marsBlackPanel-highlight {
  border: 2px solid yellow;
}

/**************** 涓€涓笎鍙樼殑鏂囨湰闈㈡澘,涓棿绔栫洿杩炵嚎 ****************/
.marsBlueGradientPnl {
  text-align: center;
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
  white-space: nowrap;
}

.marsBlueGradientPnl:after {
  content: "";
  position: absolute;
  bottom: -60px;
  left: calc(50% - 3px);
  display: block;
  width: 3px;
  height: 60px;
  border-right: 3px solid #2bcdbb;
}

.marsBlueGradientPnl-highlight {
  border: 2px solid yellow;
}
.marsBlueGradientPnl-highlight:after {
  border-right: 3px solid yellow;
}

/**************** 钃濊壊绉戞妧鎰熸枃鏈潰鏉� ****************/
.mars-spot {
  background-image: url("../../img/icon/lbl-circle.png");
  position: absolute;
  background-repeat: no-repeat;
  user-select: none;
  z-index: 100000;
  width: 70px;
  height: 44px;
  background-size: cover;
  bottom: -80px;
  left: -30px;
  cursor: default;
}

.mars-spot:hover {
  background-image: url("../../img/icon/lbl-circle2.png");
}

.mars-spot:hover .mars-spot-board{
  background-image: url("../../img/icon/lbl-extent2.png");
}

.mars-spot:hover .mars-spot-line{
  background: linear-gradient(180deg, #ff6b04, transparent);
}

.mars-spot:hover .mars-spot-line:before{
  background: linear-gradient(180deg, #ff6b04, transparent);
}

.mars-spot:hover .mars-spot-line:after{
  background: linear-gradient(180deg, #ff6b04, transparent);
}

  .mars-spot-board {
    background-image: url("../../img/icon/lbl-extent.png");
    top: -165px;
    transform: translateX(-30%);
    width: 180px;
    height: 52px;
    padding: 15px 0;
    background-position: 50%;
    background-size: contain;
    cursor: pointer;
    position: absolute;
    background-repeat: no-repeat;
  }

  .mars-spot-board:hover {
    background-image: url("../../img/icon/lbl-extent2.png");

  }

  .mars-spot-board:hover+.mars-spot-line{
    background: linear-gradient(180deg, #ff6b04, transparent);
  }

  .mars-spot-board:hover+.mars-spot-line:before{
    background: linear-gradient(180deg, #ff6b04, transparent);
  }

  .mars-spot-board:hover+.mars-spot-line:after{
    background: linear-gradient(180deg, #ff6b04, transparent);
  }

  .mars-spot-line {
    position: absolute;
    top: -108px;
    left: 35px;
    width: 2px;
    height: 140px;
    background: linear-gradient(180deg, #38c9ff, transparent);
  }

  .mars-spot-line:hover {
    background: linear-gradient(180deg, #ff6b04, transparent);
  }

  .mars-spot-line:before {
      height: 40%;
      left: 6px;
      animation: rise 3s linear 2s infinite;
      -webkit-animation: rise 3s linear 2s infinite;
      content: "";
      display: block;
      width: 1px;
      background: linear-gradient(180deg, #38c9ff, transparent);
      position: absolute;
      cursor: pointer;
    }

  .mars-spot-line:after {
      content: "";
      display: block;
      width: 1px;
      background: linear-gradient(180deg, #38c9ff, transparent);
      position: absolute;
      cursor: pointer;
      height: 60%;
      left: -5px;
      animation: rise 3s linear infinite;
      -webkit-animation: rise 3s linear infinite;
    }
    .mars-spot-board h5{
      width: 100%;
      text-align: center;
      line-height: 24px;
      color: #beedff;
      font-size: 16px;
      margin: 0;
    }

/**************** 涓€涓畝娲佹枃鏈潰鏉�,涓棿绔栫洿杩炵嚎 ****************/
.marsGreenGradientPnl {
  width: 100px;
  text-align: center;
  background-image: linear-gradient(to right, #565d39, #00ffc3);
  position: absolute;
  left: -56px;
  bottom: 28px;
  cursor: default;
  padding: 5px;
  border: 1px solid #9c9944e8;
}

.marsGreenGradientPnl:hover {
  border: 1px solid rgb(9, 255, 0);
}

.marsGreenGradientPnl::before {
  position: absolute;
  content: "";
  left: 50%;
  bottom: -30px;
  height: 30px;
  border-left: 2px dashed #c5e22770;
}

.marsGreenGradientPnl-highlight {
  border: 2px solid yellow;
}

.marsGreenGradientPnl-highlight::before {
  border-left: 2px dashed yellow !important;
}

/********** 闈㈡澘锛氬€炬枩鎸囧悜宸︿笅瑙掔殑div1.png鍥剧墖闈㈡澘鏍峰紡 ***********/

.marsImgPanel1 {
  position: relative;
  width: 200px;
  height: 134px;
  background: rgba(42, 42, 42, 0.8);
  border-radius: 4px;

  background: url("../../img/icon/div1.png");
  background-size: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;

  -webkit-animation: mymove 5s infinite;
  animation: mymove 5s infinite;
  animation-duration: 5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: mymove;
}

.marsImgPanel1 .title {
  position: relative;
  top: 20px;
  left: 70px;
  font-size: 15px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 0px 9px rgba(0, 0, 0, 0.75);
}

/********** 闈㈡澘锛氬€炬枩鎸囧悜宸︿笅瑙掔殑div2.png鍥剧墖闈㈡澘鏍峰紡 ***********/
.marsImgPanel2 {
  position: relative;
  width: 200px;
  height: 157px;
  background: rgba(42, 42, 42, 0.8);
  border-radius: 4px;
  background: url("../../img/icon/div2.png");
  background-size: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;

  -webkit-animation: mymove 5s infinite;
  animation: mymove 5s infinite;
  animation-duration: 5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: mymove;
}

.marsImgPanel2 .title {
  position: inherit;
  top: 22px;
  left: 70px;
  font-size: 14px;
  text-align: left;

  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 0px 9px rgba(0, 0, 0, 0.75);
}

.marsImgPanel2 .content {
  position: inherit;
  font-size: 14px;
  top: 30px;
  left: 50px;
  width: 140px;
  height: auto;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  overflow: hidden;
}

/********** 闈㈡澘锛氬€炬枩鎸囧悜宸︿笅瑙掔殑闈㈡澘鏍峰紡 ***********/

.marsTiltPanel-wrap {
  position: relative;
  padding: 30px;
  overflow: hidden;
}

.marsTiltPanel .area {
  position: relative;
  min-width: 180px;
}

.marsTiltPanel .b-t {
  position: absolute;
  top: 0;
  left: 44px;
  right: 0;
  height: 1px;
  z-index: 10;
}

.marsTiltPanel .b-r {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 44px;
  width: 1px;
  z-index: 10;
}

.marsTiltPanel .b-b {
  position: absolute;
  left: 0;
  right: 44px;
  bottom: 0;
  height: 1px;
  z-index: 10;
}

.marsTiltPanel .b-l {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 0;
  width: 1px;
  z-index: 10;
}

.marsTiltPanel .b-t-l {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 62px;
  transform: rotate(45deg) translate(52px, -22px);
  z-index: 10;
}

.marsTiltPanel .b-b-r {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1px;
  height: 62px;
  transform: rotate(45deg) translate(-52px, 22px);
  z-index: 10;
}

.marsTiltPanel .label-wrap {
  padding-left: 12px;
  color: #fff;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
}

.marsTiltPanel .title {
  margin-top: 20px;
  padding: 0 12px 0 30px;
  height: 36px;
  line-height: 36px;
  position: relative;
}

.marsTiltPanel .title::before {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  z-index: 10;
  height: 2px;
}

.marsTiltPanel .label-content {
  padding: 15px 0;
}

.marsTiltPanel .data-li {
  padding: 4px 45px 4px 0;
}

.marsTiltPanel .data-label,
.data-value {
  display: inline-block;
}

.marsTiltPanel .data-value {
  font-size: 14px;
}

.marsTiltPanel .label-num {
  margin-right: 3px;
  color: #f09e28;
  font-weight: 600;
}

.marsTiltPanel .label-tag {
  display: inline-block;
  position: relative;
  margin-right: 6px;
  padding: 0 6px;
  font-weight: 600;
  cursor: pointer;
  background-color: #909399;
  border-radius: 4px;
}

.marsTiltPanel .label-tag::after {
  content: attr(alt);
  display: inline-block;
  position: absolute;
  bottom: -22px;
  right: -35px;
  z-index: -1;
  padding: 2px 4px;
  color: #fff;
  font-size: 14px;
  background-color: #333;
  border-radius: 3px;
  opacity: 0;
  transition: all 0.3s ease-in;
}

.marsTiltPanel .label-tag:hover::after {
  opacity: 1;
  z-index: 11;
}

.marsTiltPanel .data-value-status-0 {
  background-color: #f0285c;
}

.marsTiltPanel .data-value-status-1 {
  background-color: #35b15b;
}

.marsTiltPanel .data-value-status-2 {
  background-color: #f09e28;
}

.marsTiltPanel .arrow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 45px;
  height: 2px;
  transform: rotate(-45deg) translate(5px, -15px);
}

/* 钃濊壊涓婚 */

.marsTiltPanel-theme-blue .b-t,
.marsTiltPanel-theme-blue .b-r,
.marsTiltPanel-theme-blue .b-b,
.marsTiltPanel-theme-blue .b-l,
.marsTiltPanel-theme-blue .b-t-l,
.marsTiltPanel-theme-blue .b-b-r {
  background-color: #29baf1;
  box-shadow: 0 0 10px 2px #29baf1;
}

.marsTiltPanel-theme-blue .area {
  background-image: linear-gradient(135deg, transparent 30px, #28bbf06c 30px, #28bbf06c 50%, transparent 50%),
    linear-gradient(-45deg, transparent 30px, #28bbf06c 30px, #28bbf06c 50.1%, transparent 50%);
}

.marsTiltPanel-theme-blue .title {
  background-image: linear-gradient(135deg, transparent 25px, #29baf1 25px);
}

.marsTiltPanel-theme-blue .arrow,
.marsTiltPanel-theme-blue .title::before {
  background-color: #28bbf0;
}

/* 缁胯壊涓婚 */

.marsTiltPanel-theme-green .b-t,
.marsTiltPanel-theme-green .b-r,
.marsTiltPanel-theme-green .b-b,
.marsTiltPanel-theme-green .b-l,
.marsTiltPanel-theme-green .b-t-l,
.marsTiltPanel-theme-green .b-b-r {
  background-color: #06e34a;
  box-shadow: 0 0 10px 2px #06e34a;
}

.marsTiltPanel-theme-green .area {
  background-image: linear-gradient(135deg, transparent 30px, #06e3486c 30px, #06e3486c 50%, transparent 50%),
    linear-gradient(-45deg, transparent 30px, #06e3486c 30px, #06e3486c 50.01%, transparent 50%);
}

.marsTiltPanel-theme-green .title {
  background-image: linear-gradient(135deg, transparent 25px, #06e34a 25px);
}

.marsTiltPanel-theme-green .arrow,
.marsTiltPanel-theme-green .title::before {
  background-color: #06e34a;
}

/* 绾㈣壊涓婚 */
.marsTiltPanel-theme-red .b-t,
.marsTiltPanel-theme-red .b-r,
.marsTiltPanel-theme-red .b-b,
.marsTiltPanel-theme-red .b-l,
.marsTiltPanel-theme-red .b-t-l,
.marsTiltPanel-theme-red .b-b-r {
  background-color: #e3064f;
  box-shadow: 0 0 10px 2px #e3064f;
}

.marsTiltPanel-theme-red .area {
  background-image: linear-gradient(135deg, transparent 30px, #e306506c 30px, #e306506c 50%, transparent 50%),
    linear-gradient(-45deg, transparent 30px, #e306506c 30px, #e306506c 50%, transparent 50%);
}

.marsTiltPanel-theme-red .title {
  background-image: linear-gradient(135deg, transparent 25px, #e3064f 25px);
}

.marsTiltPanel-theme-red .arrow,
.marsTiltPanel-theme-red .title::before {
  background-color: #e3064f;
}

/* 榛勮壊涓婚 */

.marsTiltPanel-theme-e9b709 .b-t,
.marsTiltPanel-theme-e9b709 .b-r,
.marsTiltPanel-theme-e9b709 .b-b,
.marsTiltPanel-theme-e9b709 .b-l,
.marsTiltPanel-theme-e9b709 .b-t-l,
.marsTiltPanel-theme-e9b709 .b-b-r {
  background-color: #e9b709;
  box-shadow: 0 0 10px 2px #e9b709;
}

.marsTiltPanel-theme-e9b709 .area {
  background-image: linear-gradient(135deg, transparent 30px, #e9b9096c 30px, #e9b9096c 50%, transparent 50%),
    linear-gradient(-45deg, transparent 30px, #e9b9096c 30px, #e9b9096c 50%, transparent 50%);
}

.marsTiltPanel-theme-e9b709 .title {
  background-image: linear-gradient(135deg, transparent 25px, #e9b709 25px);
}

.marsTiltPanel-theme-e9b709 .arrow,
.marsTiltPanel-theme-e9b709 .title::before {
  background-color: #e9b709;
}

/**************** 閮ㄥ垎鍏叡鏍峰紡锛屽閫変腑鏍峰紡銆佸姩鐢荤瓑 ****************/

.animation-spaceInDown {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: spaceInDown;
}
@keyframes spaceInDown {
  0% {
    opacity: 0;
    transform-origin: 0% 100%;
    transform: scale(0.2) translate(0, 200%);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 100%;
    transform: scale(1) translate(0, 0);
  }
}

@keyframes rise {
  0% {
    opacity: 0.1;
    transform: translate(0, 100%);
  }
  5% {
    opacity: 0.3;
    transform: translate(0, 95%);
  }
  10% {
    opacity: 0.6;
    transform: translate(0, 90%);
  }
  15% {
    opacity: 1;
    transform: translate(0, 85%);
  }
  75% {
    opacity: 1;
    transform: translate(0, 25%);
  }
  80% {
    opacity: 0.7;
    transform: translate(0, 20%);
  }
  90% {
    opacity: 0.3;
    transform: translate(0, 10%);
  }
  95% {
    opacity: 0.2;
    transform: translate(0, 5%);
  }
  100% {
    opacity: 0.1;
    transform: translate(0, 0);
  }
}
.mars3d-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}
.mars3d-container .cesium-widget-credits {
  display: none;
}
.mars3d-container .mars3d-vrButton {
  right: auto !important;
}
/**闅愯棌鐨刣iv瀵硅薄锛屽 DivBillboardEntity銆丠eatLayer 绛�*/
.mars3d-hideDiv {
  z-index: -99;
  position: absolute !important;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
}
/**鍙抽敭鑿滃崟*/
.mars3d-contextmenu {
  position: absolute;
  padding: 0;
  z-index: 20170825;
  display: none;
}
.mars3d-contextmenu-ul {
  background: rgba(43, 44, 47, 0.8);
  border: 1px solid #2b2c2f;
  min-width: 110px;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.mars3d-contextmenu-ul .contextmenu-icon {
  position: absolute;
  left: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  overflow: hidden;
}
.mars3d-contextmenu-ul .contextmenu-arrow {
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  text-align: center;
}
.mars3d-contextmenu-ul li + li {
  margin: 0;
  padding: 0;
  position: relative;
}
.mars3d-contextmenu-ul li + li:before {
  content: "";
  display: block;
  height: 1px;
  width: 100%;
  background: -webkit-linear-gradient(to left, transparent, rgba(255, 255, 255, 0.2), transparent);
  background: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.2), transparent);
  position: absolute;
  top: 0;
  left: 0;
}
.mars3d-contextmenu-ul .line {
  display: block;
  content: "";
  height: 1px;
  width: 96%;
  position: absolute;
  left: 2%;
  background: #dddddd;
  width: 100%;
  height: 20px;
  border: 1px;
}
.mars3d-contextmenu-ul > li > a {
  padding: 6px 10px 6px 30px;
  -webkit-transition: background-color 0.25s;
  -o-transition: background-color 0.25s;
  transition: background-color 0.25s;
  display: block;
  clear: both;
  line-height: 22px;
  color: #76838f;
  white-space: nowrap;
  color: #edffff;
  text-decoration: none;
}
.mars3d-contextmenu-ul > li > a:hover,
.mars3d-contextmenu-ul > li > a:focus,
.mars3d-contextmenu-ul > li > .active {
  color: #fff;
  background-color: #444d59;
  text-decoration: none;
}
.mars3d-contextmenu-ul > .active > a,
.mars3d-contextmenu-ul > .active > a:hover,
.mars3d-contextmenu-ul > .active > a:focus {
  color: #fff;
  background-color: #444d59;
  text-decoration: none;
}
.mars3d-sub-menu {
  position: absolute;
  background: rgba(43, 44, 47, 0.8);
  min-width: 160px;
  display: none;
}
.mars3d-sub-menu li {
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  color: #ffffff;
  margin: 0;
  padding: 0;
}
.mars3d-sub-menu li:hover {
  background-color: #444d59;
}
.mars3d-smallTooltip {
  display: block;
  position: absolute;
  max-width: 200px;
  min-width: 100px;
  padding: 2px 5px;
  font-size: 11px;
  z-index: 1000;
  opacity: 0.8;
  -khtml-opacity: 0.8;
  -moz-opacity: 0.8;
  filter: alpha(opacity=80);
  pointer-events: none;
}
.mars3d-smallTooltip-inner {
  padding: 3px 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: left;
  max-width: 200px;
  text-decoration: none;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.mars3d-smallTooltip-inner p {
  margin: 0;
}
.mars3d-smallTooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  top: 50%;
}
.mars3d-smallTooltip-leftArrow {
  right: 0;
  margin-top: -5px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #000000;
}
.mars3d-smallTooltip-rightArrow {
  left: 0;
  margin-top: -5px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #000000;
}
.mars3d-clockAnimate {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 27px;
  z-index: 999;
  background: linear-gradient(to bottom, rgba(116, 117, 119, 0.8) 0%, rgba(58, 68, 82, 0.8) 11%, rgba(46, 50, 56, 0.8) 46%, rgba(53, 53, 53, 0.8) 81%, rgba(53, 53, 53, 0.8) 100%);
}
.mars3d-clockAnimate .time {
  margin: 0 4px;
  font-size: 13px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.mars3d-clockAnimate .mars3d-clockAnimate-btn {
  display: inline-block;
  vertical-align: middle;
  padding: 1px 8px;
  border: solid 1px #888;
  color: #ffffff;
  background-color: rgba(63, 72, 84, 0.7);
  border: none;
  cursor: pointer;
  width: 24px;
}
.mars3d-clockAnimate .mars3d-clockAnimate-btn svg {
  margin-top: 1px;
}
.mars3d-clockAnimate .mars3d-clockAnimate-speed {
  width: 80px;
  height: 24px;
  border: solid 1px rgba(136, 136, 136, 0.6);
  padding: 0 3px;
  margin: 0;
  color: #ffffff;
  background-color: rgba(63, 72, 84, 0.7);
}
.mars3d-clockAnimate .mars3d-clockAnimate-speed ::-webkit-outer-spin-button,
.mars3d-clockAnimate .mars3d-clockAnimate-speed input::-webkit-inner-spin-button {
  appearance: none !important;
  margin: 0;
}
.mars3d-compass {
  position: absolute;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  width: 55px;
  height: 55px;
}
.mars3d-compass .mars3d-compass-outer {
  position: absolute;
  top: 0;
  left: 0;
  height: 55px;
  width: 55px;
  background-repeat: no-repeat;
  background-size: contain;
  fill: #3f4854;
  border-radius: 50%;
}
.mars3d-compass .mars3d-compass-outer svg {
  height: 55px;
  width: 55px;
}
.mars3d-compass .mars3d-compass-inner {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  padding: 4px;
  box-sizing: border-box;
  background: #ffffff;
  fill: #68adfe;
}
.mars3d-compass .mars3d-compass-rotation-arc {
  position: absolute;
  top: 2px;
  left: 2px;
  height: 51px;
  width: 51px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: contain;
}
.mars3d-distance-legend {
  position: absolute;
  width: 125px;
  height: 25px;
  pointer-events: none;
  user-select: none;
}
.mars3d-distance-legend .legend-label {
  font-size: 13px;
  color: #ffffff;
  text-align: center;
  width: 100%;
}
.mars3d-distance-legend .legend-scale-bar {
  position: absolute;
  height: 10px;
  top: 10px;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
}
/**宸︿笅瑙掞紝榧犳爣缁忕含搴︽彁绀�*/
.mars3d-locationbar {
  position: absolute;
  z-index: 991;
  padding: 3px 10px;
  font-size: 13px;
  color: #e9e9e9;
  background-color: rgba(0, 0, 0, 0.4);
  min-height: 26px;
  pointer-events: none;
}
.mars3d-locationbar-content {
  float: right;
}
.mars3d-locationbar-content > div {
  float: left;
  margin-right: 20px;
}
.cesium-performanceDisplay-ms,
.cesium-performanceDisplay-fps {
  min-width: 65px;
}
/* 鍏煎灞忓箷澶у皬 缇庤鏄剧ず涓嶅悓淇℃伅 */
@media screen and (max-width: 1200px) {
  .mars3d-locationbar-content > div {
    margin-right: 15px;
  }
}
@media screen and (max-width: 1000px) {
  .cesium-performanceDisplay-ms,
  .cesium-performanceDisplay-fps,
  .mars3d-locationbar-content > .hide1000 {
    display: none;
  }
  .mars3d-locationbar-content > div {
    margin-right: 10px;
  }
}
@media screen and (max-width: 700px) {
  .mars3d-locationbar-content > .hide700 {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .mars3d-locationbar {
    display: none;
  }
}
.mars3d-slider {
  position: absolute;
  left: 50%;
  top: 0px;
  background-color: #d3d3d3;
  width: 3px;
  height: 100%;
  z-index: 9999;
}
.mars3d-slider .slider-splitter {
  position: absolute;
  left: -15px;
  top: calc(50% - 15px);
  width: 30px;
  height: 30px;
  background: #f0eeee;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  padding: 2px;
  border: 1px solid lightgrey;
}
.mars3d-slider .slider-splitter:hover {
  cursor: ew-resize;
}
.mars3d-mapCompare {
  position: absolute;
  left: auto;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 0;
}
/**婊氳疆鏍峰紡*/
.mars3d-mousedownview {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 40px;
  height: 40px;
  margin-top: -23px;
  /*鍥剧墖楂樺害鐨勪竴鍗�*/
  margin-left: -23px;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  -webkit-transition: visibility 0s 0.2s, opacity 0.2s ease-in;
  -moz-transition: visibility 0s 0.2s, opacity 0.2s ease-in;
  transition: visibility 0s 0.2s, opacity 0.2s ease-in;
}
.mars3d-mousedownview-img {
  width: 36px;
  height: 36px;
  background-image: url(./img/cursor.png);
  background-size: 100% 100%;
}
.mars3d-mousedownview-show {
  visibility: visible;
  opacity: 1;
  -webkit-transition: opacity 0.2s ease-out;
  -moz-transition: opacity 0.2s ease-out;
  transition: opacity 0.2s ease-out;
}
.mars3d-overviewMap {
  position: absolute;
  user-select: none;
  width: 200px;
  height: 150px;
  overflow: hidden;
  border: 1px solid orange;
  box-shadow: 2px 2px 3px #2b2b2b;
}
.mar3d-toolButton {
  cursor: pointer;
}
.mar3d-toolButton img,
.mar3d-toolButton svg,
.mar3d-toolButton div {
  height: 100%;
  text-align: center;
}
/**鍐呯疆鐨凞ivGraphic閫氱敤鏍峰紡銆愭枃鏈姩鎬佽竟妗嗐€�*/
.mars3d-divBoderLabel {
  position: absolute;
  left: 0px;
  bottom: 0px;
  cursor: pointer;
  --animation-name: mars3d-divBoderLabel-animation;
  --text-left-position: -75px;
}
@keyframes mars3d-divBoderLabel-animation {
  0%,
  100% {
    clip: rect(0px, var(--clip-width-1), 2px, 0px);
  }
  25% {
    clip: rect(0px, 2px, var(--clip-height-1), 0px);
  }
  50% {
    clip: rect(var(--clip-height-2), var(--clip-width-1), var(--clip-width-1), 0px);
  }
  75% {
    clip: rect(0px, var(--clip-width-1), var(--clip-height-1), var(--clip-width-2));
  }
}
.mars3d-divBoderLabel-boder {
  width: var(--boder-width);
  height: var(--boder-height);
  margin: auto;
  color: var(--border-color);
  box-shadow: inset 0 0 0 1px var(--box-shadow-color);
}
.mars3d-divBoderLabel-text {
  color: var(--text-color);
  font-size: var(--text-font-size);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  user-select: none;
  cursor: pointer;
}
.mars3d-divBoderLabel-boder,
.mars3d-divBoderLabel-boder::before,
.mars3d-divBoderLabel-boder::after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.mars3d-divBoderLabel-boder::before,
.mars3d-divBoderLabel-boder::after {
  content: "";
  margin: -5%;
  box-shadow: inset 0 0 0 2px;
  animation: var(--animation-name) 8s linear infinite;
}
.mars3d-divBoderLabel-boder::before {
  animation-delay: -4s;
}
.mars3d-divGraphic {
  position: absolute;
  left: 0;
  top: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.mars3d-divGraphic-edit {
  background-color: rgba(254, 87, 161, 0.1);
  border: 2px dashed rgba(172, 85, 59, 0.768);
  -webkit-border-radius: 2px;
  border-radius: 2px;
  margin: -2px;
  box-sizing: content-box;
}
.mars3d-animation-point,
.mars3d-animation-point:after,
.mars3d-animation-point:before,
.mars3d-animation-point p,
.mars3d-animation-point p:after,
.mars3d-animation-point p:before {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}
.mars3d-animation-point {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  cursor: pointer;
  color: #0ff;
  background: currentColor;
  z-index: 3;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 2em currentColor, 0 0 0.5em currentColor;
  position: absolute;
}
.mars3d-animation-point .mars3d-animation-point-lbl {
  position: absolute;
  transform: translate(-50%, -120%);
  left: 50%;
  font-size: 16px;
  width: fit-content;
  white-space: nowrap;
}
.mars3d-animation-point p {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-animation: mars3d-animation-point-mapAni 2s ease infinite;
  -moz-animation: mars3d-animation-point-mapAni 2s ease infinite;
  -o-animation: mars3d-animation-point-mapAni 2s ease infinite;
  -ms-animation: mars3d-animation-point-mapAni 2s ease infinite;
  animation: mars3d-animation-point-mapAni 2s ease infinite;
}
.mars3d-animation-point .mapError {
  color: red;
}
.mars3d-animation-point .mapWarn {
  color: #b5a603;
}
.mars3d-animation-point .mapSuccess {
  color: #239233;
}
.mars3d-animation-point .mapOrange {
  color: #8c4d34;
}
.mars3d-animation-point:after,
.mars3d-animation-point:before,
.mars3d-animation-point p:after,
.mars3d-animation-point p:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.mars3d-animation-point:after,
.mars3d-animation-point:before {
  border: 1px solid;
  -webkit-animation: mars3d-animation-point-mapAni 1s ease infinite;
  -moz-animation: mars3d-animation-point-mapAni 1s ease infinite;
  -o-animation: mars3d-animation-point-mapAni 1s ease infinite;
  -ms-animation: mars3d-animation-point-mapAni 1s ease infinite;
  animation: mars3d-animation-point-mapAni 1s ease infinite;
}
.mars3d-animation-point p:before {
  border: 1px solid;
}
@-webkit-keyframes mars3d-animation-point-mapAni {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
    filter: alpha(opacity=1);
  }
  25% {
    width: 120%;
    height: 120%;
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  50% {
    width: 200%;
    height: 200%;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  75% {
    width: 300%;
    height: 300%;
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  to {
    width: 400%;
    height: 400%;
    opacity: 0;
    filter: alpha(opacity=0);
  }
}
@-moz-keyframes mars3d-animation-point-mapAni {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
    filter: alpha(opacity=1);
  }
  25% {
    width: 120%;
    height: 120%;
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  50% {
    width: 200%;
    height: 200%;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  75% {
    width: 300%;
    height: 300%;
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  to {
    width: 400%;
    height: 400%;
    opacity: 0;
    filter: alpha(opacity=0);
  }
}
@-o-keyframes mars3d-animation-point-mapAni {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
    filter: alpha(opacity=1);
  }
  25% {
    width: 120%;
    height: 120%;
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  50% {
    width: 200%;
    height: 200%;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  75% {
    width: 300%;
    height: 300%;
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  to {
    width: 400%;
    height: 400%;
    opacity: 0;
    filter: alpha(opacity=0);
  }
}
@-ms-keyframes mars3d-animation-point-mapAni {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
    filter: alpha(opacity=1);
  }
  25% {
    width: 120%;
    height: 120%;
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  50% {
    width: 200%;
    height: 200%;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  75% {
    width: 300%;
    height: 300%;
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  to {
    width: 400%;
    height: 400%;
    opacity: 0;
    filter: alpha(opacity=0);
  }
}
@keyframes mars3d-animation-point-mapAni {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
    filter: alpha(opacity=1);
  }
  25% {
    width: 120%;
    height: 120%;
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  50% {
    width: 200%;
    height: 200%;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  75% {
    width: 300%;
    height: 300%;
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  to {
    width: 400%;
    height: 400%;
    opacity: 0;
    filter: alpha(opacity=0);
  }
}
.mars3d-divUpLabel {
  text-align: center;
  background: transparent;
  color: white;
  display: block;
  box-sizing: border-box;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: mars3d-divUpLabel-tinUpIn;
}
.mars3d-divUpLabel-text {
  writing-mode: vertical-lr;
  font-size: 16px;
  letter-spacing: 4px;
}
.mars3d-divUpLabel-line {
  display: block;
  height: 100px;
  width: 1.5px;
  margin-left: calc(50% - 1px);
  margin-top: 3px;
  background-color: white;
}
@keyframes mars3d-divUpLabel-tinUpIn {
  0% {
    opacity: 0;
    transform: scale(1, 1) translateY(-900%);
  }
  50%,
  70%,
  90% {
    opacity: 1;
    transform: scale(1.1, 1.1) translateY(0);
  }
  100%,
  60%,
  80% {
    opacity: 1;
    transform: scale(1, 1) translateY(0);
  }
}
/*****popup寮瑰嚭妗嗘牱寮�******/
/*鐧借壊瀛椾綋,濡傛灉榛戣壊鏀逛负锛�#2b2929;*/
/*榛戣壊鑳屾櫙,濡傛灉鐧借壊鏀逛负锛歳gba(255,255,255,0.85);*/
.mars3d-popup {
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
}
.mars3d-popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 4px 0 0;
  text-align: center;
  width: 20px;
  height: 20px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  text-decoration: none;
  font-weight: bold;
  background: transparent;
  z-index: 20170825;
  cursor: pointer;
}
.mars3d-popup-content-wrapper {
  text-align: center;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 1px;
  text-align: left;
  border-radius: 3px;
}
.mars3d-popup-content {
  margin: 10px;
  line-height: 1.4;
  font-size: 13px;
  max-width: 700px;
  min-width: 50px;
  max-height: 550px;
  overflow-y: auto;
}
.mars3d-popup-tip-container {
  margin: 0 auto;
  width: 40px;
  height: 20px;
  position: relative;
  overflow: hidden;
}
.mars3d-popup-tip {
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  width: 17px;
  height: 17px;
  padding: 1px;
  margin: -10px auto 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
.mars3d-popup-scrolled {
  overflow: auto;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.mars3d-popup-color {
  color: #ffffff;
}
.mars3d-popup-background {
  background: rgba(63, 72, 84, 0.9);
}
.mars3d-popup-animation {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-name: mars3d-popup-swashIn;
}
@keyframes mars3d-popup-swashIn {
  0% {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(0, 0);
  }
  90% {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(0.9, 0.9);
  }
  100% {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(1, 1);
  }
}
.mars3d-popup-btn {
  padding: 3px 10px;
  border: 1px solid #209ffd;
  background: #209ffd1c;
}
/* all 涓殑html鏍峰紡 */
.mars3d-template-titile {
  border-radius: 3px 0 0 3px;
  padding: 0 80px 0 10px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #ffffff;
  border-bottom: 1px solid #616161;
  overflow: hidden;
}
.mars3d-template-content {
  min-width: 150px;
  margin-top: 12px;
  font-size: 14px;
  max-height: 490px;
  overflow-y: auto;
}
.mars3d-template-content > div {
  margin-top: 5px;
}
.mars3d-template-content label {
  margin: 0 10px;
  min-width: 55px;
  float: left;
}
.mars3d-template-content input {
  color: #ffffff;
  background-color: transparent;
  padding: 4px 5px;
  border-width: 1px;
  border-style: solid;
}
.mars3d-template-content textarea {
  color: #ffffff;
  background-color: transparent;
  padding: 4px 5px;
  border-width: 1px;
  border-style: solid;
  height: 60px;
  resize: none;
}
/*****tooltip寮瑰嚭妗嗘牱寮�******/
/*鐧借壊瀛椾綋,濡傛灉榛戣壊鏀逛负锛�#2b2929;*/
/*榛戣壊鑳屾櫙,濡傛灉鐧借壊鏀逛负锛歳gba(255,255,255,0.85);*/
.mars3d-tooltip {
  padding: 6px;
  background: rgba(63, 72, 84, 0.9);
  border: 1px solid rgba(63, 72, 84, 0.9);
  border-radius: 3px;
  color: #ffffff;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  max-width: 700px;
  min-width: 50px;
  max-height: 550px;
}
.mars3d-tooltip-top:before,
.mars3d-tooltip-bottom:before,
.mars3d-tooltip-left:before,
.mars3d-tooltip-right:before {
  position: absolute;
  pointer-events: none;
  border: 6px solid transparent;
  background: transparent;
  content: "";
}
/* Directions */
.mars3d-tooltip-bottom {
  margin-top: 6px;
}
.mars3d-tooltip-top {
  margin-top: -6px;
}
.mars3d-tooltip-bottom:before,
.mars3d-tooltip-top:before {
  left: 50%;
  margin-left: -6px;
}
.mars3d-tooltip-top:before {
  bottom: 0;
  margin-bottom: -12px;
  border-top-color: rgba(63, 72, 84, 0.9);
}
.mars3d-tooltip-bottom:before {
  top: 0;
  margin-top: -6px;
  margin-left: -6px;
  border-bottom-color: rgba(63, 72, 84, 0.9);
}
.mars3d-tooltip-left {
  margin-left: -6px;
}
.mars3d-tooltip-right {
  margin-left: 6px;
}
.mars3d-tooltip-left:before,
.mars3d-tooltip-right:before {
  top: 50%;
  margin-top: -6px;
}
.mars3d-tooltip-left:before {
  right: 0;
  margin-right: -12px;
  border-left-color: rgba(63, 72, 84, 0.9);
}
.mars3d-tooltip-right:before {
  left: 0;
  margin-left: -6px;
  border-right-color: rgba(63, 72, 84, 0.9);
}
.mars3d-widgetbar {
  margin: 0 auto;
  position: absolute;
  bottom: 30px;
  left: 20%;
  width: 60%;
  height: auto;
  z-index: 1987;
}
.mars3d-widgetbar .fa {
  margin-right: 5px;
}
.ring1 {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  overflow: hidden;
}

#ring {
  width: 100%;
  height: 100%;
}
.bar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.bar_chart {
  width: 100%;
  height: 100%;
}
#bar {
  width: 100%;
  height: 100%;
}
.achart_container {
  position: absolute;
  padding: 10px;
  top: 0;
  right: 0;
  width: 29rem;
  height: 100%;
  background: linear-gradient(to right, rgba(84, 97, 117, 0.5), rgba(42, 52, 69, 1));
}

._item_top {
  position: relative;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.22rem;
}

.item_bottom {
  margin-bottom: -2rem;
}

._item_title {
  position: relative;
  height: 1.56rem;
  padding-left: 1.25rem;
  line-height: 1.56rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 0.7rem;
}

._item_title::before {
  content: "";
  width: 0.5rem;
  height: 1rem;
  background: rgba(229, 237, 255, 1);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

._item_title::after {
  content: "";
  width: 26.5rem;
  height: 0.63rem;
  background: url("/img/icon/分割.png");
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  top: calc(100% + 0.13rem);
}

._item_row {
  
  align-items: center;
  flex-wrap: wrap;
  text-align: left;
}

._item_row_title {
  font-size: 0.88rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.25rem;
  letter-spacing: 2px;
  text-shadow: 0px 0px 0px #02e1ff;
}

.row1 {
  width: 10rem;
  align-items: center;
  display: flex;
  margin-bottom: 1.19rem;
}

.icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

.row1_right {
  margin-left: 0.75rem;
  text-align: left;
}

.ml {
  margin-left: 50px;
}

.right_title {
  font-size: 2rem;
  font-weight: bold;
  color: #febc04;
  line-height: 2rem;
  background: linear-gradient(180deg, #e5be38 0%, #ff882e 100%);
  -webkit-background-clip: text;
  white-space: nowrap;
  -webkit-text-fill-color: transparent;
  font-family: "UnidreamLED", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.right_sub_title {
  font-size: 1.42rem;
  color: #d8d8d8;
  line-height: 1;
  white-space: nowrap;
  background: linear-gradient(180deg, #e5be38 0%, #ff882e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

._item_full_box {
  width: 100%;
  height: 14rem;
  margin-top: 35px;
}

._item_full_box_width {
  width: 100%;
}

.row3 {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
}
.row2 {
  position: relative;
  left: 8%;
}

._item_row_box3 {
  width: 20rem;
  height: 20rem;
}

._item_row_box2 {
  margin-right: 40px;
  margin-top: 20px;
  transform: translateX(-1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
}

.box2_item,
.box2_item1,
.box2_item2,
.box2_item3,
.box2_item4,
.box2_item5 {
  position: relative;
  width: 100%;
  height: 1.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.box2_item::before,
.box2_item1::before,
.box2_item2::before,
.box2_item3::before,
.box2_item4::before,
.box2_item5::before {
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border: 0.06rem solid #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
}

.box2_item::before {
  background: #5470c6
}

.box2_item1::before {
  background: #91cc75
}

.box2_item2::before {
  background: #fac858
}

.box2_item3::before {
  background: #ee6666
}

.box2_item4::before {
  background: #73c0de
}

.box2_item5::before {
  background: #3ba272
}
#box2_item6::before{
  background: #fc8452

}
#box2_item7:before{
  background: #9a60b4

}
#box2_item8::before{
  background: #ea7ccc

}
#box2_item9::before{
  background: white

}

.box2_item::after,
.box2_item1::after,
.box2_item2::after,
.box2_item3::after,
.box2_item4::after,
.box2_item5::after {
  content: attr(count);
  font-size: 1rem;
  font-weight: 600;
  color: #87c1fa;
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
}

.box2_item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0);
}

.ring1 {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  overflow: hidden;
}

#ring {
  width: 100%;
  height: 100%;
}
.bar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.bar_chart {
  width: 100%;
  height: 100%;
}
#bar {
  width: 100%;
  height: 100%;
}
.container-last-chart {
  margin-top: 8px;
}
.box2_item::before, .box2_item1::before, .box2_item2::before, .box2_item3::before, .box2_item4::before, .box2_item5::before {
    height: 20px;
    width: 20px;

}
.box2_item::after, .box2_item1::after, .box2_item2::after, .box2_item3::after, .box2_item4::after, .box2_item5::after{
    font-size:18px

}
</style>
