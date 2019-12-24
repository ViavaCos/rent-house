import axios from 'axios'

const instance = axios.create({
    // 基准地址
    baseURL: 'http://localhost:8080'
})

// 响应拦截器
instance.interceptors.response.use(res => {
    return res.data
})

export default instance