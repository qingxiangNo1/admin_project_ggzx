import request from "@/utils/request";
import type { SkuResponseData,SkuInfoData } from "./type";
enum API{
    SKU_URL='/admin/product/list/',
    SALE_URL='/admin/product/onSale/',
    CANCELSALE_URL='/admin/product/cancelSale/',
    SKUINFO_URL='/admin/product/getSkuInfo/'
}
export const reqSkuList = (page:number,limit:number) => request.get<any,SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
export const reqSaleSku = (skuid:number) => request.get<any,any>(API.SALE_URL + `${skuid}`)
export const reqCancelSale = (skuid:number) => request.get<any,any>(API.CANCELSALE_URL + `${skuid}`)
export const reqSalInfo = (skuid:number) => request.get<any,SkuInfoData>(API.SKUINFO_URL + `${skuid}`)