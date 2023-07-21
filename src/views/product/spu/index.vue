<template>
    <el-card>
        <Category :scene="scene"></Category>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" icon="Plus" @click="">添加SPU</el-button>
        <el-table border style="margin: 10px 0px;">
            <el-table-column type="index" label="序号" width="80px" align="center">
            </el-table-column>
            <el-table-column label="SPU名称">
            </el-table-column>
            <el-table-column label="SPU描述">
            </el-table-column>
            <el-table-column label="操作">
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3,5,7,9]"
             :background="true" layout="prev, pager, next, jumper,->,total, sizes"
            :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Category from '@/components/Category/index.vue'
let scene = ref(0)
let pageNo = ref(1)
let pageSize = ref(3)
</script>

<style scoped></style>