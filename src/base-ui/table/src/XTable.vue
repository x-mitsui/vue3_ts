<template>
  <div class="x-table">
    <div class="header">
      <slot name="header">
        <h2 class="title">{{ tableTitle }}</h2>
        <div class="control">
          <slot name="control"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="dataList"
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
        width="70"
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
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :currentPage="currentPage"
          :page-size="pageSize"
          @update:current-page="handleCurrentChange"
          @update:page-size="handleSizeChange"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IUser } from '@/service/system/types'
import { defineProps, defineEmits, PropType } from 'vue'

defineProps({
  dataList: { type: Array as PropType<IUser[] | undefined>, required: true },
  propsList: { type: Array as PropType<any>, required: true },
  showIndexColumn: { type: Boolean, default: false },
  showSelectionColumn: { type: Boolean, default: false },
  tableTitle: { type: String, default: '' },
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number as PropType<10 | 20 | 30>, default: 10 },
  dataCount: { type: Number, default: 100 }
})
const emit = defineEmits([
  'emitSelectionMes',
  'update:currentPage',
  'update:pageSize'
])
const handleSelectionChange = (e: any) => {
  console.log(e)
  emit('emitSelectionMes', e)
}

const handleSizeChange = (newPageSize: number) => {
  emit('update:pageSize', newPageSize)
}
const handleCurrentChange = (newCurrentPage: number) => {
  emit('update:currentPage', newCurrentPage)
}
</script>

<style lang="less" scoped>
.x-table {
  border-top: 20px solid #f5f5f5;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 22px;
  }
}
</style>
