export const rules = {
  account: [{ required: true, message: '账号是必传内容', trigger: 'blur' }],
  password: [
    { required: true, message: '密码是必传内容', trigger: 'blur' },
    {
      pattern: /^[A-z0-9]{5,}$/,
      message: '密码必须是5个以上数字或字母',
      trigger: 'blur'
    }
  ]
}
