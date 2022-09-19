<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="path of $route.path.split('/')" :key="path">
      {{ path }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts"></script>

<style scoped></style>
