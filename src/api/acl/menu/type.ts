export interface ResponseData {
    "code": number,
    "message": string,
    ok: boolean
}
export interface PermissionData {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "pid": number,
    "name": string,
    "code": string,
    "toCode": string,
    "type": number,
    "status": null,
    "level": number,
    "children"?: PermissionList,
    "select": boolean
}
export type PermissionList = PermissionData[]
export interface PermissionResponseData extends ResponseData{
    data:PermissionList
}