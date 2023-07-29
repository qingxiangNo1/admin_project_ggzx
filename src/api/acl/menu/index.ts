import request from "@/utils/request";
import {PermissionResponseData,MenuParams} from './type'
enum API{
    ALLPERMISSION_URL = '/admin/acl/permission',
    ADDMENU_URL = '/admin/acl/permission/save',
    UPDATEMENU_URL = '/admin/acl/permission/update'
}
export const reqAllPermission = () => request.get<any,PermissionResponseData>(API.ALLPERMISSION_URL)
export const reqAddOrUpdataMenu = (data:MenuParams) => {
    if (data.id) {
        return request.put<any,any>(API.UPDATEMENU_URL,data)
    } else {
        return request.post<any,any>(API.ADDMENU_URL,data)
    }
}