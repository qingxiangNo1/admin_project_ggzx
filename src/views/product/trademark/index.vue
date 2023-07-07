<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
            <el-table border="true" :data="trademarkArr">
                <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
                <el-table-column label="品牌名称" prop="tmName">
                </el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" alt="图片不存在" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #='{ row, index }'>
                        <el-button type="primary" size="small" icon="Edit"></el-button>
                        <el-button type="danger" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 4, 5, 6]"
                background='true' layout=" prev, pager, next, jumper,->,sizes,total" :total="total" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { reqHasTrademark } from '@/api/product/trademark'
import { onMounted } from 'vue';
import type {Records,TradeMarkResponseData} from '@/api/product/trademark/type'

onMounted(() => {
    getHasTrademark()
});
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let trademarkArr = ref<Records>([])
const getHasTrademark = async () => {
    let result:TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code == 200) {
        trademarkArr.value = result.data.records;
        total.value = result.data.total;
    }
}
</script>

<style scoped></style>