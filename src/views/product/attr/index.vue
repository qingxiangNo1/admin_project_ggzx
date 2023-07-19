<template>
    <div>
        <el-card>
            <Category></Category>
        </el-card>
        <el-card>
            <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id">添加属性</el-button>
            <el-table border stripe>
                <el-table-column label='序号' type="index" width="80px" align="center" />
                <el-table-column label="属性名称" width="200px" align="center" />
                <el-table-column label="属性值名称" align="center" />
                <el-table-column label="操作" width="200px" align="center" />
            </el-table>

        </el-card>
    </div>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category';
let categoryStore = useCategoryStore()
</script>

<style scoped></style>