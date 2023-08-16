<template>
    <div>
        <el-card class="box-card">
            <!-- 卡片顶部添加品牌按钮 -->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
            <!-- table:---border:可以设置表格纵向是否有边框
                table-column:---label:某一个列表 ---width:设置这列宽度 ---align:设置这一列对齐方式    
            -->
            <el-table border="true" :data="trademarkArr">
                <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
                <!-- table-column:默认展示数据用div -->
                <el-table-column label="品牌名称" prop="tmName">
                </el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row }">
                        <img :src="row.logoUrl" alt="图片不存在" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #='{ row }'>
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`你确定删除${row.tmName}吗？`" width="300px" icon="Delete"
                            @confirm="deleteTrademark(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件
                pagination
                   v-model:current-page:设置分页器当前页码
                   v-model:page-size:设置每一个展示数据条数
                   page-sizes:用于设置下拉菜单数据
                   background:设置分页器按钮的背景颜色
                   layout:可以设置分页器六个子组件布局调整
            -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 4, 5, 6]"
                background='true' layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
                @current-change="getHasTrademark" @size-change="sizeChange" />
        </el-card>
        <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
        <!-- 
            v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
             title:设置对话框左上角标题
        -->
        <el-dialog v-model="dialogVisible" :title="trademarkParms.id ? '修改品牌' : '添加品牌'" width="50%" draggable>
            <el-form :model="trademarkParms" ref="refForm" :rules="rules" :inline="false" size="normal">
                <el-form-item label="品牌名称" size="normal" label-width="100px" prop="tmName">
                    <el-input v-model="trademarkParms.tmName" placeholder="请您输入品牌名称" size="normal"
                        style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" size="normal" label-width="100px" prop="logoUrl">
                    <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求  -->
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParms.logoUrl" :src="trademarkParms.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽:footer -->
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="confirm">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import { onMounted, reactive, ref, nextTick } from 'vue'; //引入组合式API函数ref
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import { ElMessage,UploadProps } from 'element-plus';
//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
onMounted(() => {
    getHasTrademark()
});
let pageNo = ref<number>(1); //当前页码
let limit = ref<number>(3);  //每一页展示多少条数据
let total = ref<number>(0);  //存储已有品牌数据总数
let trademarkArr = ref<Records>([]) //存储已有品牌的数据
let dialogVisible = ref<boolean>(false) //控制对话框显示与隐藏
let trademarkParms = reactive<TradeMark>({
    id: 0,
    tmName: '',
    logoUrl: ''
})//定义收集新增品牌数据
let refForm = ref()  //获取el-form组件实例
//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
    //是当表单元素触发blur时候,会触发此方法
    //自定义校验规则
    if (value.trim().length >= 2) {
        callBack()
    } else {
        //校验未通过返回的错误的提示信息
        callBack(new Error('品牌名称位数大于等于两位'))
        console.log(rule);
    }
}
// 品牌LOGO图片的自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack()
    } else {
        callBack(new Error('LOGO图片务必上传'))
        console.log(rule);
    }
}
//表单校验规则对象
const rules = {
    //required:这个字段务必校验,表单项前面出来五角星
    //trigger:代表触发校验规则时机[blur、change]
    tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
    logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用次函数即可
const getHasTrademark = async (pager = 1) => {
    pageNo.value = pager
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code == 200) {
        trademarkArr.value = result.data.records;
        total.value = result.data.total;
    }
}
//分页器当前页码发生变化的时候会触发
//对于当前页码发生变化自定义事件,组件pagination父组件回传了数据(当前的页码)
// const changePageNo = ()=>{
//     //当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
//     getHasTrademark();
// }
//当下拉菜单发生变化的时候触发次方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
    //当前每一页的数据量发生变化的时候，当前页码归1
    getHasTrademark();
}
//添加品牌按钮的回调
const addTrademark = async () => {
    dialogVisible.value = true //对话框显示
    trademarkParms.id = 0
    trademarkParms.tmName = ''
    trademarkParms.logoUrl = ''  //清空收集数据
    nextTick(() => {
        refForm.value.clearValidate('tmName');
        refForm.value.clearValidate('logoUrl');
    })
}
const confirm = async () => {
    await refForm.value.validate()
    let result: any = await reqAddOrUpdateTrademark(trademarkParms)
    if (result.code == 200) {
        dialogVisible.value = false
        ElMessage({
            type: 'success',
            message: trademarkParms.id ? '修改品牌成功' : '添加品牌成功'
        })
        getHasTrademark()
    } else {
        ElMessage({
            type: 'error',
            message: trademarkParms.id ? '修改品牌失败' : '添加品牌失败'
        })
    }
}
//对话框底部取消按钮
const cancel = () => {
    dialogVisible.value = false  //对话框隐藏
}
//修改已有品牌的按钮的回调
//row:row即为当前已有的品牌
const updateTrademark = (row: any) => {
    //清空校验规则错误提示信息
    nextTick(() => {
        refForm.value.clearValidate('tmName');
        refForm.value.clearValidate('logoUrl');
    })
    dialogVisible.value = true //对话框显示
    trademarkParms.logoUrl = row.logoUrl
    trademarkParms.tmName = row.tmName
    trademarkParms.id = row.id
    // Object.assign(trademarkParams, row);//ES6语法合并对象
}
const deleteTrademark = async (id: number) => {
    let result: any = await reqDeleteTrademark(id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }

}
//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile:any) => {
    //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
    //要求:上传文件格式png|jpg|gif 4M
    if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '文件大小务必小于4M！'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '请输入JPEG||PNG类型图片'
        })
        return false;
    }
}
//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    //response:即为当前这次上传图片post请求服务器返回的数据
    //收集上传图片的地址,添加一个新的品牌的时候带给服务器
    trademarkParms.logoUrl = response.data;
    //图片上传成功,清除掉对应图片校验结果
    refForm.value.clearValidate('logoUrl')
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

    background: url(../../../../public/jile1.jpg);
    background-size: contain;
}
</style>