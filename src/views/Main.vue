<template>
  <div class="main">
    <SingleUpdaterUrlVer />
    <!-- <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @changeMenuWidth="changeMenuWidth" />
        </el-header>
        <el-main class="page-content">
          <div class="page-content-bg">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { NavMenu } from 'components/NavMenu'
// import { NavHeader } from 'components/NavHeader'
// import Multi from './multi/index.vue'
// import SingleUpdater from './singleUpdater/index.vue'
import SingleUpdaterUrlVer from './singleUpdaterUrlVer/index.vue'
export default defineComponent({
  setup() {
    const isCollapse = ref(false)

    const changeMenuWidth = () => {
      isCollapse.value = !isCollapse.value
    }
    return { isCollapse, changeMenuWidth }
  },
  components: {
    // NavMenu,
    // NavHeader
    // Multi,
    // SingleUpdater,
    SingleUpdaterUrlVer
    // Updater
  }
})
</script>
<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-content-bg {
    background-color: #fff;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none;
  /* firefox */
  -ms-overflow-style: none;
  /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
