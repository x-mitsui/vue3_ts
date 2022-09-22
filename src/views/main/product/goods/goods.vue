<template>
  <div class="goods">
    <PageSearch :searchConfig="searchConfig" @search="search" @reset="reset" />
    <PageContent :contentConfig="contentConfig" ref="pc">
      <template #price="{ info }">
        {{ '￥' + info }}
      </template>
      <template #showImage="{ info }">
        <el-image
          fit="cover"
          loading="lazy"
          :preview-src-list="[info]"
          :src="info"
          :z-index="999"
          hide-on-click-modal
          preview-teleported
        />
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
import { pc, search, reset } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'goods',
  setup() {
    return { searchConfig, contentConfig, pc, search, reset }
  }
})
</script>

<style scoped></style>
