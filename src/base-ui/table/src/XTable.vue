<template>
  <div class="x-table">
    <el-table :data="usersList" border style="width: 100%">
      <template v-for="item of propsList" :key="item.prop">
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column v-bind="item" align="center">
          <template v-slot="columnInfo">
            <slot :name="item.slotName" :info="columnInfo.row[item.prop]">
              {{ columnInfo.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { IUser } from '@/service/system/types'
import { defineProps, PropType } from 'vue'

defineProps({
  usersList: { type: Array as PropType<IUser[] | undefined>, required: true },
  propsList: { type: Array as PropType<any>, required: true },
  showIndexColumn: { type: Boolean, default: false }
})
</script>

<style lang="less" scoped>
.x-table {
  border-top: 20px solid #f5f5f5;
}
</style>
