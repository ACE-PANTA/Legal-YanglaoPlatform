import request from '@/utils/request';
import baseUrl from "@/utils/baseUrl"

export function addNewTask(data: any) {
    return request({
        url: baseUrl + '/Task/AddFamilyTask',//连接
        method: 'post',//请求方法
        data
    })
}