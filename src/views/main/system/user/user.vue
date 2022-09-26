<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" @search="search" @reset="reset" />
    <PageContent
      :contentConfig="contentConfig"
      ref="pc"
      @createItem="createItem"
      @updateItem="updateItem"
    />
    <PageModal :modalConfig="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
import { modalConfig } from './configs/modal.config'
import { pc, search, reset } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'user',
  setup() {
    const createCallback = () => {
      const form_data = modalConfig.FormData.find(
        (item) => item.field === 'password'
      )
      if (form_data) {
        form_data.isShow = true
      }
    }
    const updateCallback = () => {
      const form_data = modalConfig.FormData.find(
        (item) => item.field === 'password'
      )
      if (form_data) {
        form_data.isShow = false
      }
    }
    const { modalRef, createItem, updateItem } = usePageModal(
      createCallback,
      updateCallback
    )
    return {
      searchConfig,
      contentConfig,
      pc,
      search,
      reset,
      modalRef,
      createItem,
      updateItem,
      modalConfig
    }
  }
})
</script>

<style lang="less" scoped></style>
