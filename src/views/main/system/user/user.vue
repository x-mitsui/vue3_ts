<template>
  <div class="user">
    <div class="search">
      <XForm :="formInfo" />
    </div>
    <div class="content">content</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { XForm } from '@/base-ui/form'
import { formInfo } from './configs/formInfo'
export default defineComponent({
  name: 'user',
  setup() {
    return { formInfo }
  },
  components: {
    XForm
  }
})
</script>

<style scoped></style>
