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
                PageIndex: data.pagenumber,
                PageSize: data.pageSize,
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

// 查询临时人员信息
export function GetTempFamilyInfo(data: any) {
    return request({
        url: baseUrl + '/TempData/SearchTempFamilyInfo', // 注意url前缀
        method: 'post',
        data:data
    })
}

export function UpdateRegionInfo(data: any) {
    return request({
        url: baseUrl + '/Family/UpdateRegion', // 注意url前缀
        method: 'post',
        data:data
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

export const getPicture = (photoKey:string) => {
    return request({
        url: baseUrl+`/Family/GetHouseHoldSpousePhoto`,
        method: 'get',
        params: { photoKey: photoKey }
    });
};