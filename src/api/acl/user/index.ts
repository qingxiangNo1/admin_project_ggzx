import request from "@/utils/request";
import { UserResponseData, User } from './type'
enum API {
    ALLUSER_URL = '/admin/acl/user/',
    ADDUSER_URL = '/admin/acl/user/save',
    UPDATEUSER_URL = '/admin/acl/user/update'
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