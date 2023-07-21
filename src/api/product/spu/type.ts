export interface ResopnseDate {
    code: number,
    message: string,
    ok: boolean
}
export interface SpuDate {
    id?: number,
    createTime: string,
    updateTime: string,
    spuName: string,
    description: string,
    category3Id: number,
    tmId: number,
    spuSaleAttrList: null,
    spuImageList: null,
    spuPosterList: null
}
export type Records = SpuDate[]
export interface HasResponseDate extends ResopnseDate {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number,
    }
}