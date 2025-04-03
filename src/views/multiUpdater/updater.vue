<!-- eslint-disable prettier/prettier -->
<template>
  <div class="upload-container">
    <el-upload :show-file-list="false" :before-upload="beforeUpload" :http-request="customRequest" :accept="accept"
      drag>
      <div v-if="!modelValue" class="upload-area">
        <el-icon class="upload-icon"><upload-filled /></el-icon>
        <div class="upload-text">点击或拖拽文件到此处</div>
        <div class="upload-hint">
          支持 {{ accept }} 格式，最大 {{ maxSize }}MB
        </div>
      </div>

      <div v-else class="preview-wrapper">
        <img v-if="isImageType" :src="getFullUrl(modelValue)" class="preview-image" alt="预览" />
        <img v-else-if="isPosterType" :src="getFullUrl(modelValue)" class="preview-image" alt="预览" />
        <video v-else-if="isVideoType" :src="getFullUrl(modelValue)" controls class="preview-video" />
        <div v-else class="file-preview">
          <el-icon>
            <document />
          </el-icon>
          <span class="file-name">{{ fileName }}</span>
        </div>

        <canvas v-if="showSuccessCanvas" ref="successCanvas" class="success-canvas"></canvas>
      </div>

      <div v-if="uploading" class="upload-progress">
        <el-progress :percentage="progress" :status="progressStatus" />
      </div>
    </el-upload>

    <div v-if="modelValue" class="file-actions">
      <el-button type="danger" size="small" @click="handleRemove">
        移除文件
      </el-button>
    </div>

    <div v-if="modelValue" class="oss-url">
      <el-tag type="success" class="oss-tag">资源的OSS相对地址：</el-tag>
      <el-input :value="modelValue" readonly class="oss-input">
        <template #append>
          <el-button @click="copyUrl">
            <el-icon><document-copy /></el-icon>
          </el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import { UploadFilled, DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
import { getAliOssClient } from '@/utils/ossClient'

const props = defineProps({
  modelValue: String,
  productId: {
    type: String,
    required: true
  },
  accept: {
    type: String,
    default: '*/*'
  },
  maxSize: {
    type: Number,
    default: 10
  },
  type: {
    type: String,
    default: 'img'
  }
})

const emit = defineEmits(['update:modelValue', 'progress'])

// 上传状态
const uploading = ref(false)
const progress = ref(0)
const file = ref(null)

// 计算属性
const isImageType = computed(() => props.type === 'img')
const isPosterType = computed(() => props.type === 'poster')
const isVideoType = computed(() => props.type === 'video')
const fileName = computed(() => {
  if (!props.modelValue) return ''
  return props.modelValue.split('/').pop().split('?')[0]
})
const progressStatus = computed(() => {
  return progress.value === 100 ? 'success' : ''
})

// 添加成功Canvas状态
const showSuccessCanvas = ref(false)
const successCanvas = ref(null)

// 监听上传成功状态
watch(progress, (newVal) => {
  if (newVal === 100) {
    showSuccessCanvas.value = true
  } else {
    showSuccessCanvas.value = false
  }
})

// 文件验证
const beforeUpload = (rawFile) => {
  // 大小验证
  if (rawFile.size / 1024 / 1024 > props.maxSize) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB`)
    return false
  }

  // 类型验证
  if (props.type === 'poster' || props.type === 'image') {
    if (!rawFile.type.startsWith('image/')) {
      ElMessage.error('请上传图片文件')
      return false
    }
  } else if (props.type === 'video') {
    if (!rawFile.type.startsWith('video/')) {
      ElMessage.error('请上传视频文件')
      return false
    }
  }

  file.value = rawFile
  return true
}

// 自定义上传
const customRequest = async () => {
  uploading.value = true
  progress.value = 0

  try {
    // 1. 获取OSS客户端
    const client = await getAliOssClient()

    // 2. 获取产品ID
    const productId = props.productId
    if (!productId) {
      throw new Error('未获取到产品ID')
    }

    // 3. 生成唯一文件名
    const ext = file.value.name.split('.').pop()
    const prefix = props.type
    const key = `resources/${productId}/${prefix}.${ext}`

    // 4. 执行分片上传
    const result = await client.multipartUpload(key, file.value, {
      parallel: 4, // 并发数
      partSize: 1024 * 1024, // 分片大小 1MB
      progress: (p, checkpoint) => {
        progress.value = Math.floor(p * 100)
        emit('progress', progress.value)
        console.log('checkpoint:', checkpoint)
        console.log('progress:', progress.value)
        // 保存checkpoint用于断点续传
        localStorage.setItem('oss_checkpoint', JSON.stringify(checkpoint))
      }
    })
    console.log('result:', result)

    // 6. 更新模型值
    emit('update:modelValue', key)
    emit('progress', 100)
    ElMessage.success('上传成功')
  } catch (error) {
    ElMessage.error('上传失败: ' + error.message)
    emit('progress', 0)
  } finally {
    uploading.value = false
    localStorage.removeItem('oss_checkpoint')
  }
}

const getFullUrl = (relativeUrl) => {
  const bucket = 'test-dzq01'
  const region = 'oss-cn-beijing'
  return `https://${bucket}.${region}.aliyuncs.com/${relativeUrl}`
}

// 移除文件
const handleRemove = async () => {
  try {
    if (props.modelValue) {
      // 添加确认提示
      await ElMessageBox.confirm('确定要删除该文件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      // const client = await getAliOssClient()
      // await client.delete(props.modelValue) // 下次上传就会替换
      ElMessage.success('文件删除成功')
    }
  } catch (error) {
    if (error !== 'cancel') {
      // 忽略用户取消操作
      ElMessage.error('文件删除失败: ' + error.message)
    }
  } finally {
    emit('update:modelValue', '')
    emit('progress', 0)
  }
}

// 添加复制功能
const copyUrl = () => {
  navigator.clipboard
    .writeText(props.modelValue)
    .then(() => ElMessage.success('已复制到剪贴板'))
    .catch(() => ElMessage.error('复制失败'))
}
</script>

<style scoped>
.upload-container {
  border: 1px dashed var(--el-border-color);
  border-radius: 8px;
  padding: 24px;
  position: relative;
  transition: all 0.3s ease;
  background-color: var(--el-bg-color);
  animation: fadeIn 0.3s ease;
}

.upload-container:hover {
  border-color: var(--el-color-primary);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.upload-area {
  text-align: center;
  padding: 2px 0;
  cursor: pointer;
  min-height: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.upload-icon {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 2px;
  transition: color 0.3s ease;
}

.upload-text {
  color: var(--el-text-color-regular);
  font-size: 8px;
  margin-bottom: 1px;
  font-weight: 500;
}

.upload-hint {
  color: var(--el-text-color-placeholder);
  font-size: 6px;
}

.preview-wrapper {
  position: relative;
  min-height: 60px;
  max-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--el-fill-color-light);
}

.preview-image {
  max-width: 100%;
  max-height: 100px;
  border-radius: 6px;
  object-fit: contain;
}

.preview-video {
  max-width: 100%;
  max-height: 100px;
  border-radius: 6px;
}

.progress-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
}

.file-actions {
  margin-top: 16px;
  text-align: center;
}

.file-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.file-name {
  margin-top: 8px;
  word-break: break-all;
  text-align: center;
  max-width: 200px;
  color: var(--el-text-color-regular);
}

/* 添加一些动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 按钮样式微调 */
:deep(.el-upload-dragger) {
  border: none;
  background-color: transparent;
}

:deep(.el-upload) {
  width: 100%;
}

/* 添加Canvas样式 */
.success-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
  animation: scaleIn 0.3s ease-out;
}

/* 添加动画效果 */
@keyframes scaleIn {
  from {
    transform: translate(-50%, -50%) scale(0);
  }

  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 添加OSS地址展示样式 */
.oss-url {
  margin-top: 16px;
  display: flex;
  align-items: center;
}

.oss-tag {
  margin-right: 8px;
  flex-shrink: 0;
}

.oss-input {
  flex-grow: 1;
}

/* 添加上传进度条样式 */
.upload-progress {
  margin-top: 16px;
  padding: 0 16px;
}
</style>
