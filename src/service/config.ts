import axios from 'axios'

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000 //10s
// 配置了全局baseURL后，可以直接使用'/get'
let BASE_URL: string
const TIMEOUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8080'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8000'
} else {
  BASE_URL = 'http://localhost:8000'
}
export { BASE_URL, TIMEOUT }
