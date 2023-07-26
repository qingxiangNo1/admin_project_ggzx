import request from "@/utils/request";
import {UserResponseData} from './type'
enum API{
    ALLUSER_URL = '/admin/acl/user/'
}
export const reqUserInfo = (page:number,limit:number)  => request.get<any,UserResponseData>(API.ALLUSER_URL+`${page}/${limit}`)