<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
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
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark"></el-button>
                        <el-button type="danger" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 4, 5, 6]"
                background='true' layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
                @current-change="getHasTrademark" @size-change="sizeChange" />
        </el-card>
        <el-dialog v-model="dialogVisible" title="添加品牌" width="50%" draggable>
            <el-form :model="form" ref="form" :rules="rules" :inline="false" size="normal">
                <el-form-item label="品牌名称" size="normal" label-width="80px">
                    <el-input v-model="trademarkParms.tmName" placeholder="请您输入品牌名称" size="normal" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" size="normal" label-width="80px">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParms.logoUrl" :src="trademarkParms.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { reqHasTrademark } from '@/api/product/trademark'
import { onMounted,reactive,ref } from 'vue';
import type { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus';
onMounted(() => {
    getHasTrademark()
});
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let trademarkArr = ref<Records>([])
let dialogVisible = ref<boolean>(false)
let trademarkParms = reactive<any>({
    tmName:'',
    logoUrl:''
})
const getHasTrademark = async () => {
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code == 200) {
        trademarkArr.value = result.data.records;
        total.value = result.data.total;
    }
}
const sizeChange = () => {
    pageNo.value = 1;
    getHasTrademark();
}
const addTrademark = () => {
    dialogVisible.value = true
}
const updateTrademark = () => {
    dialogVisible.value = true
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
 if(rawFile.type=='image/jpeg'||rawFile.type=='image/png'){
    if(rawFile.size/1024/1024 < 4){
           return true;
    }else{
        ElMessage({
        type:'error',
        message:'文件大小务必小于4M！'
    })
    return false;
    }
 }else{
    ElMessage({
        type:'error',
        message:'请输入JPEG||PNG类型图片'
    })
    return false;
 }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
  trademarkParms.logoUrl = response.data;
}
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>