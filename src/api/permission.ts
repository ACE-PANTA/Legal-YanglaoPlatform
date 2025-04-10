import request from '@/utils/request';
import baseUrl from "@/utils/baseUrl"

export const checkGivePermissionEnabled = (data:Object) =>{
    return request({
        url: baseUrl + '/StaffPermissions/CheckSuperiorPermission',
        method: 'post',
        data: data
    })
}