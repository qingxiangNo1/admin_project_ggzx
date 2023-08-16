<template>
    <div>
        <el-form ref="form" label-width="80px" :inline="true" size="normal" :disabled="scene==1?true:false">
            <el-form-item label="一级分类" size="normal">
                <el-select v-model="categoryStore.c1Id" @change="handler1">
                    <el-option v-for="(c1) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" size="normal">
                <el-select v-model="categoryStore.c2Id"  @change="handler2">
                    <el-option v-for="(c2) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"> </el-option>
                    
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" size="normal">
                <el-select v-model="categoryStore.c3Id">
                    <el-option v-for="(c3) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"> </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import useCategoryStore from '@/store/modules/category'
defineProps(['scene'])
let categoryStore = useCategoryStore()
 onMounted(() => {
    getC1(); })
//通知仓库获取一级分类的方法
const getC1 = () => {
    //通知分类仓库发请求获取一级分类的数据
    categoryStore.getC1();
}
const handler1 = () => {
    //清除2级分类和三级分类数据
    categoryStore.c2Id = '';
    categoryStore.c3Id = '';
    categoryStore.c3Arr = [];
     //通知分类仓库发请求获取二级分类的数据
    categoryStore.getC2();
}
const handler2 = () => {  
    //清除2级分类和三级分类数据
    categoryStore.c3Id = ''
     //通知分类仓库发请求获取三级分类的数据
    categoryStore.getC3();
}



</script>

<style scoped></style>