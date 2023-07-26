export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
export interface User{
    id?: number,
    createTime?: string,
    updateTime?: string,
    username?: string,
    password?: string,
    name?: string,
    phone?: null,
    roleName?: string,
}
export type Records = User[]
export interface UserResponseData extends ResponseData{
    data:{
        records:Records,
        total: number,
        size: number,
        current: number,
        orders: [],
        pages: number
    }
}