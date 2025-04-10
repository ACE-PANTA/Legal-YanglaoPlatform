import axios from "axios"
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Names } from './env-name'//枚举
import { errorCodeType } from './errorcode'//请求错误代码
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'


// console.log(import.meta.env.VITE_HTTP)
const service = axios.create({
    //请求头
    headers: {
    },
    //超时
    timeout: 1000 * Names.TIME,
})




//请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (localStorage.getItem('Authorization') != null && localStorage.getItem('Authorization') != "") {
        config.headers.Authorization = localStorage.getItem('Authorization') as string;
        config.headers.Username = localStorage.getItem('UserName') as string;
        config.headers.Uid = localStorage.getItem('Uid') as string;
        config.headers.Userrole = localStorage.getItem('UserRole') as string;
    }
    return config
}, (error: AxiosError) => {
    console.log(error, 'e')
})

//响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    const code = response.status;
    if (code == 401) {
        console.log("登录过期，请重新登录")
        ElMessage.error({
            message: '登录过期，请重新登录',
            duration: 2000, // 显示时间为3秒
        })
        localStorage.clear()
        //跳转到登录页面
        window.location.href = '/login'
    }
    else if (code == 200) {
        if(response.data.code == 401){
            console.log("登录过期，请重新登录")
            ElMessage.error({
                message: '登录过期，请重新登录',
                duration: 2000, // 显示时间为3秒
            })
            localStorage.clear()
            //跳转到登录页面
            window.location.href = '/login'
            
        }
        if (response.data.token != null && response.data.token != "") {
            localStorage.setItem('Authorization', response.data.token)
            localStorage.setItem('UserName', response.data.loginuser.userName)
            localStorage.setItem('Uid', response.data.loginuser.uid)
            if (response.data.loginuser.role == '1') {
                localStorage.setItem('UserRole', 'Staff');
            }
            else if (response.data.loginuser.role == '2') {
                localStorage.setItem('UserRole', 'Volunteer');
            }
            else if (response.data.loginuser.role == '88') {
                localStorage.setItem('UserRole', "SuperAdmin");
            }
            else if (response.data.loginuser.role == '0'){
                localStorage.setItem('UserRole', "Manager");
            }
        }
        return Promise.resolve(response)
    }
    else {
        const msg = errorCodeType(code)
        console.log(msg);
        return Promise.reject(msg)
    }
    // return config;
}, (error) => {
    if (error.status == 401) {
        console.log("登录过期，请重新登录")
        ElMessage.error({
            message: '登录过期，请重新登录',
            duration: 2000,
        })
        localStorage.clear()
        //跳转到登录页面
        window.location.href = '/login'
    }
    return Promise.reject(error)
})
export default service