import request from "@/utils/request";
import {PermissionResponseData} from './type'
enum API{
    ALLPERMISSION_URL = '/admin/acl/permission'
}
export const reqAllPermission = () => request.get<any,PermissionResponseData>(API.ALLPERMISSION_URL)