<template>
    <div>
        <el-card>
            <el-form ref="form" label-width="80px" :inline="true" size="normal">
                <el-form-item label="一级分类" size="normal">
                    <el-select label="上海">
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类" size="normal">
                    <el-select label="上海">
                    </el-select>

                </el-form-item>
                <el-form-item label="三级分类" size="normal">
                    <el-select label="上海">
                    </el-select>


                </el-form-item>

            </el-form>

        </el-card>
        <el-card>
            <el-button type="primary" size="default" icon="Plus">添加属性</el-button>
            <el-table border stripe >
                <el-table-column label='序号' type="index" width="80px" align="center"/>
                <el-table-column label="属性名称" width="200px" align="center" />
                <el-table-column label="属性值名称" align="center"/>
                <el-table-column label="操作" width="200px" align="center" />
            </el-table>

        </el-card>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>