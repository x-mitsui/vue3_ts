<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { XForm } from '@/base-ui/form'

const props = defineProps({
  searchConfig: {
    type: Object,
    required: true
  }
})
const fieldsMap: Record<string, string> = {}
props.searchConfig.FormData.forEach((item: any) => {
  fieldsMap[item.field] = ''
})
const FormValues = ref(fieldsMap)
const reset = () => {
  Object.keys(fieldsMap).forEach((field) => {
    FormValues.value[field] = ''
  })
}
</script>
<template>
  <div class="page-search">
    <div class="search">
      <XForm :="searchConfig" v-model="FormValues">
        <template #header>
          <h2 class="title">高级检索</h2>
        </template>
        <template v-slot:footer>
          <div class="footer">
            <el-button icon="Refresh" type="primary" @click="reset"
              >重置</el-button
            >
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
