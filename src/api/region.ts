import request from '@/utils/request'
import baseUrl from "@/utils/baseUrl"

interface RegionPermission {
    StaffUid: number
    Province: number
    Municipality: number
    District: number
    TownshipStreets: number
}

export const denyRegionDelete = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/RejectDeleteTownshipPermission',
        method: 'post',
        data
        
    })
}

export const confirmRegionDelete = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/ApproveDeleteTownshipPermission',
        method: 'post',
        data
        
    })
}

export const getCheckedPermission = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/GetPermissionReportAudited',
        method: 'get',
        data
        
    })
}

export const getPermissionToBeDeleted = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/GetPermissionToBeDeleted',
        method: 'get',
        data
        
    })
}

export const staffTryToDeleteStreetRegion = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/RequestDeleteTownshipPermission',
        method: 'post',
        data
        
    })
}

export const managerDeleteStreetsRegion = (data: any) =>{
    return request({
        url: baseUrl+'/StaffPermissions/DeleteDistrictPermission',
        method: 'get',
        params:{permissionUid:data}
        
    })
}

export const superadminDeleteRegion = (data: any) =>{
    return request({
        url: baseUrl+'/StaffPermissions/DeleteProvinceOrMunicipalityPermission',
        method: 'get',
        params:{permissionUid:data}
        
    })
}

export const getRegionTree = (data: object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/GetPermissionTree',
        method: 'get',
        data
    })
}

export const setStaffRegion = (data: object) => {
    return request({
        url: baseUrl+'/StaffPermissions/StaffRegionPermission',
        method: 'post',
        data
    })
}

export const setStaffRegionByManager = (data: object) => {
    return request({
        url: baseUrl+'/StaffPermissions/ManagerSetPermission',
        method: 'post',
        data
    })
}

export const setStaffRegionByStaff = (data: object) => {
    return request({
        url: baseUrl+'/StaffPermissions/StaffSetPermission',
        method: 'post',
        data
    })
}

export const getStaffRegion = (data: object) => {
    return request({
        url: baseUrl+'/StaffPermissions/GetStaffPermission',
        method: 'get',
        params:{uid:data}
    })
}

// 添加区域列表接口
interface RegionDetail {
    uid: string
    staffUid: string
    provinceId: number
    provinceName: string
    municipalityId: number
    municipalityName: string
    districtId: number
    districtName: string
    townshipStreetsId: number
    townshipStreetsName: string
}

export const getStaffRegionList = (staffUid: string) => {
    return request({
        url: baseUrl + '/StaffPermissions/GetStaffPermission',
        method: 'get',
        params: { uid:staffUid }
    })
}
