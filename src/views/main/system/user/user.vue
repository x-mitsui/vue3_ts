<template>
  <div class="user">
    <div class="search">
      <XForm :="formInfo" v-model="FormValues" />
    </div>
    <div class="content">content</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { XForm } from '@/base-ui/form'
import { formInfo } from './configs/formInfo'
export default defineComponent({
  name: 'user',
  setup() {
    const FormValues = ref({
      id: '',
      username: '',
      password: '',
      hobby: '',
      time: ''
    })
    return { formInfo, FormValues }
  },
  components: {
    XForm
  }
})
</script>

<style scoped></style>
