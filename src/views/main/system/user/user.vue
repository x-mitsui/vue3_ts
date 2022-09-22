<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" @search="search" @reset="reset" />
    <PageContent :contentConfig="contentConfig" ref="pc" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageContent } from '@/components/PageContent'
import { PageSearch } from '@/components/PageSearch'
import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
import { pc, search, reset } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'user',
  setup() {
    // const { pc, search, reset } = usePageSearch()
    return { searchConfig, contentConfig, pc, search, reset }
  },
  components: {
    PageSearch,
    PageContent
  }
})
</script>

<style lang="less" scoped></style>
