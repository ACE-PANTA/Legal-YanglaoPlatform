import request from '@/utils/request';
import baseUrl from "@/utils/baseUrl"

export const checkGivePermissionEnabled = (data:Object) =>{
    return request({
        url: baseUrl + '/StaffPermissions/CheckSuperiorPermission',
        method: 'post',
        data: data
    })
}

// 获取协作者列表
export const getCollaborators = (data: object) => {
    return request({
        url: baseUrl + '/Collaborator/GetCollaboratorsListByRegion',
        method: 'post',
        data
    });
};

// 添加协作者
export const addCollaborator = (data: object) => {
    return request({
        url: baseUrl + '/Collaborator/AddCollaborator',
        method: 'post',
        data
    });
};

// 删除协作者（GET，参数为id=uid）
export const removeCollaborator = (uid: string) => {
    return request({
        url: baseUrl+'/Collaborator/DeleteCollaborator',
        method: 'get',
        params: { id: uid }
    });
}

// 获取某区域协作者列表（GET）
export const getCollaboratorsListByRegion = (params: {
    ProvinceId: number,
    MunicipalityId: number,
    DistrictId: number,
    TownshipStreetsId: number
}) => {
    return request({
        url: baseUrl + '/Collaborator/GetCollaboratorsListByRegion',
        method: 'get',
        params
    });
};