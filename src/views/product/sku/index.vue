<template>
    <div>
     <el-card>
        <el-table border style="margin: 10px 0px;"> 
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="名称" width="150px" align="center" ></el-table-column>
            <el-table-column label="描述" width="150px" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="图片" width="150px" align="center" ></el-table-column>
            <el-table-column label="重量" width="150px" align="center" ></el-table-column>
            <el-table-column label="价格" width="150px" align="center" ></el-table-column>
            <el-table-column label="操作" width="250px" align="center" fixed="right"></el-table-column>       
        </el-table>
        <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
     </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(30)
</script>

<style scoped>

</style>