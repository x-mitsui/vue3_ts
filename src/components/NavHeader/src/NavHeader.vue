<template>
  <div class="nav-header-wrapper">
    <el-icon @click="click" class="fold-item">
      <component :is="isFold ? 'Expand' : 'Fold'" />
    </el-icon>
    <div class="user-wrapper">
      <div>Breadcrumb</div>
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './cpns/UserInfo.vue'
export default defineComponent({
  emits: ['changeMenuWidth'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const click = () => {
      isFold.value = !isFold.value
      emit('changeMenuWidth')
    }

    return { isFold, click, UserInfo }
  },
  components: { UserInfo }
})
</script>

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
