class LocalCacheClass {
  private static instance: LocalCacheClass | null
  private constructor() {
    LocalCacheClass.instance = null
  }
  get(key: string) {
    const str = window.localStorage.getItem(key)
    return str ? JSON.parse(str) : null
  }
  set(key: string, value: unknown) {
    return window.localStorage.setItem(key, JSON.stringify(value))
  }
  clear() {
    window.localStorage.clear()
  }

  static create(): LocalCacheClass {
    if (LocalCacheClass.instance) {
      return LocalCacheClass.instance
    } else {
      LocalCacheClass.instance = new LocalCacheClass()
      return LocalCacheClass.instance
    }
  }
}
export const LocalCache = LocalCacheClass.create()
