import type { RouteRecordRaw } from 'vue-router'

//定义小仓库数据类型
export interface userState{
    token: string|null;
    menuRoutes:RouteRecordRaw[];
    username:string;
    avatar:string;
}