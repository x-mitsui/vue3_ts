<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" @search="search" @reset="reset" />
    <PageContent :contentConfig="contentConfig" ref="pc" />
    <PageModal :modalConfig="modalConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
import { modalConfig } from './configs/modal.config'
import { pc, search, reset } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'user',
  setup() {
    const centerDialogVisible = ref(true)

    return {
      searchConfig,
      contentConfig,
      pc,
      search,
      reset,
      centerDialogVisible,
      modalConfig
    }
  }
})
</script>

<style lang="less" scoped></style>
