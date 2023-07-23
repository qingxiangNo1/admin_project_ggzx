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
                <el-select v-model="saleAttrIdAndValueName"
                    :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'">
                    <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
                        :label="item.name"></el-option>
                </el-select>
                <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" style="margin-left:10px"
                    type="primary" size="default" icon="Plus">添加属性</el-button>
                <el-table border style="margin: 10px 0px;" :data="saleAttr">
                    <el-table-column label="序号" width="80px" type="index" align="center">
                    </el-table-column>
                    <el-table-column label="属性名" align="center" prop="saleAttrName">
                    </el-table-column>
                    <el-table-column label="属性值" align="center">
                        <template #='{ row, $index }'>
                            <el-tag style="margin:0px 5px" @close="row.spuSaleAttrValueList.splice(index, 1)"
                                v-for="(item, index) in row.spuSaleAttrValueList" :key="row.id" class="mx-1" closable>
                                {{ item.saleAttrValueName }}
                            </el-tag>
                            <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag == true"
                                placeholder="请你输入属性值" size="small" style="width:100px"></el-input>
                            <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #='{ row, $index }'>
                            <el-button type="primary" size="small" @click="saleAttr.splice($index, 1)"
                                icon="Delete"></el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-button type="primary" size="default" @click="save">确定</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
            <el-form-item></el-form-item>
        </el-form>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu/index.ts'
import type { Trademark, SpuImg, SaleAttr, HasSaleAttr, SpuData, SaleAttrValue } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
//将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>('')
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
    $emit('changeScene', {flag:0,params:SpuParams.value.id?'update':'add'})
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
//计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
    //全部销售属性:颜色、版本、尺码
    //已有的销售属性:颜色、版本
    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName;
        });
    })
    return unSelectArr;
})
//添加销售属性的方法
const addSaleAttr = () => {
    /*
    "baseSaleAttrId": number,
    "saleAttrName": string,
    "spuSaleAttrValueList": SpuSaleAttrValueList
    */
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
    //准备一个新的销售属性对象:将来带给服务器即可
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    //追加到数组当中
    saleAttr.value.push(newSaleAttr);
    //清空收集的数据
    saleAttrIdAndValueName.value = '';

}
//属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
    //点击按钮的时候,input组件不就不出来->编辑模式
    row.flag = true;
    row.saleAttrValue = ''
}
//表单元素失却焦点的事件回调
const toLook = (row: SaleAttr) => {
    //整理收集的属性的ID与属性值的名字
    const { baseSaleAttrId, saleAttrValue } = row;
    //整理成服务器需要的属性值形式
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }

    //非法情况判断
    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空的'
        })
        return;
    }
    //判断属性值是否在数组当中存在
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue;
    })

    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        return;
    }


    //追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    //切换为查看模式
    row.flag = false;
}
const save = async () => {
    SpuParams.value.spuImageList = imageList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    SpuParams.value.spuSaleAttrList = saleAttr.value
    let result = await reqAddOrUpdateSpu(SpuParams.value)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '修改成功' : '上传成功'
        })
        $emit('changeScene', {flag:0,params:SpuParams.value.id?'update':'add'})
    } else {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? '修改失败' : '上传失败'
        })
        $emit('changeScene', {flag:0,params:SpuParams.value.id?'update':'add'})

    }

}
const initAddSpu = async () => {
    Object.assign(SpuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    })
    imageList.value = []
    saleAttr.value = []
    saleAttrIdAndValueName.value = ''
    let result = await reqAllTradeMark()
    let result1 = await reqAllSaleAttr()
    SpuParams.value.category3Id = categoryStore.c3Id
    allTrademark.value = result.data
    allSaleAttr.value = result1.data

}
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>