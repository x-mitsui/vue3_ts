<template>
  <div class="user">
    <PageSearch :formInfo="formInfo" />
    <div class="content">
      <x-table
        :usersList="userListRef"
        :propsList="propsList"
        :showIndexColumn="true"
        :showSelectionColumn="true"
      >
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
      </x-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from '@/store'
import { formInfo } from './configs/formInfo'
import { PageSearch } from '@/components/PageSearch'
import { XTable } from '@/base-ui/table'
export default defineComponent({
  name: 'user',
  setup() {
    const store = useStore()
    const userListRef = computed(() => store.state.system.usersList)
    const userCountRef = computed(() => store.state.system.usersCount)

    onMounted(() => {
      store.dispatch('system/getUsersAction', {
        offset: 0,
        size: 10
        // name: 'w',
        // cellphone: 4
      })
    })

    const propsList = [
      { label: '姓名', prop: 'name', minWidth: '100' },
      { label: '真实姓名', prop: 'realname', minWidth: '100' },
      { label: '手机号', prop: 'cellphone', minWidth: '100' },
      { label: '状态', prop: 'enable', minWidth: '100', slotName: 'status' },
      {
        label: '创建时间',
        prop: 'createAt',
        minWidth: '100',
        slotName: 'createAt'
      },
      {
        label: '更新时间',
        prop: 'updateAt',
        minWidth: '100',
        slotName: 'updateAt'
      }
    ]
    return { formInfo, userListRef, userCountRef, propsList }
  },
  components: {
    PageSearch,
    XTable
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
</style>
