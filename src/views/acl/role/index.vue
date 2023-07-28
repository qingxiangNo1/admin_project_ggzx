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
            <el-button type="primary" size="default" @click="addRole" icon="Plus">添加角色</el-button>
            <el-table border style="margin: 10px 0px;" :data="roleArr">
                <el-table-column label="#" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="id" align="center" width="80px" prop="id"></el-table-column>
                <el-table-column label="角色名称" align="center" prop="roleName" width="200px"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" width="250px"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime" width="250px"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #='{ row, $index }'>
                        <el-button type="primary" icon="User" size="small" @click="setPesmission(row)">分配权限</el-button>
                        <el-button type="primary" icon="Edit" size="small" @click="updateRole(row)">编辑</el-button>
                        <el-popconfirm :title="`你确定删除${row.roleName}吗？`" @confirm="deleteRole(row)">
                            <template #reference>
                                <el-button type="primary" icon="Delete" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                        
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 10]"
                :background="true" layout="prev, pager, next, jumper,->,total, sizes," :total="total"
                @size-change="handleSizeChange" @current-change="getHasRole" />
            <el-dialog :title="roleParams.id ? '修改角色' : '添加角色'" v-model="dialog">
                <el-form :model="roleParams" :rules="rules" ref="form">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input placeholder="请输入角色名称" v-model="roleParams.roleName"></el-input>
                    </el-form-item>

                </el-form>
                <template #footer>
                    <span>
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="confirmAddOrUpdateRole">确认</el-button>
                    </span>
                </template>
            </el-dialog>
            <el-drawer v-model="drawer">
                <template #header>
                    <h4>分配权限</h4>
                </template>
                <template #default>
                    <div>
                        <el-tree ref="tree" :data="treeArr" show-checkbox node-key="id" :default-expanded-keys="[2, 3]"
                            :default-checked-keys="selectArr" :props="defaultProps" />
                    </div>
                </template>
                <template #footer>
                    <div style="flex: auto">
                        <el-button @click="cancelClick">取消</el-button>
                        <el-button type="primary" @click="addSetPermission">确定</el-button>
                    </div>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import { RoleResponseData, RoleData, MenuData, MenuResponseData } from '@/api/acl/role/type'
import { reqRoleArr, reqSaveOrUpdateRole, reqAllMenuList, reqSetPermisson, reqRemoveRole } from '@/api/acl/role'
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus';
let layoutSettingStore = useLayOutSettingStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let roleArr = ref<RoleData[]>([])
let roleName = ref<string>('')
let dialog = ref<boolean>(false)
let roleParams = reactive<RoleData>({
    roleName: ''
})
let form = ref<any>()
let drawer = ref<boolean>(false)
let treeArr = ref<MenuData[]>([])
let selectArr = ref<number[]>([]);
let tree = ref<any>()
const defaultProps = {
    children: 'children',
    label: 'name',
}
onMounted(() => {
    getHasRole()
})
const getHasRole = async (pager = 1) => {
    pageNo.value = pager
    let result: RoleResponseData = await reqRoleArr(pageNo.value, pageSize.value, roleName.value)
    roleArr.value = result.data.records
    total.value = result.data.total
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
const addRole = () => {
    dialog.value = true
    roleParams.roleName = ''
    roleParams.id = 0
    nextTick(() => { form.value.clearValidate('roleName') })

}
const confirmAddOrUpdateRole = async () => {
    let result: any = await reqSaveOrUpdateRole(roleParams)
    if (result.code == 200) {
        dialog.value = false
        ElMessage({
            type: 'success',
            message: roleParams.id ? '修改角色成功' : '添加角色成功'
        })
        getHasRole(roleParams.id ? pageNo.value : 1)
    } else {
        dialog.value = false
        ElMessage({
            type: 'success',
            message: roleParams.id ? '修改角色失败' : '添加角色失败'
        })
        getHasRole(roleParams.id ? pageNo.value : 1)
    }

}
const updateRole = (row: any) => {
    dialog.value = true
    Object.assign(roleParams, row)

}
const cancel = () => {
    dialog.value = false
}
const setPesmission = async (row: any) => {
    drawer.value = true
    Object.assign(roleParams, row)
    let result: MenuResponseData = await reqAllMenuList((roleParams.id as number))
    if (result.code == 200) {
        treeArr.value = result.data
        selectArr.value = filterSelectArr(treeArr.value, []);
    }
}
const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        if (item.select && item.level == 4) {
            initArr.push(item.id);
        }
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, initArr);
        }
    })

    return initArr;
}
const cancelClick = () => {
    drawer.value = false
}
const addSetPermission = async () => {
    let roleId = roleParams.id
    let arr = tree.value.getCheckedKeys();
    //半选的ID
    let arr1 = tree.value.getHalfCheckedKeys();
    let permissionId: number[] = arr.concat(arr1)
    let result = await reqSetPermisson((roleId as number), permissionId)
    if (result.code == 200) {
        drawer.value = false
        ElMessage({
            type: 'success',
            message: '分配权限成功'
        })
        window.location.reload()
    } else {
        drawer.value = false
        ElMessage({
            type: 'error',
            message: '分配权限失败'
        })
        window.location.reload()
    }
}
const deleteRole = async (row: any) => {
    let result = await reqRemoveRole(row.id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: `删除${row.roleName}成功`
        })
        getHasRole(roleArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: `删除${row.roleName}失败`
        })
        getHasRole(roleArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
}
const validateRoleName = (rule: any, value: any, callback: any) => {
    console.log(value);
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('角色名称长度必须大于2'))
    }
}
const rules = {
    roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }]
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>