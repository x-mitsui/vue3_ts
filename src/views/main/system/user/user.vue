<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" />
    <PageContent :contentConfig="contentConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageContent } from '@/components/PageContent'
import { PageSearch } from '@/components/PageSearch'
import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
export default defineComponent({
  name: 'user',
  setup() {
    return { searchConfig, contentConfig }
  },
  components: {
    PageSearch,
    PageContent
  }
})
</script>

<style lang="less" scoped></style>
