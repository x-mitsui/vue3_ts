<template>
  <div class="x-table">
    <el-table
      :data="usersList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        :showSelectionColumn="showSelectionColumn"
      >
      </el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="item of propsList" :key="item.prop">
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
import { defineProps, defineEmits, PropType } from 'vue'

defineProps({
  usersList: { type: Array as PropType<IUser[] | undefined>, required: true },
  propsList: { type: Array as PropType<any>, required: true },
  showIndexColumn: { type: Boolean, default: false },
  showSelectionColumn: { type: Boolean, default: false }
})
const emit = defineEmits(['emitSelectionMes'])
const handleSelectionChange = (e: any) => {
  console.log(e)
  emit('emitSelectionMes', e)
}
</script>

<style lang="less" scoped>
.x-table {
  border-top: 20px solid #f5f5f5;
}
</style>
