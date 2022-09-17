<template>
  <el-form :model="FormData" :label-width="labelWidth" class="el-form-1">
    <el-row :gutter="10">
      <el-col v-bind="colSpans" v-for="item of FormData" :key="item.label">
        <el-form-item :label="item.label" :style="itemStyle">
          <template v-if="item.type === 'input' || item.type === 'password'">
            <el-input
              :type="item.type"
              :placeholder="item.placeholder"
              :show-password="item.type === 'password'"
              :="item.otherOptions"
            />
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select :type="item.type">
              <el-option
                v-for="op of item.options"
                :key="op.value"
                :label="op.label"
                :value="op.value"
                :="item.otherOptions"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'datepicker'">
            <el-date-picker :="item.otherOptions"> </el-date-picker>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { IFormItem } from '../types'
defineProps({
  FormData: {
    type: Array as PropType<IFormItem[]>,
    default: () => [] //这里为什么一定要用箭头函数，因为要用上下文this
  },
  // 设置标签宽度
  labelWidth: {
    type: String,
    default: '120px'
  },
  // 设置所有el-form-item的统一样式，主要是调整边距
  itemStyle: {
    type: Object,
    default: () => ({
      padding: '10px 40px'
    })
  },
  colSpans: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xm: 24
    })
  }
})
</script>

<style scoped>
.el-form-1 {
  /* 和el-form-item的下边距相同 */
  padding-top: 22px;
}
</style>
