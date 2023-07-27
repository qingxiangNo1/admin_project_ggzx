<template>
    <div>
        <el-card>
            <el-form :inline="true" class="form">
                <el-form-item label="角色名称">
                    <el-input placeholder="角色名称" v-model="roleName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" size="default" @click="" icon="Plus">添加角色</el-button>
            <el-table border style="margin: 10px 0px;" :data="roleArr">
                <el-table-column label="#" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="id" align="center" width="80px" prop="id"></el-table-column>
                <el-table-column label="角色名称" align="center" prop="roleName" width="200px"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" width="250px"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime" width="250px"></el-table-column>
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
                @current-change="getHasRole" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import {RoleResponseData,RoleData} from '@/api/acl/role/type'
import {reqRoleArr} from '@/api/acl/role'
import useLayOutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayOutSettingStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let roleArr = ref<RoleData[]>([])
let roleName = ref<string>('')
onMounted(() => {
    getHasRole()
})
const getHasRole = async(pager = 1 ) => {
    pageNo.value = pager
    let result:RoleResponseData = await reqRoleArr(pageNo.value,pageSize.value,roleName.value)
    roleArr.value = result.data.records
    total.value = result.data.total
    console.log(result);
}
const handleSizeChange = () => {
    getHasRole()
}
const search = () => {
    getHasRole()
}
const reset = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>