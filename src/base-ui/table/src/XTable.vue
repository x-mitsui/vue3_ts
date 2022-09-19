<template>
  <div class="x-table">
    <el-table :data="usersList" style="width: 100%" border>
      <template v-for="item of propsList" :key="item.prop">
        <el-table-column v-bind="item" align="center" />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  usersList: { type: Array, required: true },
  propsList: { type: Array, required: true }
})
</script>

<style lang="less" scoped>
.x-table {
  border-top: 20px solid #f5f5f5;
}
</style>
