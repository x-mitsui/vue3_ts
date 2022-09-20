// 定义了全局方法之后需要扩充类型，利用需要export
declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: any
    $store: any
  }
}

export {}
