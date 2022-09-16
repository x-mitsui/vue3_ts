<template>
  <div class="wrapper">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="curTabName" class="tab">
      <el-tab-pane name="acc">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <AccountForm ref="acc_ref"></AccountForm>
      </el-tab-pane>
      <el-tab-pane name="pho">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <PhoneForm ref="pho_ref"></PhoneForm>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isRemember">记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="loginByAccount"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AccountForm from './AccountForm.vue'
import { LocalCache } from '@/utils/LocalCache'
import PhoneForm from './PhoneForm.vue'
export default defineComponent({
  setup() {
    const isRemember = ref(LocalCache.get('isRememberPassword') ?? true)
    const acc_ref = ref<InstanceType<typeof AccountForm>>()
    const pho_ref = ref<InstanceType<typeof PhoneForm>>()
    const curTabName = ref('acc')

    const loginByAccount = () => {
      if (curTabName.value === 'acc') {
        acc_ref.value?.loginByAccount(isRemember.value)
      } else {
        pho_ref.value?.loginByPhone(isRemember.value)
      }
      LocalCache.set('isRememberPassword', isRemember.value)
    }
    return { isRemember, acc_ref, pho_ref, curTabName, loginByAccount }
  },
  components: {
    AccountForm,
    PhoneForm
  }
})
</script>

<style scoped lang="less">
.wrapper {
  .title {
    text-align: center;
  }
  .tab {
    width: 300px;
    .custom-tabs-label {
      display: flex;
      justify-content: left;
      align-items: center;
    }
  }
  .account-control {
    margin-top: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-btn {
    margin-top: 15px;
    height: 40px;
    width: 100%;
  }
}
</style>
