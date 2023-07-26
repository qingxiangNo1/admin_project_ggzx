<template>
    <div>
        <el-card style="margin: 10px 0px;height: 80px;">
            <el-form :inline="true" class="form">
                <el-form-item label="用户名:">
                    <el-input placeholder="请你输入搜索用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default" @click="">搜索</el-button>
                    <el-button type="primary" size="default" @click="">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <el-button type="primary" size="default" @click="">添加用户</el-button>
            <el-button type="danger" size="default" @click="">批量删除</el-button>
            <el-table style="margin: 10px 0px;" border :data="userArr">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column label="#" align="center" width="60px" type="index"></el-table-column>
                <el-table-column label="ID" align="center" prop="id" width="70px"></el-table-column>
                <el-table-column label="用户名字" align="center" prop="username" width="100px"></el-table-column>
                <el-table-column label="用户名称" align="center" prop="name" width="100px"></el-table-column>
                <el-table-column label="用户角色" align="center" prop="roleName"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
                <el-table-column label="操作" align="center" width="300px">
                    <template #='{row,$index}'>
                    <el-button type="primary" size="small" @click="" icon="User">分类角色</el-button>
                    <el-button type="primary" size="small" @click="" icon="Edit">编辑</el-button>
                    <el-button type="primary" size="small" @click="" icon="Delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
                :page-sizes="[5,7,9,11]"   :background="true"
                layout="prev, pager, next, jumper,->,total, sizes," :total="total" @size-change="handleSizeChange"
                @current-change="getUserInfo" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import {reqUserInfo} from '@/api/acl/user'
import {User} from '@/api/acl/user/type'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(20)
let userArr = ref<User[]>([])
onMounted(() => {
    getUserInfo()
})
const getUserInfo = async(pager = 1) => {
    pageNo.value = pager
    let result = await reqUserInfo(pageNo.value,pageSize.value)
    total.value = result.data.total
    userArr.value = result.data.records
}
const handleSizeChange = () => {
    getUserInfo()
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>