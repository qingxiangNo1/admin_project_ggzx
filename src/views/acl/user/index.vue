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
            <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
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
                    <template #='{ row, $index }'>
                        <el-button type="primary" size="small" @click="" icon="User">分类角色</el-button>
                        <el-button type="primary" size="small" @click="updateUser(row)" icon="Edit">编辑</el-button>
                        <el-button type="primary" size="small" @click="" icon="Delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
                :background="true" layout="prev, pager, next, jumper,->,total, sizes," :total="total"
                @size-change="handleSizeChange" @current-change="getUserInfo" />
            <el-drawer v-model="drawer">
                <template #header>
                    <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
                </template>
                <template #default>
                    <div>
                        <el-form :model="userParams" ref="refForm" :rules="rules">
                            <el-form-item label="用户姓名" prop="username">
                                <el-input placeholder="请你输入用户姓名" v-model="userParams.username"></el-input>
                            </el-form-item>
                            <el-form-item label="用户昵称" prop="name">
                                <el-input placeholder="请你输入用户昵称" v-model="userParams.name"></el-input>
                            </el-form-item>
                            <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                                <el-input placeholder="请你输入密码" v-model="userParams.password"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
                <template #footer>
                    <div style="flex: auto">
                        <el-button @click="save">确定</el-button>
                        <el-button type="primary" @click="confirmClick">取消</el-button>
                    </div>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqUserInfo, reqAddOrUpdateUserInfo } from '@/api/acl/user'
import { User, Records } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(20)
let userArr = ref<Records>([])
let drawer = ref<boolean>(false)
let userParams = reactive<User>({
    username: '',
    name: '',
    password: '',
})

let refForm = ref<any>()
onMounted(() => {
    getUserInfo()
})
const getUserInfo = async (pager = 1) => {
    pageNo.value = pager
    let result = await reqUserInfo(pageNo.value, pageSize.value)
    total.value = result.data.total
    userArr.value = result.data.records
}
const handleSizeChange = () => {
    getUserInfo()
}
const addUser = () => {
    drawer.value = true
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: '',
    })
    nextTick(() => {
        refForm.value.clearValidate('username')
        refForm.value.clearValidate('name')
        refForm.value.clearValidate('password')
    })
}
const updateUser = (row:any) => {
    drawer.value = true
    Object.assign(userParams,row)
    nextTick(() => {
        refForm.value.clearValidate('username')
        refForm.value.clearValidate('name')
    })
}
const save = async () => {
    await refForm.value.validate()
    let result: any = await reqAddOrUpdateUserInfo(userParams)
    if (result.code == 200) {
        drawer.value = false
        ElMessage({
            type: 'success',
            message: userParams.id ? '修改成功' : '添加成功'
        })
        getUserInfo()
        window.location.reload()
    } else {
        drawer.value = false
        ElMessage({
            type: 'error',
            message: userParams.id ? '修改失败' : '添加失败'
        })
        getUserInfo()
    }
}
const validateUsername = (rule: any, value: any, callback: any) => {
    if (value.trim().length > 4) {
        callback()
    } else {
        callback(new Error('用户姓名至少五位'))
    }
}
const validateName = (rule: any, value: any, callback: any) => {
    if (value.trim().length > 4) {
        callback()
    } else {
        callback(new Error('用户昵称至少五位'))
    }
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value.trim().length > 5) {
        callback()
    } else {
        callback(new Error('用户姓名至少六位'))
    }
}
const rules = {
    username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
    name: [{ required: true, validator: validateName, trigger: 'blur' }],
    password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
}

</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>