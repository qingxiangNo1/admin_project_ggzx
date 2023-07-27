import request from "@/utils/request";
import {RoleResponseData,RoleData} from './type'
enum API{
    ROLEARR_URL = '/admin/acl/role/',
    SAVEROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update'
}
export const reqRoleArr = (page:number,limit:number,roleName:string) => request.get<any,RoleResponseData>(API.ROLEARR_URL+`${page}/${limit}?roleName=${roleName}`)
export const reqSaveOrUpdateRole = (data:RoleData) => {
    if(data.id){
        return request.put(API.UPDATEROLE_URL,data)
    }else{
      return request.post(API.SAVEROLE_URL,data)
    }
}