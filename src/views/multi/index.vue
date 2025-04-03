<!-- eslint-disable @typescript-eslint/no-empty-function -->
<!-- eslint-disable @typescript-eslint/no-empty-function -->
<!-- eslint-disable prettier/prettier -->
<template>


  <div class="oss-upload">
    <div class="oss-upload">
      <!-- 关闭自动上传；accept可以控制文件类型 -->
      <el-upload ref="upload" action :show-file-list="false" :multiple="multiple" :on-change="handleChange"
        :auto-upload="false" :accept="accept">
        <el-button type="primary" :icon="Upload" round>上 传</el-button>
      </el-upload>
    </div>
    <el-dialog v-model="dialogVisible" width="650px" destroy-on-close :close-on-click-modal="false"
      :before-close="handleClose">
      <template #header>
        <span>上传</span>
        <span class="num">
          {{ fileList.length - unList.length }}/{{ fileList.length }}
        </span>
      </template>
      <div class="dialog-head">
        <div class="head-btn">
          <el-button size="small" type="primary" :disabled="uploadDisabled" :icon="VideoPlay" @click="startUpload">
            开始上传
          </el-button>
          <el-button class="item-btn" size="small" :disabled="resumeDisabled" :icon="RefreshRight" type="success"
            @click="resumeUpload">
            继续
          </el-button>
          <el-button class="item-btn" size="small" :icon="VideoPause" type="danger" :disabled="pauseDisabled"
            @click="stopUplosd">
            暂停
          </el-button>
        </div>
      </div>
      <div class="file-list">
        <div class="file-item" v-for="(item, index) in fileList" :key="index">
          <div class="file-name">
            <div class="name">
              <span class="file-name-item">
                {{ index + 1 }}.{{ item.name }}
              </span>
              <span class="speed" v-if="item.isLoading && !item.isPlay">
                准备就绪
              </span>
              <span class="speed" v-if="item.isPlay && item.percentage !== 100">
                {{ item.speed }}/s
              </span>
              <span v-if="item.percentage === 100" class="success">完成</span>
              <div class="total">
                {{ filterSize(item.size) }}
              </div>
            </div>
            <span class="name error" v-if="item.errMsg">{{ item.errMsg }}</span>
            <el-progress :percentage="item.percentage" v-if="item.percentage < 100 && !item.errMsg"></el-progress>
            <template v-else>
              <el-progress :percentage="item.percentage" :status="item.errMsg ? 'exception' : 'success'"></el-progress>
            </template>
          </div>
          <div class="tool">
            <span v-if="
              !item.percentage || (0 < item.percentage < 100 && !item.isPlay)
            " class="icon delete" @click="handleDeleteChangeFile(index)">
              <el-icon>
                <Close />
              </el-icon>
            </span>
            <span v-if="item.percentage && item.percentage !== 100" class="icon"
              :class="item.isPlay ? 'delete' : 'success'" @click="handleStopChangeFile(index, item)">
              <el-icon v-if="item.isPlay">
                <VideoPause />
              </el-icon>
              <el-icon v-else>
                <CaretRight />
              </el-icon>
            </span>
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
import dayjs from 'dayjs'
import { filterSize, handleNetworkSpeed } from './util'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAliOssClient } from '@/utils/ossClient'
import {
  Upload,
  VideoPlay,
  RefreshRight,
  VideoPause,
  Close,
  CaretRight
} from '@element-plus/icons-vue'

const unList = ref([]) // 未完成列表
const fileList = ref([]) // 文件列表
const file = ref(null) // 文件信息
const uploadDisabled = ref(true) // 上传按钮状态
const resumeDisabled = ref(true) // 继续上传按钮状态
const pauseDisabled = ref(true) // 暂停上传按钮状态
const checkpoints = ref({}) // 分片信息
const fileMap = ref({}) // 文件map
const map_max_key = ref(0) // 最大key
const dialogVisible = ref(false) // 弹窗状态
const partSize = ref(1024 * 1024 * 5) // 分片大小
const parallel = ref(4) // 并发数
const isUploadOk = ref(false) // 上传是否完成

defineProps({
  // 接受上传的文件类型，默认全部
  accept: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: true
  },
  value: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const emit = defineEmits(['on-close', 'get-unlist'])

/**
 * @description 选择文件事件
 * @param {*} file 文件信息
 * @param {*} fileList 文件列表
 */
const handleChange = (f, fList) => {
  console.log('file', f)
  console.log('fileList', fList)
  fList.forEach((item) => {
    item.client = null // 初始化oss 为了能单独控制单文件
    item.isPlay = false // 是否开始 控制开启状态
    item.isLoading = false // 是否处于就绪状态
    item.abortCheckpoint = false // 是否分片
  })
  fileList.value = fList
  console.log('fileList.value', fileList.value)
  file.value = f.raw // raw类型为File
  uploadDisabled.value = false // 默认开启上传状态
  pauseDisabled.value = resumeDisabled.value = true // 关闭暂停恢复按钮
}

const handleClose = () => {
  // 关闭事件
  // emit('on-close')
  if (isUploadOk.value) dialogVisible.value = false
  else {
    ElMessageBox.confirm(
      '正在上传文件，关闭后上传文件会丢失！是否继续？',
      '操作提示',
      {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }
    )
      .then(() => {
        emit('get-unlist')
        fileList.value.forEach((item) => {
          if (item.client && item.percentage < 100) item.client.cancel()
        })
        fileList.value = []
        dialogVisible.value = false
      })
      .catch(() => {
        console.error('什么都不做')
      })
  }
}

/**
 * @description 点击上传至服务器
 */
const startUpload = () => {
  uploadDisabled.value = true
  pauseDisabled.value = false
  // 上传
  multipartUpload()
}

/**
 * @description 切片上传
 */
const multipartUpload = async () => {
  if (!file.value) {
    ElMessage.error('请选择文件')
    return
  }

  fileList.value.forEach(async (item) => {
    // 设置准备就绪状态
    item.isLoading = true
    // 初始化文件oss
    item.client = await getAliOssClient()

    // 上传文件
    await ossUpload(item, fileList.value)
  })
}

/**
 * @description 获取当前日期
 * @returns 返回当前日期
 */
const getToday = () => {
  return dayjs().format('YYYYMMDDHHmmss')
}

/**
 * @description 上传至OSS
 * @param {*} item 文件信息
 * @param {*} fileList
 * @returns
 */
const ossUpload = async (item, fileList) => {
  let isPass = {
    pass: true,
    filePath: ''
  }
  try {
    const { raw, percentage } = item
    // 初始化文件大小
    item.partSize = 0
    // 判断上传进度是否小于100
    if (percentage < 100) {
      const file = raw
      const time = getToday()
      const path = time + file.name
      await item.client
        .multipartUpload(path, file, {
          parallel: parallel.value,
          partSize: partSize.value,
          progress: async (p, checkpoint, res) => {
            await onUploadProgress(item, p, checkpoint, res, path)
          }
        })
        .then(({ res }) => {
          console.log('multipartUpload result：', res)
          emit('input', fileList.value)
          resumeDisabled.value = true
          if (unList.value.length && uploadDisabled.value)
            resumeDisabled.value = false
        })
        .catch(async (err) => {
          await resetUpload(err, item)
        })
    }
  } catch (e) {
    //上传失败处理
    isPass = {
      ...e,
      pass: false,
      filePath: ''
    }
  }
  //上传成功返回filepath
  return isPass
}

/**
 * @description 上传进度
 */
const onUploadProgress = (item, p, checkpoint, res, path) => {
  if (checkpoint) {
    checkpoints.value[checkpoint.uploadId] = checkpoint
    item.speed = handleNetworkSpeed(
      res,
      partSize.value,
      p,
      fileMap.value,
      map_max_key.value
    )
    item.tempCheckpoint = checkpoint
    item.abortCheckpoint = checkpoint
    item.upload = checkpoint.uploadId
  }
  // 改变上传状态
  item.isPlay = true
  // 改变准备就绪状态
  if (item.isPlay) item.isLoading = false

  item.uploadName = path
  // 上传进度
  item.percentage = Number((p * 100).toFixed(2))
}

/**
 * @description 恢复上传
 */
const resumeUpload = async () => {
  pauseDisabled.value = false
  uploadDisabled.value = resumeDisabled.value = true
  await resumeMultipartUpload()
}

/**
 * @description 恢复上传
 */
const resumeMultipartUpload = async (item) => {
  // 恢复单文件
  if (item) {
    const { tempCheckpoint } = item
    resumeUploadFile(item, tempCheckpoint)
  } else {
    // 多文件
    Object.values(checkpoints.value).forEach((checkpoint) => {
      const { uploadId } = checkpoint
      const index = fileList.value.findIndex(
        (option) => option.upload === uploadId
      )
      const item = fileList.value[index]
      resumeUploadFile(item, checkpoint)
    })
  }
}

/**
 * @description 恢复上传
 * @param {*} item 文件信息
 * @param {*} checkpoint 分片信息
 */
const resumeUploadFile = async (item, checkpoint) => {
  const { uploadId, file, name } = checkpoint
  try {
    const { raw, percentage } = item
    item.partSize = 0

    if (percentage < 100 && raw.name.indexOf('.') !== -1) {
      item.client
        .multipartUpload(uploadId, file, {
          parallel: parallel.value,
          partSize: partSize.value,
          progress: async (p, checkpoint, res) => {
            await onUploadProgress(item, p, checkpoint, res, name)
          },
          checkpoint
        })
        .then((result) => {
          delete checkpoints.value[checkpoint.uploadId]
          emit('input', fileList.value)
          resumeDisabled.value = true
          if (unList.value.length && uploadDisabled.value)
            resumeDisabled.value = false
        })
        .catch(async (err) => {
          await resetUpload(err, item)
        })
    }
  } catch {
    console.log('---err---')
  }
}

const resetUpload = async (err, item) => {
  console.log('---resetUpload---')
}

/**
 * @description 暂停分片上传
 */
const stopUplosd = () => {
  console.log('stopUplosd')
  resumeDisabled.value = false
  pauseDisabled.value = true
  // window.removeEventListener('online', this.resumeUpload)
  // let result = this.client.cancel()
  fileList.value.forEach((item) => {
    item.client.cancel()
    item.isPlay = false
  })
}

const handleStopChangeFile = (index, item) => {
  item.isPlay = !item.isPlay
  fileList.value.splice(index, 1, item)
  if (!item.isPlay) item.client.cancel()
  else resumeMultipartUpload(item)
}

const handleDeleteChangeFile = (index) => {
  fileList.value.splice(index, 1)
  if (!fileList.value.length) dialogVisible.value = false
  // 可自行开发
}

watch(
  fileList,
  (newVal) => {
    console.log('val', newVal)
    if (newVal.length) {
      dialogVisible.value = true
      let list = []
      let unList = []
      newVal.forEach((item) => {
        // 上传进度不满足100%都存放到未完成列表，反之完成列表
        if (item.percentage === 100) list.push(item)
        else unList.push(item)
      })
      // 判断是否全部完成
      if (list.length === newVal.length) {
        isUploadOk.value = true
        pauseDisabled.value = true
      } else {
        isUploadOk.value = false
      }
      unList.value = unList
    }
  },
  { deep: true }
)
</script>

<style lang="less" scoped>
.file-list {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}

.icon-file {
  width: 2.5em;
  height: 2.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

::v-deep {
  .el-progress-circle {
    width: 40px !important;
    height: 40px !important;
  }
}

.file-item {
  display: flex;
  align-content: center;

  .file-name {
    flex: 1;

    .name {
      width: 100%;
      display: flex;

      .total {
        margin-left: 20px;
      }

      // justify-content: space-between;
      .file-name-item {
        font-weight: 500;
        width: 290px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .speed {
        width: 120px;
        text-align: center;
        font-size: 13px;
        color: #000;
      }

      .success {
        text-align: center;
        width: 120px;
        color: #91cc75;
      }

      &.error {
        color: #f45;
        font-size: 12px;
      }
    }
  }

  border-bottom: 1px solid #ddd;
  padding: 15px 0;

  &:last-child {
    border-bottom: 0;
  }

  .tool {
    margin-left: 15px;

    .icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background-color: #eee;
      border-radius: 5px;
      margin: 0px 4px;
      cursor: pointer;
      font-size: 15px;
      color: rgb(255, 68, 85);
      font-weight: 600;

      &.success {
        color: #91cc75;
        background-color: #eee;
      }
    }
  }
}

.dialog-head {
  display: flex;
  justify-content: space-between;
}

::v-deep {
  .el-progress-bar {
    width: 320px !important;
  }
}

.num {
  background: #515256a8;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 5px;
  color: #fff;
}
</style>
