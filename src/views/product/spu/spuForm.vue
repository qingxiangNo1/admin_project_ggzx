<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="spu名称">
                <el-input placeholder="请你输入spu名称" size="normal" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="spu品牌">
                <el-select placeholder="请你选择品牌" v-model="SpuParams.tmId">
                    <el-option v-for="(item, index) in allTrademark" :key="index" :value="item.id" :label="item.tmName">
                        {{ item.tmName }}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="请你输入描述" v-model="SpuParams.description"></el-input>
            </el-form-item>
            <el-form-item label="spu照片">
                <el-upload v-model:file-list="imageList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="spu销售属性">
                <el-select placeholder="还有3未选择">
                    <el-option>1</el-option>
                    <el-option>2</el-option>
                    <el-option>3</el-option>

                </el-select>
                <el-button type="primary" size="default" @click="" icon="Plus">添加销售属性</el-button>
                <el-table border style="margin: 10px 0px;">
                    <el-table-column label="序号" width="80px" type="index">

                    </el-table-column>
                    <el-table-column label="属性名" align="center">
                    </el-table-column>
                    <el-table-column label="属性值" align="center">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #='{ row, $index }'>
                            <el-button type="primary" size="small" @click=""></el-button>

                        </template>
                    </el-table-column>

                </el-table>
                <el-button type="primary" size="default" @click="">确定</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
            <el-form-item></el-form-item>
        </el-form>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu/index.ts'
import type { Trademark, SpuImg, SaleAttr, HasSaleAttr, SpuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScene'])
let allTrademark = ref<Trademark[]>([])
let imageList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
let SpuParams = ref<SpuData>({
    category3Id: "",//收集三级分类的ID
    spuName: "",//SPU的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
});
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')
const cancel = () => {
    $emit('changeScene', 0)
}
const initHasSpuData = async (row: any) => {
    SpuParams.value = row
    let result = await reqAllTradeMark()
    let result2 = await reqSpuHasSaleAttr(row.id)
    let result1 = await reqSpuImageList(row.id)
    let result3 = await reqAllSaleAttr()
    allTrademark.value = result.data
    imageList.value = result1.data
    saleAttr.value = result2.data
    allSaleAttr.value = result3.data
    imageList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
}
const handlePictureCardPreview = (file: any) => {
    dialogVisible.value = true
    dialogImageUrl.value = file.url
}
const handleRemove = () => { }
const handlerUpload = (file: any) => {
    if (file.type == 'image/jpeg') {
        if (file.size / 1024 / 1024 < 3) {
            return true
        }
        else {
            ElMessage({
                type: 'error',
                message: '上传大小不能大于3M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '请上传image/jpeg类型'
        })
        return false
    }
}
defineExpose({ initHasSpuData })
</script>

<style scoped></style>