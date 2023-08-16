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
                    <el-form-item  v-for="(item, index) in attrArr" :key="index" :label="item.attrName"
                        style="margin: 10px 10px;">
                        <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
                            <el-option :value="`${item.id}:${attrValue.id}`" v-for="(attrValue, index) in item.attrValueList" :key="index"
                                :label="attrValue.valueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item, index) in saleArr" :key="index" :label="item.saleAttrName">
                        <el-select placeholder="请选择" v-model="item.saleAttrIdAndValueId">
                            <el-option :value="`${item.id}:${saleValue.id}`" v-for="(saleValue, index) in item.spuSaleAttrValueList" :key="index"
                                :label="saleValue.saleAttrValueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table border style="margin: 10px 0px;" :data="imgArr" ref="table">
                    <el-table-column type="selection" align="center" width="80px"></el-table-column>
                    <el-table-column label="图片" align="center">
                        <template #='{ row }'>
                            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" align="center" prop="imgName"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #='{ row }'>
                            <el-button type="primary" size="small" @click="handle(row)">设为默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr'
import { SkuData } from '@/api/product/spu/type'
import { reqSpuImageList, reqSpuHasSaleAttr,reqAddSku } from '@/api/product/spu'
import { ref,reactive } from 'vue'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScene'])
let attrArr = ref<any>()
let imgArr = ref<any>()
let saleArr = ref<any>()
//收集SKU的参数
let skuParams = reactive<SkuData>({
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
let table = ref<any>()
//取消按钮的回调
const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}
//添加sku的自定义函数
const initAddSku = async (c1Id: number, c2Id: number, spu: any) => {
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
    let result1: any = await reqSpuImageList(spu.id)
    let result2: any = await reqSpuHasSaleAttr(spu.id)
    imgArr.value = result1.data
    attrArr.value = result.data
    saleArr.value = result2.data
}
const handle = (row:any) => {
    imgArr.value.forEach((element:any) => {
        table.value.toggleRowSelection(element,false)
    });
    table.value.toggleRowSelection(row,true)
    skuParams.skuDefaultImg = row.imgUrl

}
const save = async() => {
    skuParams.skuAttrValueList = attrArr.value.reduce((prev:any,next:any)=>{
        if(next.attrIdAndValueId){
           
            let [attrId,valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId,
            })
        }
        return prev
    },[])
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev:any,next:any)=>{
        if(next.saleAttrIdAndValueId){
            let [saleAttrId,saleAttrValueId] = next.saleAttrIdAndValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    },[])
    let result = await reqAddSku(skuParams)
    if(result.code ==200){
        ElMessage({
            type:'success',
            message:'保存成功'
        })
        $emit('changeScene',{
            flag:0,
            params:''
        })
    }else{
        ElMessage({
            type:'error',
            message:'保存失败'
        })
        $emit('changeScene',{
            flag:0,
            params:''
        })
    }
}
defineExpose({ initAddSku })
</script>

<style scoped></style>