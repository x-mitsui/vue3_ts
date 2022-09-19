<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { XForm } from '@/base-ui/form'

const FormValues = ref({
  id: '',
  username: '',
  password: '',
  hobby: '',
  time: ''
})
defineProps({
  formInfo: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="page-search">
    <div class="search">
      <XForm :="formInfo" v-model="FormValues">
        <template #header>
          <h2 class="title">高级检索</h2>
        </template>
        <template v-slot:footer>
          <div class="footer">
            <el-button icon="Refresh" type="primary">重置</el-button>
            <el-button icon="Search" type="primary">搜索</el-button>
          </div>
        </template>
      </XForm>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-search {
  .title {
    color: red;
    line-height: 2.5em;
  }

  .footer {
    text-align: right;
    padding-right: 18px;
    padding-bottom: 18px;
  }
}
</style>
