<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
    <h2>{{ $store.state.counter }}</h2>
  </div>
  <router-view />
</template>

<style lang="less"></style>
