<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" size="normal" v-model="skuParams.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
            </el-form-item>
            <el-form-item label="重量(克)">
                <el-input placeholder="重量(克)" type="number" v-model="skuParams.weight"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true" label-width="120px">
                    <el-form-item v-for="(attrArrValue, index) in attrArr" :key="index" :label="attrArrValue.attrName"
                        style="margin: 10px 10px;">
                        <el-select placeholder="请选择">
                            <el-option v-for="(item, index) in attrArrValue.attrValueList" :key="index"
                                :label="item.valueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item v-for="(saleArrValue, index) in saleArr" :key="index" :label="saleArrValue.saleAttrName">
                        <el-select placeholder="请选择">
                            <el-option v-for="(item, index) in saleArrValue.spuSaleAttrValueList" :key="index"
                                :label="item.saleAttrValueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table border style="margin: 10px 0px;" :data="imgArr">
                    <el-table-column type="selection" align="center" width="80px"></el-table-column>
                    <el-table-column label="图片" align="center">
                        <template #='{ row, $index }'>
                            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" align="center" prop="imgName"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #='{ row, $index }'>
                            <el-button type="primary" size="small" @click="">设为默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr'
import { SkuData } from '@/api/product/spu/type'
import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
import { ref } from 'vue'
let $emit = defineEmits(['changeScene'])
let attrArr = ref<any>()
let imgArr = ref<any>()
let saleArr = ref<any>()
//收集SKU的参数
let skuParams = ref<SkuData>({
    //父组件传递过来的数据
    "category3Id": "",//三级分类的ID
    "spuId": "",//已有的SPU的ID
    "tmId": "",//SPU品牌的ID
    //v-model收集
    "skuName": "",//sku名字
    "price": "",//sku价格
    "weight": "",//sku重量
    "skuDesc": "",//sku的描述

    "skuAttrValueList": [//平台属性的收集
    ],
    "skuSaleAttrValueList": [//销售属性
    ],
    "skuDefaultImg": "",//sku图片地址
})
//取消按钮的回调
const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}
//添加sku的自定义函数
const initAddSku = async (c1Id: number, c2Id: number, spu: any) => {
    skuParams.value.category3Id = spu.category3Id
    skuParams.value.spuId = spu.id
    skuParams.value.tmId = spu.tmId
    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
    let result1: any = await reqSpuImageList(spu.id)
    let result2: any = await reqSpuHasSaleAttr(spu.id)
    imgArr.value = result1.data
    attrArr.value = result.data
    saleArr.value = result2.data
}
defineExpose({ initAddSku })
</script>

<style scoped></style>