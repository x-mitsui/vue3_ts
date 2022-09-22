<template>
  <div class="role">
    <PageSearch :searchConfig="searchConfig" />
    <PageContent :contentConfig="contentConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
export default defineComponent({
  name: 'role',
  setup() {
    return { searchConfig, contentConfig }
  }
})
</script>

<style lang="less" scoped></style>
