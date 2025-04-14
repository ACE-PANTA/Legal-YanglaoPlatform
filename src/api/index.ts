import request from "@/utils/request"
import baseUrl from "@/utils/baseUrl"
import axios from "axios"
import { Names } from "@/utils/env-name"

//刷新令牌
export function RefreshToken() {
    const service = axios.create({
    //请求头
        headers: {
            Authorization: localStorage.getItem('Authorization'),
            Username: localStorage.getItem('UserName'),
            Uid: localStorage.getItem('Uid'),
            Userrole: localStorage.getItem('UserRole'),
        },
        //超时
        timeout: 1000 * Names.TIME,
    })
    return service({
        url: baseUrl + '/User/RefreshToken',//连接
        method: 'post',//请求方法
    })
}


export function AddVolunteer(data: any) {
    return request({
        url: baseUrl + '/Volunteer/EnrollVolunteer',//连接
        method: 'post',//请求方法
        data: data
    })
}
export function GetVolunteerList() {
    return request({
        url: baseUrl + '/ManageVolunteer/GetVolunteerList',//连接
        method: 'get',//请求方法
    })
}
//删除志愿者
export function DeleteVolunteer(uid: string) {
    return request({
        url: baseUrl + '/ManageVolunteer/DeleteVolunteer',//连接
        method: 'get',//请求方法
        params: {
            id: uid
        }
    })
}
//更新志愿者信息
export function UpdateVolunteer(itemInfo:any) {
    return request({
        url: baseUrl + '/Volunteer/UpdateVolunteer',//连接
        method: 'post',//请求方法
        data: itemInfo
    })
}

//获取单个志愿者信息
export function GetVolunteer(uid: string) {
    return request({
        url: baseUrl + '/Volunteer/GetVolunteerDetail',//连接
        method: 'get',//请求方法
        params: {
            id: uid
        }
    })
}

//获取单个职工信息
export function GetStaff(uid: string) {
    return request({
        url: baseUrl + '/Staff/GetStaffDetail',//连接
        method: 'get',//请求方法
        params: {
            id: uid
        }
    })
}

//添加职工
export function AddStaff(data: any) {
    return request({
        url: baseUrl + '/Staff/EnrollStaff',//连接
        method: 'post',//请求方法
        data: data
    })
}
//更新职工信息
export function UpdateStaff(data: any) {
    return request({
        url: baseUrl + '/Staff/UpdateStaff',//连接
        method: 'post',//请求方法
        data: data
    })
}

//超级管理员更新职工信息
export function SuperUpdateStaff(data: any) {
    return request({
        url: baseUrl + '/Staff/UpdateStaffForAll',//连接
        method: 'post',//请求方法
        data: data
    })
}

//更新职工密码
export function UpdateStaffPassword(data: any) {
    return request({
        url: baseUrl + '/Staff/UpdatePassword',//连接
        method: 'post',//请求方法
        data: data
    })
}

//获取职工列表
export function GetStaffList(data:object) {
    return request({
        url: baseUrl + '/Staff/GetStaffList',//连接
        method: 'post',//请求方法
        data
    })
}

//获取探访列表
export function GetVisitList() {
    return request({
        url: baseUrl + '/Visit/GetVisitDetailList',//连接
        method: 'get',//请求方法
    })
}

//添加探访记录
export function AddVisit(data: any) {
    return request({
        url: baseUrl + '/Visit/EnrollVisit',//连接
        method: 'post',//请求方法
        data: data
    })
}

//删除探访记录
export function DeleteVisit(id: string) {
    return request({
        url: baseUrl + '/Visit/DeleteVisit',//连接
        method: 'get',//请求方法
        params: {
            id: id
        }
    })
}

//更新探访记录
export function UpdateVisit(data: any) {
    return request({
        url: baseUrl + '/Visit/UpdateVisit',//连接
        method: 'post',//请求方法
        data: data
    })
} 

//获取活动列表
export function GetActivityList() {
    return request({
        url: baseUrl + '/Activity/GetActivityList',//连接
        method: 'get',//请求方法
    })
}

//添加活动
export function AddActivity(data: any) {
    return request({
        url: baseUrl + '/Activity/EnrollActivity',//连接
        method: 'post',//请求方法
        data: data
    })
}   

//更新活动信息
export function UpdateActivity(data: any) {
    return request({
        url: baseUrl + '/Activity/UpdateActivity',//连接
        method: 'post',//请求方法
        data: data
    })
}   

//删除活动
export function DeleteActivity(id: string) {
    return request({
        url: baseUrl + '/Activity/DeleteActivity',//连接
        method: 'get',//请求方法
        params: {
            id: id
        }
    })
}   

//添加任务
export function AddTask(data: any) {
    return request({
        url: baseUrl + '/Task/EnrollMonthlyWork',//连接
        method: 'post',//请求方法
        data: data
    })
}

//删除任务
export function DeleteTask(id: string) {
    return request({
        url: baseUrl + '/Task/DeleteMonthlyWork',//连接
        method: 'get',//请求方法
        params: {
            id: id
        }
    })
}

//修改任务
export function UpdateTask(data: any) {
    return request({
        url: baseUrl + '/Task/UpdateMonthlyWork',//连接
        method: 'post',//请求方法
        data: data
    })
}  

//获取任务列表
export function GetTaskList() {
    return request({
        url: baseUrl + '/Task/GetMonthlyWorkDetail',//连接
        method: 'get',//请求方法
    })
}



//通过id查找家庭
export function GetFamily(id: string) {
    return request({
        url: baseUrl + '/Family/GetFamilyDetail',//连接
        method: 'get',//请求方法
        params: {
            id: id
        }
    })
}

//模糊匹配家庭
export function SearchFamily(data: any) {
    return request({
        url: baseUrl + '/Family/SearchFamilies',//连接
        method: 'post',//请求方法
        data: data
    })
}

//上传文件接口
export function UploadFile(data: any) {
    return request({
        url: baseUrl + '/File/UploadFile',//连接
        method: 'post',//请求方法
        data: data
    })
}

//全字段模糊查询志愿者信息
export function SearchVolunteer(data: any) {
    return request({
        url: baseUrl + '/Volunteer/SearchStaff',//连接
        method: 'post',//请求方法
        data: data
    })
}

//全字段模糊查询职工信息
export function SearchStaff(data: any) {
    return request({
        url: baseUrl + '/Staff/SearchStaff',//连接
        method: 'post',//请求方法
        data: data
    })
}

