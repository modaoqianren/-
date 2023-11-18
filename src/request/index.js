import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { successAlert, errorAlert } from '../utils/alert'
import store from '../store'
import router from '../router'

// 环境
if(process.env.NODE_ENV === 'development'){
    Vue.prototype.$pre = 'http://localhost:3000'
}

if(process.env.NODE_ENV === 'production'){
    Vue.prototype.$pre = ''
}

// 请求拦截器
axios.interceptors.request.use((config) => {
    // 访问除登陆外所有均需要token
    if(config.url != '/api/userlogin'){
        config.headers.authorization = store.state.user.token
    }
    return config
})

// 响应拦截器
axios.interceptors.response.use((res) => {
    console.log(res);
    if(res.data.code != 200){
        errorAlert(res.data.msg)
    }
    // 掉线统一处理
    if(res.data.msg == '登录已过期或访问权限受限'){
        errorAlert(res.data.msg);
        router.push('/login')
    }
    return res
})

// get请求，url：路径，params：参数
export const get = (url, params = {}) => axios.get(url, { params })

// post请求，url：路径，params：参数，isFile：是否为文件
export const post = (url, params = {}, isFile = false) => {
    let data = null
    if(isFile){
        data = new FormData()
        for(let k in params){
            data.append(k, params[k])
        }
    } else {
        data = qs.stringify(params)
    }
    return axios.post(url, data)
}