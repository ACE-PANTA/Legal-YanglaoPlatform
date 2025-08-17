import request from "@/utils/request"
import baseUrl from "@/utils/baseUrl"
import serverUrl from "@/utils/baseUrl"

export function UpdateStaff(data: any) {
    return request({
        url: baseUrl + '/Staff/UpdateStaff',//连接
        method: 'post',//请求方法
        data
    })
}

export function DeleteStaff(data: any) {
    return request({
        url: baseUrl + '/Staff/DeleteStaff',//连接
        method: 'get',//请求方法
        params:{id:data}
    })
}

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
        url: serverUrl + '/Staff/GetStaffPhoto',
        method: 'get',
        params: {photokey:key}
    })
}

export function refreshStaffPassword(StaffUid: string) {
    return request({
        url: baseUrl + '/Staff/RefreshPassword',
        method: 'post',
        data: { StaffUid }
    })
}