<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="title"
      width="30%"
      destroy-on-close
      center
    >
      <XForm :="modalConfig" v-model="formValues" labelWidth="80px" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineExpose } from 'vue'
import { XForm } from '@/base-ui/form'

const centerDialogVisible = ref(false)
defineProps({
  modalConfig: {
    type: Object,
    required: true
  }
})
const title = ref('')
const formValues = ref({})
const OpenTheModal = ({
  sthTobeChange,
  title: modalTitle // 别名
}: {
  // 类型
  sthTobeChange?: any
  title: string
}) => {
  centerDialogVisible.value = true
  title.value = modalTitle
  if (sthTobeChange) {
    console.log('sthTobeChange:', sthTobeChange)
    // sthTobeChange.row.name = '6666666'
    formValues.value = { ...sthTobeChange.row } //解除响应作用
  } else {
    formValues.value = {}
  }
}
defineExpose({ OpenTheModal })
</script>

<style lang="less" scoped>
.page-content {
  .operate {
    display: flex;
    justify-content: center;
    .el-button {
      padding: 0;
    }
  }
}
</style>
