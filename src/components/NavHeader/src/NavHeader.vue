<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import UserInfo from './cpns/UserInfo.vue'
import Breadcrumb from './cpns/Breadcrumb.vue'

const emit = defineEmits(['changeMenuWidth'])

const isFold = ref(false)
const click = () => {
  isFold.value = !isFold.value
  emit('changeMenuWidth')
}
</script>

<template>
  <div class="nav-header-wrapper">
    <el-icon @click="click" class="fold-item">
      <component :is="isFold ? 'Expand' : 'Fold'" />
    </el-icon>
    <div class="user-wrapper">
      <Breadcrumb />
      <UserInfo />
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-header-wrapper {
  color: black;
  display: flex;
  align-items: center;
  width: 100%;
  .fold-item {
    font-size: 30px;
    cursor: pointer;
  }
  .user-wrapper {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
  }
}
</style>
