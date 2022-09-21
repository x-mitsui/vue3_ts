<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" @search="search" @reset="reset" />
    <PageContent :contentConfig="contentConfig" ref="pc" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PageContent } from '@/components/PageContent'
import { PageSearch } from '@/components/PageSearch'
import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
export default defineComponent({
  name: 'user',
  setup() {
    const pc = ref<InstanceType<typeof PageContent> | null>(null)

    const search = (queryInfo: any) => {
      pc.value?.search(queryInfo)
    }
    const reset = () => {
      pc.value?.search()
    }
    return { searchConfig, contentConfig, pc, search, reset }
  },
  components: {
    PageSearch,
    PageContent
  }
})
</script>

<style lang="less" scoped></style>
