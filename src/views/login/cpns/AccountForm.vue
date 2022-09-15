<template>
  <el-form :model="FormData" :rules="rules" ref="accFormRef">
    <el-form-item label="账号" prop="account">
      <el-input v-model="FormData.account" type="" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="FormData.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from './configs/account-config'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const accFormRef = ref<InstanceType<typeof ElForm>>()

    const FormData = reactive({
      account: '',
      password: ''
    })
    const loginByAccount = () => {
      accFormRef.value?.validate((valid) => {
        if (valid) {
          console.log('loginByAccount - accountFrom')
        }
      })
    }
    return { FormData, rules, loginByAccount, accFormRef }
  }
})
</script>

<style scoped></style>
