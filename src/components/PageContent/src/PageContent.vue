<template>
  <div class="page-content">
    <x-table :usersList="usersList" :="contentConfig">
      <template #status="slotProps">
        <el-button
          :type="slotProps.info === 1 ? 'success' : 'danger'"
          size="small"
          plain
        >
          {{ slotProps.info === 1 ? '允许' : '禁止' }}
        </el-button>
      </template>
      <template #createAt="slotProps">
        <span>{{ $filters.formatTime(slotProps.info) }}</span>
      </template>
      <template #updateAt="slotProps">
        <span>{{ $filters.formatTime(slotProps.info) }}</span>
      </template>
      <template #operate>
        <div class="operate">
          <el-button type="text" icon="Edit" size="small">操作</el-button>
          <el-button type="text" icon="Delete" size="small">删除</el-button>
        </div>
      </template>
      <template #control>
        <el-button size="default" type="primary">插入数据</el-button>
      </template>
    </x-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { XTable } from '@/base-ui/table'
import { IUser } from '@/service/system/types'
import { contentType } from '@/views/main/system/user/types/content.type'

defineProps({
  contentConfig: {
    type: Object as PropType<contentType>,
    required: true
  },
  usersList: {
    type: Array as PropType<IUser[] | undefined>,
    required: true
  }
})
</script>

<style lang="less" scoped>
.title {
  color: red;
  line-height: 2.5em;
}

.footer {
  text-align: right;
  padding-right: 18px;
}
.operate {
  display: flex;
  justify-content: center;
  .el-button {
    padding: 0;
  }
}
</style>
