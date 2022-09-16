<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/LoginPanel.vue'

export default defineComponent({
  // setup() {},
  components: { LoginPanel }
})
</script>

<style lang="less" scoped>
.login {
  background: url('../../assets/img/login-bg.svg');
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateY(-120px);
}
</style>
