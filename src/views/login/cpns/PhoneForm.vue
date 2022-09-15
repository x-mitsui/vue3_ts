<template>
  <el-form :model="FormData" :rules="rules">
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
import { defineComponent, reactive } from 'vue'
import { rules } from './configs/account-config'
export default defineComponent({
  setup() {
    const FormData = reactive({
      account: '',
      password: ''
    })

    return { FormData, rules }
  }
})
</script>

<style scoped></style>
