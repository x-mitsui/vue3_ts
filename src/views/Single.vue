<!-- eslint-disable prettier/prettier -->
<template>
  <div class="upload-container">
    <input type="file" @change="handleFileChange" ref="fileInput" style="display: none" />
    <button @click="triggerFileSelect" class="upload-btn">
      {{ uploadStatus || '选择文件' }}
    </button>
    <progress v-if="progress > 0" :value="progress" max="100" class="upload-progress" />
    <div v-if="fileUrl" class="preview-area">
      <a :href="fileUrl" target="_blank">查看文件</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAliOssClient, uploadFile } from '@/utils/ossClient'

const fileInput = ref(null)
const uploadStatus = ref('')
const progress = ref(0)
const fileUrl = ref('')

const triggerFileSelect = () => {
  fileInput.value.click()
}
// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
const handleFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  // if (!ALLOWED_TYPES.includes(file.type)) {
  //   alert('不支持的文件类型')
  //   return
  // }

  try {
    uploadStatus.value = '上传中...'
    const client = await getAliOssClient()

    const result = await uploadFile(client, file, {
      progress: (p) => {
        progress.value = Math.floor(p * 100)
      }
    })

    fileUrl.value = result.url
    uploadStatus.value = '上传成功！'
    setTimeout(() => {
      progress.value = 0
      uploadStatus.value = ''
    }, 2000)
  } catch (err) {
    console.error('上传失败:', err)
    uploadStatus.value = '上传失败，请重试'
    progress.value = 0
  }
}
</script>

<style scoped>
.upload-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 2px dashed #ccc;
}

.upload-btn {
  padding: 12px 24px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.upload-progress {
  width: 100%;
  margin-top: 10px;
  height: 8px;
}

.preview-area {
  margin-top: 15px;
}
</style>
