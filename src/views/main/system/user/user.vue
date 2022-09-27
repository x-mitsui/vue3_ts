<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" @search="search" @reset="reset" />
    <PageContent
      :contentConfig="contentConfig"
      ref="pc"
      @createItem="createItem"
      @updateItem="updateItem"
    />
    <PageModal
      :modalConfig="modalConfigRef"
      :storeActionKey="contentConfig.storeActionKey"
      ref="modalRef"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
import { modalConfig } from './configs/modal.config'
import { pc, search, reset } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { recollectData } from '@/utils/recollectData'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  setup() {
    // modal的打开时的显示
    const createCallback = () => {
      const originalConfig = JSON.parse(JSON.stringify(modalConfigRef.value))

      recollectData(
        originalConfig.FormData,
        modalConfigRef.value.FormData,
        'create'
      )
    }
    const updateCallback = () => {
      const originalConfig = JSON.parse(JSON.stringify(modalConfigRef.value))

      recollectData(
        originalConfig.FormData,
        modalConfigRef.value.FormData,
        'update'
      )
    }

    const { modalRef, createItem, updateItem } = usePageModal(
      createCallback,
      updateCallback
    )

    // 2.动态为select添加部门、角色选项
    const store = useStore()

    const modalConfigRef = computed(() => {
      console.log('1111111111111:', store.state.allDepartmentList)
      const departmentConfig = modalConfig.FormData.find(
        (item) => item.field === 'departmentId'
      )
      console.log('departmentConfig:', departmentConfig)
      if (departmentConfig) {
        if (departmentConfig.options) {
          departmentConfig.options.length = 0
          store.state.allDepartmentList.map((item) => {
            if (departmentConfig.options) {
              departmentConfig.options.push({
                label: item.name,
                value: item.id
              })
            }
          })
        }
      }
      const roleConfig = modalConfig.FormData.find(
        (item) => item.field === 'roleId'
      )
      if (roleConfig) {
        if (roleConfig.options) {
          console.log('66666:', 66666)
          roleConfig.options.length = 0
          store.state.allRoleList.forEach((item) => {
            if (roleConfig.options) {
              roleConfig.options.push({ label: item.name, value: item.id })
              console.log('roleConfig:', roleConfig)
            }
          })
        }
      }
      console.log('&&', modalConfig)
      return modalConfig
    })

    return {
      searchConfig,
      contentConfig,
      pc,
      search,
      reset,
      modalRef,
      createItem,
      updateItem,
      modalConfigRef
    }
  }
})
</script>

<style lang="less" scoped></style>
