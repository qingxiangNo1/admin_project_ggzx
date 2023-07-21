import request  from "@/utils/request";
import { HasResponseDate } from "./type";
enum API  {
    HASSPU_URL = '/admin/product/',
}
export const reqHasSpu = (page:number,limit:number,category3Id:number|string) => request.get<any,HasResponseDate>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)