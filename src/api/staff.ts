import request from "@/utils/request"
import baseUrl from "@/utils/baseUrl"

//列表
export function Register(data: any) {
    return request({
        url: baseUrl + '/User/RegisterUser',//连接
        method: 'post',//请求方法
        data: data
    })
}
export function Login(data: any) {
    return request({
        url: baseUrl + '/User/StaffLogin',//连接
        method: 'post',//请求方法
        data: data
    })
}

export const UpdateStaffPhoto = (data: FormData) => {
    return request({
        url: baseUrl + '/Staff/UpdateStaffPhoto',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export const getStaffPhoto = (key:string) => {
    return request({
        url: 'http://140.143.196.200:8000' + '/api/Staff/GetStaffPhoto',
        method: 'get',
        params: {photokey:key}
    })
}