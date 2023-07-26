import request from "@/utils/request";
import { UserResponseData, User,allRoleResponseData,SetRoleData } from './type'
enum API {
    ALLUSER_URL = '/admin/acl/user/',
    ADDUSER_URL = '/admin/acl/user/save',
    UPDATEUSER_URL = '/admin/acl/user/update',
    ALLROLE_URL = '/admin/acl/user/toAssign/',
    SETUSERROLE_URL = '/admin/acl/user/doAssignRole'
}
export const reqUserInfo = (page: number, limit: number) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
export const reqAddOrUpdateUserInfo = (data: User) => {
    if (data.id) {
        //修改
        return request.put(API.UPDATEUSER_URL,data)
    } else {
        //新增
        return request.post(API.ADDUSER_URL,data)
    }
}
export const reqAllRole = (adminid:number) => request.get<any,allRoleResponseData>(API.ALLROLE_URL+`${adminid}`)
export const reqSetUserRole = (data:SetRoleData) => request.post<any,any>(API.SETUSERROLE_URL,data)