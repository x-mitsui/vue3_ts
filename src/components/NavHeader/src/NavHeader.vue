<template>
  <div class="nav-header-wrapper">
    <el-icon @click="click" class="fold-item">
      <component :is="isFold ? 'Expand' : 'Fold'" />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['changeMenuWidth'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const click = () => {
      isFold.value = !isFold.value
      emit('changeMenuWidth')
    }

    return { isFold, click }
  }
})
</script>

<style lang="less" scoped>
.nav-header-wrapper {
  color: black;

  .fold-item {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
