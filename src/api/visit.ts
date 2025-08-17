import request from "@/utils/request";
import baseUrl from "@/utils/baseUrl";

export function getFamilyVisitRecord(data: any) {
  return request({
    url: baseUrl + "/Visit/SelectVisitRecord", //连接
    method: "post", //请求方法
    data,
  });
}

export function exportVisitRecord(params: { Begin: string; End: string }) {
  return request({
    url: baseUrl + "/Export/GetCheckExcel",
    method: "get",
    params,
    responseType: "blob",
  });
}

export function exportStaffVisitRecord(params) {
  return request({
    url: baseUrl + "/Export/GetStaffVisitExcel",
    method: "get",
    params,
    responseType: "blob",
  });
}

export function exportFamilyExcel(conditions: any) {
  return request({
    url: baseUrl + "/Export/SearchForFamilyExcel",
    method: "post",
    data: { Conditions: conditions },
    responseType: "blob",
  });
}

export function exportPeopleExcel(conditions: any) {
  return request({
    url: baseUrl + "/Export/ExportAdultExcel",
    method: "post",
    data: { Conditions: conditions },
    responseType: "blob",
  });
}

export function exportChildExcel(conditions: any) {
  return request({
    url: baseUrl + "/Export/ExportChildGrandExcel",
    method: "post",
    data: { Conditions: conditions },
    responseType: "blob",
  });
}



