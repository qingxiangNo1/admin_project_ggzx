<template>
    <div>
        <el-card>
            <el-form :inline="true" class="form">
                <el-form-item label="角色名称">
                    <el-input placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" size="default" @click="" icon="Plus">添加角色</el-button>
            <el-table border style="margin: 10px 0px;">
                <el-table-column label="#" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="id" align="center" width="80px"></el-table-column>
                <el-table-column label="角色名称" align="center"></el-table-column>
                <el-table-column label="创建时间" align="center"></el-table-column>
                <el-table-column label="更新时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center" >
                    <template #='{ row, $index }'>
                        <el-button type="primary" icon="User" size="small">分配权限</el-button>
                        <el-button type="primary" icon="Edit" size="small">编辑</el-button>
                        <el-button type="primary" icon="Delete" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
                :page-sizes="[5,7,10]"  :background="true"
                layout="prev, pager, next, jumper,->,total, sizes," :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(15)
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>