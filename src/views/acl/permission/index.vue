<template>
    <div>
        <el-table border :data="allMenuArr" row-key="id">
            <el-table-column label="名称" align="center" prop="name"></el-table-column>
            <el-table-column label="权限值" align="center" prop="code"></el-table-column>
            <el-table-column label="修改时间" align="center" prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #='{ row, $index }'>
                    <el-button type="primary" size="small" icon="Plus" @click="addMenuOrFunction(row)"
                        :disabled="row.level == 4 ? true : false">{{
                            row.level == 3 ? '添加功能' : '添加菜单' }}</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateMenuOrFunction(row)"
                        :disabled="row.level == 1 ? true : false">编辑</el-button>
                    <el-button type="primary" size="small" icon="Delete" @click=""
                        :disabled="row.level == 1 ? true : false">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" :title="menuData.id?'修改菜单':'添加菜单'">
            <el-form label-width="70px">
                <el-form-item label="名称">
                    <el-input placeholder="请填写名称" size="normal" v-model="menuData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限值">
                    <el-input placeholder="请填写权限值" size="normal" v-model="menuData.code"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmAddMenuOrFunction()">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { PermissionData, PermissionResponseData, MenuParams } from '@/api/acl/menu/type'
import { reqAllPermission, reqAddOrUpdataMenu } from '@/api/acl/menu'
import { ElMessage } from 'element-plus';
let allMenuArr = ref<PermissionData[]>([])
let dialogVisible = ref<boolean>(false)
let menuData = reactive<MenuParams>({
    code: '',
    level: 0,
    name: '',
    pid: 0,
}

)
onMounted(() => {
    getHasPermission()
})
const getHasPermission = async () => {
    let result: PermissionResponseData = await reqAllPermission()
    console.log(result);
    if (result.code == 200) {
        allMenuArr.value = result.data
    } else {

    }
}
const addMenuOrFunction = (row: any) => {
    Object.assign(menuData,
        {
            id:0,
            code: '',
            level: 0,
            name: '',
            pid: 0,
        })
    dialogVisible.value = true
    menuData.level = row.level + 1
    menuData.pid = row.id
}
const confirmAddMenuOrFunction = async () => {
    let result = await reqAddOrUpdataMenu(menuData)
    if (result.code == 200) {
        dialogVisible.value = false
        ElMessage({
            type: 'success',
            message: menuData.id ? '修改成功' : '添加成功'
        })
        getHasPermission()
    } else {
        dialogVisible.value = false
        ElMessage({
            type: 'error',
            message: menuData.id ? '修改失败' : '添加失败'
        })
        getHasPermission()
    }
}
const updateMenuOrFunction = (row: any) => {
    dialogVisible.value = true
    Object.assign(menuData,row)
}
</script>

<style scoped></style>