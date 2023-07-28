import request from "@/utils/request";
import { RoleResponseData, RoleData, MenuResponseData } from './type'
enum API {
    ROLEARR_URL = '/admin/acl/role/',
    SAVEROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
    SETPERMISSION_URL = '/admin/acl/permission/doAssign/?'

}
export const reqRoleArr = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ROLEARR_URL + `${page}/${limit}?roleName=${roleName}`)
export const reqSaveOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put(API.UPDATEROLE_URL, data)
    } else {
        return request.post(API.SAVEROLE_URL, data)
    }
}
export const reqAllMenuList = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + `${roleId}`)
export const reqSetPermisson = (roleId: number, permissionId: number[]) => request.post<any, any>(API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`)