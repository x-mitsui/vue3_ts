import { IForm } from '@/base-ui/form'

export const searchConfig: IForm = {
  FormData: [
    {
      field: 'id',
      type: 'input',
      label: '序号',
      placeholder: '请输入产品序号'
    },
    {
      field: 'name',
      type: 'input',
      label: '产品名称',
      placeholder: '请输入产品名称'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
