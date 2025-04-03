<!-- eslint-disable prettier/prettier -->
<template>
  <div class="form-container">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="submitForm">
      <!-- 产品id -->
      <el-form-item label="产品id" prop="id">
        <el-input v-model="form.id" placeholder="请输入产品id" />
      </el-form-item>

      <!-- 小图上传 -->
      <el-form-item label="产品小图" prop="img_url">
        <Updater v-model="form.img_url" :id="form.id" accept="image/*" :max-size="5" :type="'img'" />
      </el-form-item>

      <!-- 海报上传 -->
      <el-form-item label="产品海报" prop="poster_url">
        <Updater v-model="form.poster_url" :id="form.id" accept="image/*" :max-size="5" :type="'poster'" />
      </el-form-item>

      <!-- 视频上传 -->
      <el-form-item label="产品视频" prop="video_url">
        <Updater v-model="form.video_url" :id="form.id" accept="video/*" :max-size="50" :type="'video'" />
      </el-form-item>

      <!-- 提交按钮 -->
      <div class="fixed-submit">
        <el-button type="primary" :loading="submitting" @click="submitForm">
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
import axios from 'axios'

// 表单引用
const formRef = ref()

// 表单数据
const form = reactive({
  id: '',
  img_url: '',
  poster_url: '',
  video_url: ''
})

// 表单验证规则
const validateRelativeUrl = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请上传文件'))
  }
  callback()
}

const rules = {
  id: [{ required: true, message: '请输入产品id', trigger: 'blur' }],
  img_url: [
    { required: true, message: '请上传产品小图', trigger: 'change' },
    { validator: validateRelativeUrl, trigger: 'change' }
  ],
  poster_url: [
    { required: true, message: '请上传产品海报', trigger: 'change' },
    { validator: validateRelativeUrl, trigger: 'change' }
  ],
  video_url: [
    { required: true, message: '请上传产品视频', trigger: 'change' },
    { validator: validateRelativeUrl, trigger: 'change' }
  ]
}

const submitting = ref(false)

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) {
      ElMessage.error('请完善表单信息')
      return
    }

    submitting.value = true
    try {
      console.log('form:', form)
      // 这里替换为实际的API调用
      // await axios.post('http://localhost:3001/cms/file/uploadFormData', form)
      ElMessage.success('产品创建成功')
    } catch (error) {
      ElMessage.error('提交失败: ' + error.message)
    } finally {
      submitting.value = false
    }
  })
}
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px 80px;
  position: relative;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
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
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
