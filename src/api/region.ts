import request from '@/utils/request'
import baseUrl from "@/utils/baseUrl"

// 区域管理接口
export const enrollRegion = (data: {
  regionCode: number
  regionName: string
  fatherId: number
  level: number
}) => {
  return request({
    url: baseUrl + '/Region/EnrollRegion',
    method: 'post',
    data
  })
}

export const deleteRegion = (regionCode: number) => {
  return request({
    url: baseUrl + '/Region/DeleteRegion',
    method: 'get',
    params: { regionCode }
  })
}

// export const getRegionTree = () => {
//   return request({
//     url: baseUrl + '/Region/GetRegionTree',
//     method: 'get'
//   })
// }

// 保留原有的权限相关接口
interface RegionPermission {
    StaffUid: number
    Province: number
    Municipality: number
    District: number
    TownshipStreets: number
}

export const denyRegionRequest = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/RejectPermissionRequest',
        method: 'post',
        data
    })
}

export const confirmRegionRequest = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/ApprovePermissionRequest',
        method: 'post',
        data
        
    })
}

export const getCheckedPermission = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/GetReviewedPermissionRequests',
        method: 'get',
        data
        
    })
}

export const getPermissionToBeChecked = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/GetPendingPermissionRequests',
        method: 'get',
        data
        
    })
}

export const staffTryToDeleteStreetRegion = (data: Object) =>{
    return request({
        url: baseUrl+'/StaffPermissions/ApplyDeleteTownshipPermission',
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

export const getPermissionTree = (data: object) =>{
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

// 新增：更新地区接口
export const updateForRegion = (data: {
  uid: number
  regionCode?: number
  regionName?: string
  fatherId?: number
  level?: number
}) => {
  return request({
    url: baseUrl + '/Region/UpdateForRegion',
    method: 'post',
    data
  })
}

/**
 * 根据父ID获取子地区列表
 */
export function getRegionsByFatherId(fatherId) {
    return request({
        url: baseUrl+'/Region/GetRegionsByFatherId',
        method: 'get',
        params: { fatherId } // 参数名必须为 fatherId
    });
}