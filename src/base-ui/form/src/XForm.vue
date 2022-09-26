<template>
  <div class="x-form">
    <slot name="header"></slot>
    <el-form :model="FormData" :label-width="labelWidth" class="el-form-1">
      <el-row :gutter="10">
        <el-col v-bind="colSpans" v-for="item of FormData" :key="item.label">
          <el-form-item
            :label="item.label"
            :style="itemStyle"
            v-if="
              item.isShow === undefined /*未设置则默认为true*/
                ? true
                : item.isShow
            "
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :type="item.type"
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                :="item.otherOptions"
                v-model="values[`${item.field}`]"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select :type="item.type" v-model="values[`${item.field}`]">
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
              <el-date-picker
                v-model="values[`${item.field}`]"
                :="item.otherOptions"
              >
              </el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, watch, defineEmits } from 'vue'
import { IFormItem } from '../types'
const props = defineProps({
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
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['update:modelValue'])
// 因为是解构，所以props.modelValue的再次改变不会影响这里
const values = ref({ ...props.modelValue })

watch(
  values,
  (newV) => {
    console.log('wali:', 'wali')
    emit('update:modelValue', newV)
  },
  { deep: true }
)
</script>

<style scoped>
.el-form-1 {
  /* 和el-form-item的下边距相同 */
  padding: 22px 15px 0;
}
</style>
