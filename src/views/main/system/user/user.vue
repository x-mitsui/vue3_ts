<template>
  <div class="user">
    <PageSearch :formInfo="formInfo" />
    <div class="content">content</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formInfo } from './configs/formInfo'
import { PageSearch } from '@/components/PageSearch'
export default defineComponent({
  name: 'user',
  setup() {
    return { formInfo }
  },
  components: {
    PageSearch
  }
})
</script>

<style lang="less" scoped>
.title {
  color: red;
  line-height: 2.5em;
}

.footer {
  text-align: right;
  padding-right: 18px;
}
</style>
