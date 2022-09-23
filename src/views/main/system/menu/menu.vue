<template>
  <div class="menu">
    <PageContent :contentConfig="contentConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentConfig } from './configs/content.config'
export default defineComponent({
  name: 'meNu',
  setup() {
    return { contentConfig }
  }
})
</script>

<style scoped></style>
