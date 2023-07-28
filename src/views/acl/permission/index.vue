<template>
    <div>
<el-table border :data="allMenuArr" row-key="id" >
    <el-table-column label="名称" align="center" prop="name"></el-table-column>
    <el-table-column label="权限值" align="center" prop="code"></el-table-column>
    <el-table-column label="修改时间" align="center" prop="updateTime"></el-table-column>
    <el-table-column label="操作" align="center">
        <template #='{row,$index}'>
        <el-button type="primary" size="small" icon="Plus" @click="" :disabled="row.level==4?true:false">{{ row.level==3?'添加功能':'添加菜单' }}</el-button>
        <el-button type="primary" size="small" icon="Edit" @click="" :disabled="row.level==1?true:false">编辑</el-button>
        <el-button type="primary" size="small" icon="Delete" @click="" :disabled="row.level==1?true:false">删除</el-button>
        </template>
    </el-table-column>
</el-table>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import {PermissionData,PermissionResponseData} from '@/api/acl/menu/type'
import {reqAllPermission} from '@/api/acl/menu'
let allMenuArr = ref<PermissionData[]>([])
onMounted(() => {
    getHasPermission()
})
const getHasPermission = async() => {
    let result:PermissionResponseData = await reqAllPermission()
    console.log(result);
    if (result.code==200) {
        allMenuArr.value = result.data
    } else {
        
    }

}
</script>

<style scoped>

</style>