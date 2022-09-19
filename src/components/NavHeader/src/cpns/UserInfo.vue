<template>
  <el-dropdown class="userinfo" @command="handleCommand">
    <div class="active-region">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <h2>{{ userinfo.name }}</h2>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="CircleClose" command="exit">
          <span>退出登录</span>
        </el-dropdown-item>
        <el-dropdown-item divided icon="InfoFilled" command="userinfo">
          <span>用户信息</span>
        </el-dropdown-item>
        <el-dropdown-item icon="Setting" command="systemManage">
          <span>系统管理</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import router from '@/router'
import { defineProps } from 'vue'
import { useStore } from 'vuex'
import { LocalCache } from '@/utils/LocalCache'

const store = useStore()
defineProps({
  userinfo: {
    type: Object,
    default: null
  }
})
const userinfo = store.state.login.userinfo
const handleCommand = (command: string | number) => {
  if (command === 'exit') {
    LocalCache.clear()
    router.replace('/login')
  } else if (command === 'userinfo') {
    //
  } else {
    //
  }
}
</script>

<style scoped lang="less">
.userinfo {
  .active-region {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
