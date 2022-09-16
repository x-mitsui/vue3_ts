<template>
  <el-form :model="FormData">
    <el-form-item label="手机号" prop="account">
      <el-input v-model="FormData.phoneNum" type="" autocomplete="off" />
    </el-form-item>
    <el-form-item label="验证码" prop="password">
      <div class="verify-box">
        <el-input
          v-model="FormData.verifyCode"
          type="password"
          autocomplete="off"
        />
        <el-button type="primary"> 获取验证码 </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from './configs/account-config'
export default defineComponent({
  setup() {
    const FormData = reactive({
      phoneNum: '',
      verifyCode: ''
    })
    const loginByPhone = (isRemember: boolean) => {
      console.log('loginByPhone----PhoneForm', isRemember)
      // todo:待补充
    }

    return { FormData, rules, loginByPhone }
  }
})
</script>

<style scoped>
.verify-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
