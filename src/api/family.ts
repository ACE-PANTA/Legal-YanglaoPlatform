import request from '@/utils/request';
import baseUrl from "@/utils/baseUrl"

export function getFamilyDetail(data: any) {
    return request({
        url: baseUrl + '/Family/GetOneFamilyWithUid',//连接
        method: 'get',//请求方法
        params:{familyuid:data}
    })
}
//添加基本情况
export function AddBaseInfo(data: any) {
    return request({
        url: baseUrl + '/Family/EnrollFamilyInformation',//连接
        method: 'post',//请求方法
        data: data
    })
}

//删除基本情况
export function DeleteBaseInfo(id: string) {
    return request({
        url: baseUrl + '/Family/DeleteFamilyInfo',//连接
        method: 'get',//请求方法
        params: {
            familyUid: id
        }
    })
}

//修改基本情况
export function UpdateBaseInfo(data: any) {
    return request({
        url: baseUrl + '/Family/UpdateFamilyIfno',//连接
        method: 'post',//请求方法
        data: data
    })
}

//获取基本情况列表
export function GetBaseInfoList(data, userRole) {
    if (userRole === 'SuperAdmin') {
        return request({
            url: baseUrl + '/Family/GetFamilyList',
            method: 'get',
            data: data
        });
    } else if (userRole === 'Manager'||'Staff') {
        return request({
            url: baseUrl + '/Family/ManagerGetFamilyFromRegion',
            method: 'post',
            data: {
                PageIndex: data.PageIndex,
                PageSize: data.PageSize,
                HouseHoldName: data.HouseHoldName || '',
                IdentificationNumber: data.IdentificationNumber || '',
                ProvinceId: data.ProvinceId,
                MunicipalityId: data.MunicipalityId,
                DistrictId: data.DistrictId,
                TownshipStreetsId: data.TownshipStreetsId,
            }
        });
    }
}


//通过行政区划获取户主列表
export function GetFamilyListByArea(data: any) {
    return request({
        url: baseUrl + '/Family/GetHouseHoldListByAdministrativeDivision',//连接
        method: 'post',//请求方法
        data: data
    })
}

//获取户主列表
export function GetFamilyList() {
    return request({
        url: baseUrl + '/Staff/GetHouseHoldList',//连接
        method: 'get',//请求方法
    })
}

export { UpdateStaffPhoto } from './staff'

export const GetOneFamilyWithUid = (uid: string) => {
    return request({
        url: baseUrl+`/Family/GetOneFamilyWithUid`,
        method: 'get',
        params: { familyUid:uid }
    });
};