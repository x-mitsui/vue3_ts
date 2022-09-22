import { ref } from 'vue'
import { PageContent } from '@/components/PageContent'

// export const usePageSearch = () => {
const pc = ref<InstanceType<typeof PageContent> | null>(null)

const search = (queryInfo: any) => {
  pc.value?.search(queryInfo)
}
const reset = () => {
  pc.value?.search()
}
export { pc, search, reset }
// }
