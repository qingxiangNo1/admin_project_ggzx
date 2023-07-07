<template>
    <div>
        <el-form ref="form" label-width="80px" :inline="true" size="normal">
            <el-form-item label="一级分类" size="normal">
                <el-select v-model="categoryStore.c1Id">
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" size="normal">
                <el-select>
                    <el-option label="上海"> </el-option>
                    <el-option label="北京"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" size="normal">
                <el-select>
                    <el-option label="上海"> </el-option>
                    <el-option label="北京"> </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {onMounted,ref} from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
 onMounted(() => {
    getC1(); })
//通知仓库获取一级分类的方法
const getC1 = () => {
    //通知分类仓库发请求获取一级分类的数据
    categoryStore.getC1();
}


</script>

<style scoped></style>