<template>
  <mars-dialog :visible="true" :draggable="true" right="10" top="90" width="220" title="产品定制" >
    <mars-button @click="drawLabel1">Image Title</mars-button>
    <mars-button @click="drawLabel2">Image Time</mars-button>
    <mars-button @click="drawLogo">Unit Logo</mars-button>
    <mars-button @click="drawLegend">Image Legend</mars-button>
    <mars-button @click="showMapImg">Preview Image</mars-button>
  </mars-dialog>

  <mars-dialog left="300" right="50" top="100" bottom="60" title="产品图" :draggable="true" v-model:visible="showImg">
    <img :src="imges" style="width: 70%; height: 100%; clip: rect(400 20 800 800);" />
    <div class="ui-container" >
      <a-form :model="formState" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-collapse v-model:activeKey="activeKey" expandIconPosition="right">
          <a-collapse-panel key="1" header="Alarm Publish Info">
            <a-form-item label="预警标题" name="url">
              <mars-input v-model:value="formState.url" :allowClear="true" @change="onTextChange" />
            </a-form-item>

            <a-form-item label="发布时间">
              <mars-date-picker v-model:value="formState.date" format="YYYY-MM-DD" @change="onDateChange" />
            </a-form-item>

            <a-form-item label="预警类型">
              <mars-select v-model:value="formState.model" ></mars-select>
            </a-form-item>

            <a-form-item label="预警级别">
              <mars-select v-model:value="formState.model" ></mars-select>
            </a-form-item>

            <a-form-item label="影响地区" class="f-push-20-t">
              <a-checkbox-group v-model:value="formState.checkboxVal" @change="onCheckboxChange">
                <a-checkbox value="A">伊斯兰堡</a-checkbox>
                <a-checkbox value="B">旁遮普</a-checkbox>
                <a-checkbox value="C">开伯尔–普什图赫瓦</a-checkbox>
                <a-checkbox value="D">俾路支</a-checkbox>
                <a-checkbox value="E">信德</a-checkbox>
              </a-checkbox-group>
            </a-form-item>

            <a-form-item label="概述">
              <a-textarea v-model:value="formState.radioVal"></a-textarea>
              <!-- 已选择：{{ formState.radioVal }} -->
            </a-form-item>

            <a-form-item label="发布渠道" class="f-push-20-t">
              <a-checkbox-group v-model:value="formState.checkboxVal" @change="onCheckboxChange">
                <a-checkbox value="A">TV</a-checkbox>
                <a-checkbox value="B">Email</a-checkbox>
                <a-checkbox value="C">Mobile</a-checkbox>
                <a-checkbox value="D">Twitter</a-checkbox>
                <a-checkbox value="E">Broadcast</a-checkbox>
              </a-checkbox-group>
            </a-form-item>

            <a-form-item label="发布决策">
              <a-space>
                <mars-switch v-model:checked="formState.isScale" @change="onSwitchChange" />
                <span>是否允许</span>
              </a-space>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Industry Service Users">
            <mars-tree checkable :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys" @check="onCheckTreeItem">
              <template #title="{ title }">
                <span>{{ title }}</span>
              </template>
            </mars-tree>
          </a-collapse-panel>
        </a-collapse>
            <div class="f-tac">
              <a-space>
                <mars-button size="middle" @click="onClickMessage">
                  <template #icon><mars-icon icon="alarm" class="icon-vertical-a" /></template>
                  Alarm Publish
                </mars-button>
              </a-space>
            </div>

      </a-form>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, markRaw, reactive, ref } from "vue"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import * as mapWork from "./map.ts"
import { useWidget } from "@mars/widgets/common/store/widget"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"
import { $message } from "@mars/components/mars-ui/index"
import type { Dayjs } from "dayjs"
import axios from "axios"
const { activate, disable, isActivate, currentWidget, updateWidget } = useWidget()
useLifecycle(mapWork)

const activeKey = ref(["1", "2", "3"])
const showImg = ref<boolean>(false)
const showScreenShot = ref<boolean>(false)

interface FormState {
  url: string
  extent: string
  countCar: number
  model: string
  date: Dayjs | null
  brightness: number
  contrast: number
  checkboxVal: string[]
  radioVal: string
  isScale: boolean
  color: string
}
const formState = reactive<FormState>({
  url: "",
  extent: "",
  countCar: 1,
  model: "",
  date: null,
  brightness: 0,
  contrast: 128,
  checkboxVal: ["A", "B", "C"],
  radioVal: "3",
  isScale: true,
  color: "#ffff00"
})
const imges = ref()
onMounted(() => {
  const mars3d = window.mapWork.mars3d
  // 矢量数据创建完成
  mapWork.graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    showEditor(e)
  })
  // 修改了矢量数据
  mapWork.graphicLayer.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e) {
      showEditor(e)
    }
  )
  // 停止编辑
  mapWork.graphicLayer.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
    setTimeout(() => {
      if (!mapWork.graphicLayer.isEditing) {
        disable("graphic-editor")
      }
    }, 100)
  })
})

const showEditor = (e: any) => {
  const graphic = e.graphic
  if (!graphic._conventStyleJson) {
    graphic.options.style = graphic.toJSON().style // 因为示例中的样式可能有复杂对象，需要转为单个json简单对象
    graphic._conventStyleJson = true // 只处理一次
  }

  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: {
        graphic: markRaw(graphic)
      }
    })
  } else {
    updateWidget("graphic-editor", {
      data: {
        graphic: markRaw(graphic)
      }
    })
  }
}
const showMapImg = () => {
  mapWork.showMapImg().then((image) => {
    imges.value = image
    showImg.value = true
  })
}

function drawLogo() {
  mapWork.drawLogo()
}
function drawLegend() {
  mapWork.drawLegend()
}
function drawLabel1() {
  mapWork.drawLabel1()
}
function drawLabel2() {
  mapWork.drawLabel2()
}
const downLoad = () => {
  mapWork.downLoad()
}
const treeData = ref<any[]>([])
const layersObj: any = {}
const expandedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])
onMounted(() => {
  // 取图层列表数据
  const url = "/data/userObj.json"
  axios.get(url).then(function (res: any) {
    const data = res.data
    const layers = data.layers
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i]
      const node: any = {
        title: layer.name,
        key: layer.id,
        id: layer.id,
        pId: layer.pid
      }
      node.children = findChild(node, layers)
      treeData.value.push(node)
      expandedKeys.value.push(node.key)
    }
  })
})

function findChild(parent: any, list: any[]) {
  return list
    .filter((item: any) => item.pid === parent.id)
    .map((item: any) => {
      const node: any = {
        title: item.name,
        key: item.id,
        id: item.id,
        pId: item.pid
      }
      const nodeLayer = mapWork.createLayer(item) // 创建图层
      layersObj[item.id] = nodeLayer
      node.children = findChild(node, list)
      expandedKeys.value.push(node.key)
      if (item.isAdded && item.show) {
        checkedKeys.value.push(node.key)
      }
      return node
    })
}

// 勾选了树节点
const onCheckTreeItem = (keys: string[]) => {
  Object.keys(layersObj).forEach((k) => {
    const newKeys = keys.map((item) => {
      return String(item)
    })
    const show = newKeys.indexOf(k) !== -1
    const layer = layersObj[k]
    layer.show = show
    if (show) {
      if (!layer.isAdded) {
        mapWork.map.addLayer(layer)
      }
      layer.flyTo()
    } else {
      if (layer.isAdded) {
        mapWork.map.removeLayer(layer)
      }
    }
  })
}
</script>
<style scoped lang="less">
.mars-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
.infoView {
  overflow-y: auto;
}

.color-state {
  padding-bottom: 1.3px;
}
.ui-container {
  height: 100%;
  width: 30%;
  float: right;
  overflow-y: scroll;
}
</style>
