import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'

const useCategoryStore = defineStore('Category', {
    state: (): CategoryState => {
        return {
            //存储一级分类的数据
            c1Arr: [],
            //存储一级分类的ID
            c1Id: '',
            //存储对应一级分类下二级分类的数据
            c2Arr: [],
            //收集二级分类的ID
            c2Id: '',
            //存储三级分类的数据
            c3Arr: [],
            //存储三级分类的ID
            c3Id: '',
        }


    },
    actions: {
        async getC1() {
            //发请求获取一级分类的数据
            const result: CategoryResponseData = await reqC1()
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        },
        async getC2() {
            //发请求获取二级分类的数据
            const result: CategoryResponseData = await reqC2(this.c1Id)
            if (result.code == 200) {
                this.c2Arr = result.data
            }
        },
        async getC3() {
            //发请求获取三级分类的数据
            const result: CategoryResponseData = await reqC3(this.c2Id)
            if (result.code == 200) {
                this.c3Arr = result.data
            }
        },
    },
    getters: {}

})

export default useCategoryStore