import request from '@/utils/request'
import baseUrl from "@/utils/baseUrl"

interface RegionPermission {
    StaffUid: number
    Province: number
    Municipality: number
    District: number
    TownshipStreets: number
}

export const setStaffRegion = (data: object) => {
    return request({
        url: baseUrl+'/StaffPermissions/StaffRegionPermission',
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

export const deleteStaffRegion = (uid: string) => {
    return request({
        url: baseUrl + '/StaffPermissions/DeleteStaffPermission',
        method: 'get',
        params: { uid }
    })
}
