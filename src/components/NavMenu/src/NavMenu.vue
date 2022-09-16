<template>
  <div class="nav-menu-wrapper">
    <div class="logo-wrapper">
      <img src="~@/assets/img/logo.svg" alt="logo" class="logo" />
      <h2 class="title">Vue3+TS</h2>
    </div>

    <el-menu
      default-active="2"
      class="el-aside"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#fff"
    >
      <template v-for="menu of userMenus">
        <el-sub-menu
          v-if="menu.children.length > 0"
          :key="menu.id"
          :index="menu.id + ''"
        >
          <template #title>
            <el-icon><component :is="cut(menu.icon)" /></el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="item of menu.children"
            :key="item.id"
            :index="item.id + ''"
            >{{ item.name }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item v-else :key="menu.id + menu.name" :index="menu.id + ''">
          {{ menu.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { elIcon2camel } from '@/utils/elIcon2camel'
export default defineComponent({
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.LoginModule.userMenus)
    const cut = elIcon2camel
    return { userMenus, cut }
  }
})
</script>

<style lang="less" scoped>
.nav-menu-wrapper {
  .logo-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 30px;
    padding: 5px;
    .logo {
      width: 30px;
    }
    .title {
      color: white;
    }
  }
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
