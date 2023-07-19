<template>
    <div>
        <el-card>
            <Category></Category>
        </el-card>
        <el-card>
            <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id">添加属性</el-button>
            <el-table border stripe :data="attrArr">
                <el-table-column label='序号' type="index" width="80px" align="center" />
                <el-table-column label="属性名称" width="200px" align="center" prop="attrName">
                </el-table-column>
                <el-table-column label="属性值名称" align="center">
                    <template #='{row,$index}'>
                        <el-tag class="ml-2" style="margin: 0px 5px;" type="success" v-for="(item, index) in row.attrValueList" :key="index">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px" align="center">
                    <template #='{row,$index}'>
                        <el-button type="success" size="small" icon="Edit"></el-button>
                        <el-button type="danger" size="small" icon="Delete"></el-button>
                        
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>

<script setup lang="ts">
import {watch,ref} from 'vue'
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category';
import {reqAttr} from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
watch(() => categoryStore.c3Id,() => {
     getAttr();
})
const getAttr = async() => {
    //获取c1 c2 c3 id
    const {c1Id,c2Id,c3Id} = categoryStore
    let result:AttrResponseData = await reqAttr(c1Id,c2Id,c3Id)
    if(result.code==200){
        attrArr.value = result.data
    
    }
}
</script>

<style scoped></style>