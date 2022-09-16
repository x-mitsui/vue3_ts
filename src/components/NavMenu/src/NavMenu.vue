<template>
  <div class="nav-menu-wrapper">
    <img src="~@/assets/img/logo.svg" alt="logo" class="logo" />
    <h2 class="title">Vue3+TS</h2>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.nav-menu-wrapper {
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
</style>
