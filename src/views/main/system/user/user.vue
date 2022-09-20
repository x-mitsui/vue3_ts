<template>
  <div class="user">
    <PageSearch :formInfo="searchConfig" />
    <PageContent :contentConfig="contentConfig" :usersList="usersList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from '@/store'
import { PageContent } from '@/components/PageContent'
import { PageSearch } from '@/components/PageSearch'
import { searchConfig } from './configs/search.config'
import { contentConfig } from './configs/content.config'
export default defineComponent({
  name: 'user',
  setup() {
    const store = useStore()
    const usersList = computed(() => store.state.system.usersList)
    const userCountRef = computed(() => store.state.system.usersCount)

    onMounted(() => {
      store.dispatch('system/getUsersAction', {
        offset: 0,
        size: 10
        // name: 'w',
        // cellphone: 4
      })
    })

    return { searchConfig, usersList, userCountRef, contentConfig }
  },
  components: {
    PageSearch,
    PageContent
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
.operate {
  display: flex;
  justify-content: center;
  .el-button {
    padding: 0;
  }
}
</style>
