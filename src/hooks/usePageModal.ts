import { ref } from 'vue'
import { PageModal } from '@/components/PageModal'

export const usePageModal = (
  pageCreateCal: () => void,
  pageUpdateCal: () => void
) => {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  const createItem = () => {
    modalRef.value?.OpenTheModal({ title: '增加一条数据' })
    pageCreateCal && pageCreateCal()
  }
  const updateItem = (sthTobeChange: any) => {
    modalRef.value?.OpenTheModal({ sthTobeChange, title: '更新此条数据' })
    pageUpdateCal && pageUpdateCal()
  }
  return { modalRef, createItem, updateItem }
}
