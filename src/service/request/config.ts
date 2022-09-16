import axios from 'axios'

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000 //10s
// 配置了全局baseURL后，可以直接使用'/get'
let BASE_URL: string
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://localhost:8000'
}
export { BASE_URL, TIME_OUT }
