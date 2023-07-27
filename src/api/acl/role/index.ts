import request from "@/utils/request";
import {RoleResponseData} from './type'
enum API{
    ROLEARR_URL = '/admin/acl/role/'
}
export const reqRoleArr = (page:number,limit:number,roleName:string) => request.get<any,RoleResponseData>(API.ROLEARR_URL+`${page}/${limit}?roleName=${roleName}`)