<!-- eslint-disable prettier/prettier -->
<template>
  <div class="form-container">
    <el-form :model="form" :rules="rules" label-width="120px" @submit.prevent="submitForm">
      <!-- 产品id -->
      <el-form-item label="产品id" prop="id">
        <el-input v-model="form.id" placeholder="请输入产品id" />
      </el-form-item>
      <!-- 产品名称 -->
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入产品名称" />
      </el-form-item>

      <!-- 小图上传 -->
      <el-form-item label="产品小图" prop="img_url">
        <Updater v-model="form.img_relative_url" :product-id="form.id" accept="image/*" :max-size="5" :type="'img'"
          @progress="handleProgress('img', $event)" />
      </el-form-item>
      <!-- 海报上传 -->
      <el-form-item label="产品海报" prop="poster_url">
        <Updater v-model="form.poster_relative_url" :product-id="form.id" accept="image/*" :max-size="5"
          :type="'poster'" @progress="handleProgress('poster', $event)" />
      </el-form-item>

      <!-- 视频上传 -->
      <el-form-item label="产品视频" prop="video_url">
        <Updater v-model="form.video_relative_url" :product-id="form.id" accept="video/*" :max-size="50" :type="'video'"
          @progress="handleProgress('video', $event)" />
      </el-form-item>

      <!-- 提交按钮 -->
      <div class="fixed-submit">
        <el-button type="primary" :loading="submitting" :disabled="activeUploads > 0" @click="submitForm">
          提交表单
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import Updater from './updater.vue'

// 表单数据
const form = reactive({
  id: '',
  name: '',
  img_relative_url: '',
  poster_relative_url: '',
  video_relative_url: ''
})

// 表单验证规则
const validateRelativeUrl = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请上传文件'))
  }
  if (value.includes('..') || value.includes('//') || value.startsWith('/')) {
    return callback(new Error('非法文件路径'))
  }
  callback()
}

const rules = {
  id: [{ required: true, message: '请输入产品id', trigger: 'blur' }],
  name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
  img_relative_url: [
    { required: true, message: '请上传产品小图', trigger: 'change' },
    { validator: validateRelativeUrl, trigger: 'change' }
  ],
  poster_relative_url: [
    { required: true, message: '请上传产品海报', trigger: 'change' },
    { validator: validateRelativeUrl, trigger: 'change' }
  ],
  video_relative_url: [
    { required: true, message: '请上传产品视频', trigger: 'change' },
    { validator: validateRelativeUrl, trigger: 'change' }
  ]
}

// 上传状态
const uploadProgress = reactive({
  img: 0,
  poster: 0,
  video: 0
})
const activeUploads = ref(0)
const submitting = ref(false)

// 处理上传进度
const handleProgress = (type, progress) => {
  uploadProgress[type] = progress
  activeUploads.value = Object.values(uploadProgress).filter(
    (p) => p < 100
  ).length
}

// 提交表单
const submitForm = async () => {
  if (activeUploads.value > 0) {
    ElMessage.warning('请等待文件上传完成')
    return
  }

  submitting.value = true
  try {
    console.log('form:', form)
    // 这里替换为实际的API调用
    // await axios.post('/api/products', form)
    ElMessage.success('产品创建成功')
  } catch (error) {
    ElMessage.error('提交失败: ' + error.message)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px 80px;
  /* 增加底部padding，为固定按钮留出空间 */
  position: relative;
  height: 100vh;
  /* 设置容器高度为视口高度 */
  overflow-y: auto;
  /* 添加垂直滚动 */
  box-sizing: border-box;
  /* 确保padding计入高度 */
}

/* 美化滚动条 */
.form-container::-webkit-scrollbar {
  width: 8px;
}

.form-container::-webkit-scrollbar-track {
  background: var(--el-fill-color-blank);
  border-radius: 4px;
}

.form-container::-webkit-scrollbar-thumb {
  background: var(--el-border-color-darker);
  border-radius: 4px;
}

.form-container::-webkit-scrollbar-thumb:hover {
  background: var(--el-border-color);
}

.fixed-submit {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background: white;
  padding: 10px 20px;
  /* 增加水平padding */
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* 添加毛玻璃效果 */
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.9);
}

/* 移除全局进度条样式 */
</style>
