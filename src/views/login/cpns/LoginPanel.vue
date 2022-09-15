<template>
  <el-tabs type="border-card" stretch>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><User /></el-icon>
          <span>账号登录</span>
        </span>
      </template>
      <AccountForm ref="acc_ref"></AccountForm>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Iphone /></el-icon>
          <span>手机登录</span>
        </span>
      </template>
      <PhoneForm></PhoneForm>
    </el-tab-pane>
  </el-tabs>
  <div class="account-control">
    <el-checkbox v-model="isRemember">记住密码</el-checkbox>
    <el-link>忘记密码</el-link>
  </div>
  <el-button class="login-btn" type="primary" @click="loginByAccount"
    >立即登录</el-button
  >
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { User, Iphone } from '@element-plus/icons-vue'
import AccountForm from './AccountForm.vue'
export default defineComponent({
  setup() {
    const isRemember = ref(true)
    const acc_ref = ref<InstanceType<typeof AccountForm>>()
    const loginByAccount = () => {
      console.log('acc_ref.value,', acc_ref.value)
      acc_ref.value?.loginByAccount()
    }
    return { isRemember, loginByAccount, acc_ref }
  },
  components: {
    User,
    Iphone,
    AccountForm
  }
})
</script>

<style scoped>
.custom-tabs-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.account-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-btn {
  margin-top: 20px;
  width: 100%;
}
</style>
