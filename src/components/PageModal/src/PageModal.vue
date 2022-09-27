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
          <el-button type="primary" @click="sure">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineExpose } from 'vue'
import { XForm } from '@/base-ui/form'
import { useStore } from '@/store'

const centerDialogVisible = ref(false)
const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  storeActionKey: {
    type: String,
    required: true
  }
})
const title = ref('')
const formValues = ref<any>({})
let modalType: 'update' | 'create' = 'update'
let itemId = ''
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
    console.log('sthTobeChange:', props.modalConfig)
    // sthTobeChange.row.name = '6666666'
    props.modalConfig.FormData.forEach((item: any) => {
      formValues.value[item.field] = sthTobeChange.row[item.field]
    })
    itemId = sthTobeChange.row.id
    // formValues.value = { ...sthTobeChange.row } //解除响应作用
    modalType = 'update'
  } else {
    formValues.value = {}
    modalType = 'create'
  }
}
const store = useStore()
const sure = () => {
  centerDialogVisible.value = false
  console.log('formValues.value:', formValues.value)
  if (modalType === 'update') {
    store.dispatch('system/updateItemInfoAction', {
      storeActionKey: props.storeActionKey,
      id: itemId,
      value: formValues.value
    })
  } else {
    console.log('props.storeActionKey:', props.storeActionKey)
    store.dispatch('system/createNewItemAction', {
      storeActionKey: props.storeActionKey,
      value: formValues.value
    })
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
