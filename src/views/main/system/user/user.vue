<template>
  <div class="user">
    <div class="search">
      <XForm :FormData="FormData" />
    </div>
    <div class="content">content</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { XForm, IFormItem } from '@/base-ui/form'
export default defineComponent({
  name: 'user',
  setup() {
    const FormData: IFormItem[] = [
      {
        label: 'id',
        placeholder: '请输入id',
        type: 'input'
      },
      {
        label: '用户名',
        placeholder: '请输入用户名',
        type: 'input'
      },
      {
        label: '密码',
        placeholder: '请输入密码',
        type: 'password'
      },
      {
        label: '喜欢的运动',
        placeholder: '请选择喜欢的运动',
        type: 'select',
        options: [
          { label: '篮球', value: 'basketball' },
          { label: '足球', value: 'football' },
          { label: '乒乓球', value: 'pingpong' }
        ]
      },
      {
        label: '创建时间',
        placeholder: '请选择创建时间的范围',
        type: 'datepicker',
        otherOptions: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'daterange'
        }
      }
    ]
    return {
      FormData
    }
  },
  components: {
    XForm
  }
})
</script>

<style scoped></style>
