<!-- eslint-disable prettier/prettier -->
<template>
  <div class="upload-container">
    <el-upload :show-file-list="false" :before-upload="beforeUpload" :http-request="customRequest" :accept="accept" drag
      :class="{ 'no-id': !props.id }">
      <div v-if="!fileUrl" class="upload-area" :class="{ 'is-uploading': uploading }">
        <el-icon class="upload-icon">
          <upload-filled v-if="!uploading" />
          <loading v-else class="is-loading" />
        </el-icon>
        <div class="upload-text">
          {{ !props.id ? '请先输入产品ID' : uploading ? '上传中...' : '点击或拖拽文件到此处' }}
        </div>
        <div class="upload-hint">
          支持 {{ accept }} 格式，最大 {{ maxSize }}MB
        </div>
      </div>

      <div v-else class="preview-wrapper">
        <img v-if="isImageType" :src="fileUrl" class="preview-image" alt="预览" />
        <video v-else-if="isVideoType" :src="fileUrl" controls class="preview-video" />
        <div v-else class="file-preview">
          <el-icon>
            <document />
          </el-icon>
          <span class="file-name">{{ fileName }}</span>
        </div>
      </div>
    </el-upload>

    <div v-if="fileUrl" class="file-actions">
      <el-button type="danger" size="small" @click="handleRemove">
        移除文件
      </el-button>
    </div>

    <div v-if="fileUrl" class="file-url">
      <el-tag type="success" class="url-tag">文件地址：</el-tag>
      <el-input :value="fileUrl" readonly class="url-input">
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
import { ref, computed, defineProps, defineEmits } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
import { UploadFilled, DocumentCopy, Loading } from '@element-plus/icons-vue'
import { uploadFileByPresignedUrl } from '@/utils/ossClient'

const props = defineProps({
  modelValue: String,
  id: {
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
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

// 状态变量
const fileUrl = ref('')
const uploading = ref(false)
const file = ref(null)

// 计算属性
const isImageType = computed(() => file.value?.type.startsWith('image/'))
const isVideoType = computed(() => file.value?.type.startsWith('video/'))
const fileName = computed(() => file.value?.name || '')

// 文件验证
const beforeUpload = (rawFile) => {
  // 检查ID是否存在
  if (!props.id) {
    ElMessage.error('请先输入产品ID')
    return false
  }

  if (rawFile.size / 1024 / 1024 > props.maxSize) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB`)
    return false
  }

  const acceptTypes = props.accept.split(',').map((t) => t.trim())
  if (
    !acceptTypes.includes('*/*') &&
    !acceptTypes.some((t) => rawFile.type.match(t.replace('*', '.*')))
  ) {
    ElMessage.error(`仅支持 ${props.accept} 格式的文件`)
    return false
  }

  file.value = rawFile
  return true
}

// 自定义上传
const customRequest = async () => {
  // 再次检查ID（以防万一）
  if (!props.id) {
    ElMessage.error('请先输入产品ID')
    return
  }

  uploading.value = true

  try {
    // 获取文件扩展名
    const ext = file.value.name.split('.').pop()
    // 根据type生成文件名
    const key = `resources/${props.id}/`

    const result = await uploadFileByPresignedUrl(
      'http://192.168.9.47:3001/cms/file/getPresignedUrl',
      key,
      new Buffer('') //file.value
    )
    console.log('result：', result)
    // 设置预览用的完整URL
    fileUrl.value = result.url.split('?')[0]
    console.log('fileUrl：', fileUrl.value)
    // 向父组件传递相对路径
    emit('update:modelValue', key)
    ElMessage.success('上传成功')
  } catch (error) {
    ElMessage.error('上传失败: ' + error.message)
  } finally {
    uploading.value = false
  }
}

// 移除文件
const handleRemove = async () => {
  try {
    await ElMessageBox.confirm('确定要删除该文件吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    fileUrl.value = ''
    emit('update:modelValue', '')
    file.value = null
    ElMessage.success('文件已移除')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('移除失败')
    }
  }
}

// 复制URL
const copyUrl = () => {
  navigator.clipboard
    .writeText(fileUrl.value)
    .then(() => ElMessage.success('已复制到剪贴板'))
    .catch(() => ElMessage.error('复制失败'))
}
</script>

<style scoped>
.upload-container {
  border: 1px dashed var(--el-border-color);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
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
  transition: opacity 0.3s ease;
}

.upload-area.is-uploading {
  opacity: 0.6;
  cursor: not-allowed;
}

.upload-icon {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 2px;
}

.upload-text {
  color: var(--el-text-color-regular);
  font-size: 8px;
  margin-bottom: 1px;
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

.preview-image,
.preview-video {
  max-width: 100%;
  max-height: 100px;
  border-radius: 6px;
  object-fit: contain;
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
}

.file-actions {
  margin-top: 16px;
  text-align: center;
}

.file-url {
  margin-top: 16px;
  display: flex;
  align-items: center;
}

.url-tag {
  margin-right: 8px;
  flex-shrink: 0;
}

.url-input {
  flex-grow: 1;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-dragger) {
  width: 100%;
  height: auto;
  border: none;
  background-color: transparent;
}

.is-loading {
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.no-id {
  opacity: 0.6;
  cursor: not-allowed !important;
}

.no-id :deep(.el-upload-dragger) {
  cursor: not-allowed !important;
}
</style>
