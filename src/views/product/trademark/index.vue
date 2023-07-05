<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
            <el-table border="true">
                <el-table-column label="序号" align="center" width="80px"></el-table-column>
                <el-table-column label="品牌名称"></el-table-column>
                <el-table-column label="品牌LOGO"></el-table-column>
                <el-table-column label="品牌操作"></el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 4, 5, 6]"
                background='true' layout=" prev, pager, next, jumper,->,sizes,total" :total="400" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {reqHasTrademark} from '@/api/product/trademark'
import { onMounted } from 'vue';
onMounted(() => {
    getHasTrademark()
});
let pageNo = ref(1);
let limit = ref(3);
const  getHasTrademark = async() => {
   let result = await reqHasTrademark(pageNo.value,limit.value)
   console.log(result);
}
</script>

<style scoped></style>