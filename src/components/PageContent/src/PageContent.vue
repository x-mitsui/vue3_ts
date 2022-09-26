<template>
  <div class="page-content">
    <x-table
      :dataList="dataList"
      :="contentConfig"
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      :dataCount="dataCount"
    >
      <template #status="slotProps">
        <el-button
          :type="slotProps.row[slotProps.propName] === 1 ? 'success' : 'danger'"
          size="small"
          plain
        >
          {{ slotProps.row[slotProps.propName] === 1 ? '允许' : '禁止' }}
        </el-button>
      </template>
      <template #createAt="slotProps">
        <span>{{
          $filters.formatTime(slotProps.row[slotProps.propName])
        }}</span>
      </template>
      <template #updateAt="slotProps">
        <span>{{
          $filters.formatTime(slotProps.row[slotProps.propName])
        }}</span>
      </template>
      <template #operate="slotProps">
        <div class="operate">
          <el-button
            link
            type="primary"
            icon="Edit"
            size="small"
            @click="updateItem(slotProps)"
          >
            操作
          </el-button>
          <el-button
            link
            type="primary"
            icon="Delete"
            size="small"
            @click="deleteItem(slotProps.row['id'])"
            >删除</el-button
          >
        </div>
      </template>
      <template #control>
        <el-button
          size="default"
          type="primary"
          v-if="isCreate"
          @click="createItem"
          >插入数据</el-button
        >
      </template>
      <template
        v-for="item of otherPropsList"
        :key="item.prop"
        #[item.slotName]="slotProps"
      >
        <slot :name="item.slotName" :info="slotProps.row[slotProps.propName]">
        </slot>
      </template>
    </x-table>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  PropType,
  onMounted,
  computed,
  defineExpose,
  ref,
  watch,
  defineEmits
} from 'vue'
import { useStore } from '@/store'
import { XTable } from '@/base-ui/table'
import { contentType } from '@/views/main/system/types/content.type'
import { usePermission } from '@/hooks/usePermission'

const props = defineProps({
  contentConfig: {
    type: Object as PropType<contentType>,
    required: true
  }
})
const otherPropsList = computed(() =>
  props.contentConfig.propsList.filter((item) => {
    if (
      ['status', 'createAt', 'updateAt', 'operate'].includes(item.slotName) ||
      !item.slotName
    ) {
      return false
    }
    return true
  })
)
const isCreate = usePermission(props.contentConfig.storeActionKey, 'create')
const isDelete = usePermission(props.contentConfig.storeActionKey, 'delete')
const isUpdate = usePermission(props.contentConfig.storeActionKey, 'update')
const isQuery = usePermission(props.contentConfig.storeActionKey, 'query')

const store = useStore()
const dataList = computed(() =>
  store.getters['system/getDataList'](props.contentConfig.storeActionKey)
)
const dataCount = computed(() =>
  store.getters['system/getDataCount'](props.contentConfig.storeActionKey)
)
const currentPage = ref(1)
const pageSize = ref<10 | 20 | 30>(10)

// 获取数据列表
const getList = (queryInfo: any = {}) => {
  store.dispatch('system/getListAction', {
    storeActionKey: props.contentConfig.storeActionKey,
    queryInfo: {
      ...queryInfo,
      offset: (currentPage.value - 1) * pageSize.value,
      size: pageSize.value
    }
  })
}

const emit = defineEmits(['createItem', 'updateItem'])
// 增加一条数据
const createItem = () => {
  console.log('增加一条数据')
  emit('createItem')
}
// 删除一条数据
const deleteItem = (id: any) => {
  console.log('id:', id)
  store.dispatch('system/deleteItemAction', {
    storeActionKey: props.contentConfig.storeActionKey,
    id
  })
}
// 更新一条数据
const updateItem = (slotProps: any) => {
  console.log('更新一条数据', slotProps)
  emit('updateItem', slotProps, true)
}

watch(currentPage, () => {
  getList()
})
watch(pageSize, () => {
  getList()
})
onMounted(() => {
  getList()
})
const search = (queryInfo: any = {}) => {
  getList(queryInfo)
}
defineExpose({
  search
})
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
