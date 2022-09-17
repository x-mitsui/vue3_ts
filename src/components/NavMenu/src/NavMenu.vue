<template>
  <div class="nav-menu-wrapper">
    <div class="logo-wrapper">
      <img src="~@/assets/img/logo.svg" alt="logo" class="logo" />
      <h2 class="title" v-show="!collapse">Vue3+TS</h2>
    </div>

    <el-menu
      default-active="2"
      class="el-aside"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#fff"
      :collapse="collapse"
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
            @click="showRouterView(item.url)"
            >{{ item.name }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item
          v-else
          :key="menu.id + menu.name"
          :index="menu.id + ''"
          @click="showRouterView(menu.url)"
        >
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
import { useRouter } from 'vue-router'
export default defineComponent({
  props: ['collapse'],
  setup() {
    const store = useStore()
    const router = useRouter()
    const userMenus = computed(() => store.state.LoginModule.userMenus)
    const cut = elIcon2camel
    const showRouterView = (url: string) => {
      router.push(url ?? '/notfoundzzz')
    }

    return { userMenus, cut, showRouterView }
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
  .el-menu {
    border-right: none;
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
