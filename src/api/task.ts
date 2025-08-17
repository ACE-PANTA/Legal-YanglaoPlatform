import request from '@/utils/request';
import baseUrl from "@/utils/baseUrl"

// 添加家庭探访任务
export function addFamilyTask(data: {
    TaskName: string,
    TaskDescription: string,
    ExecutorId: string | number,
    ListFamilyId: (string | number)[],
    StarTime: string,
    EndTime: string
}) {
    return request({
        url: baseUrl + '/Task/AddFamilyTask',
        method: 'post',
        data
    });
}

// 获取家庭探访任务列表
export function getFamilyTask(params?: any) {
    return request({
        url: baseUrl + '/Task/GetFamilyTask',
        method: 'get',
        params
    });
}