<template>
  <el-form :model="formData" :rules="rules" ref="accFormRef">
    <el-form-item label="账号" prop="account">
      <el-input v-model="formData.account" type="" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="formData.password"
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
import { LocalCache } from '@/utils/LocalCache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const accFormRef = ref<InstanceType<typeof ElForm>>()

    const formData = reactive({
      account: LocalCache.get('account') ?? '',
      password: LocalCache.get('password') ?? ''
    })
    const loginByAccount = (isRemember: boolean) => {
      accFormRef.value?.validate((valid) => {
        if (valid) {
          console.log('loginByAccount - accountFrom')
          if (isRemember) {
            LocalCache.set('account', formData.account)
            LocalCache.set('password', formData.password)
          } else {
            LocalCache.set('account', '')
            LocalCache.set('password', '')
          }

          // 解构，变为非响应式的普通值
          store.dispatch('LoginModule/accountLoginAction', { ...formData })
        }
      })
    }
    return { formData, rules, loginByAccount, accFormRef }
  }
})
</script>

<style scoped></style>
