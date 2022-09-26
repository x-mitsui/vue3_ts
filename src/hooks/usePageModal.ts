import { ref } from 'vue'
import { PageModal } from '@/components/PageModal'

export const usePageModal = (
  pageCreateCal: () => void,
  pageUpdateCal: () => void
) => {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  const createItem = () => {
    modalRef.value?.OpenTheModal()
    pageCreateCal && pageCreateCal()
  }
  const updateItem = (sthTobeChange: any) => {
    modalRef.value?.OpenTheModal(sthTobeChange)
    pageUpdateCal && pageUpdateCal()
  }
  return { modalRef, createItem, updateItem }
}
