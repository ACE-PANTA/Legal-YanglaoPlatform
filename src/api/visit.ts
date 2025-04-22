import request from '@/utils/request';
import baseUrl from "@/utils/baseUrl"

export function getFamilyVisitRecord(data: any) {
    return request({
        url: baseUrl + '/Visit/SelectVisitRecord',//连接
        method: 'post',//请求方法
        data
    })
}