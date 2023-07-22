<template>
    <el-card>
        <Category :scene="scene"></Category>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <div v-show="scene==0">
            <el-button type="primary" size="default" icon="Plus" @click=""
            :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
        <el-table border style="margin: 10px 0px;" :data="records">
            <el-table-column type="index" label="序号" width="80px" align="center">
            </el-table-column>
            <el-table-column label="SPU名称" prop="spuName">
            </el-table-column>
            <el-table-column label="SPU描述" prop="description" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template #='{ row, $index }'>
                    <el-button type="primary" size="small" @click="edit(row)" icon="Edit" title="编辑spu">
                    </el-button>
                    <el-button type="primary" size="small" @click="" icon="Plus" title="添加sku">
                    </el-button><el-button type="primary" size="small" @click="" icon="View" title="查看spu">
                    </el-button><el-button type="primary" size="small" @click="" icon="Delete" title="删除spu">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            :background="true" layout="prev, pager, next, jumper,->,total, sizes" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuForm>
        <SkuForm v-show="scene==2" @changeScene="changeScene"></SkuForm>
    </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
import type { HasResponseDate, Records } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
let categoryStore = useCategoryStore()
let scene = ref(0)
let pageNo = ref(1)
let pageSize = ref(3)
let spu = ref()
let records = ref<Records>([])
let total = ref<number>(0)
watch(() =>
    categoryStore.c3Id
    , () => {
        if(!categoryStore.c3Id) return
        getHasSpu()
    })
const getHasSpu = async () => {
    let result: HasResponseDate = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (result.code == 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}  
const handleCurrentChange = () => {
    getHasSpu()
} 
const handleSizeChange = () => {
    getHasSpu() 
}
const edit = (row:any) => {
    scene.value = 1
    spu.value.initHasSpuData(row)
}
const changeScene = (obj:any) => {
    scene.value = obj
}

</script>

<style scoped></style>