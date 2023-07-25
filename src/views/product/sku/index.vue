<template>
    <div>
        <el-card>
            <el-table border style="margin: 10px 0px;" :data="skuArr">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column label="名称" width="150px" align="center" prop="skuName"></el-table-column>
                <el-table-column label="描述" width="300px" align="center" prop="skuDesc"
                    show-overflow-tooltip></el-table-column>
                <el-table-column label="图片" width="150px" align="center">
                    <template #='{ row, $index }'>
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="重量(kg)" width="150px" align="center" prop="weight"></el-table-column>
                <el-table-column label="价格" width="150px" align="center" prop="price"></el-table-column>
                <el-table-column label="操作" width="300px" align="center" fixed="right">
                    <template #='{ row, index }'>
                        <el-button type="primary" size="small" @click="saleAndCancelSku(row)"
                            :icon="row.isSale == 0 ? 'Top' : 'Bottom'"></el-button>
                        <el-button type="primary" size="small" @click="updateSku" icon="Edit"></el-button>
                        <el-button type="primary" size="small" @click="findSku(row)" icon="InfoFilled"></el-button>
                        <el-button type="primary" size="small" @click="" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper,->,total, sizes" :total="total"
                @size-change="handleCurrentChange" @current-change="getHasSku" />
            <el-drawer v-model="drawer">
                <template #header>
                    <h4>查看商品详情</h4>
                </template>
                <template #default>
                    <div>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">名称</el-col>
                            <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">描述</el-col>
                            <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">价格</el-col>
                            <el-col :span="18">{{ skuInfo.price }}</el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">平台属性</el-col>
                            <el-col :span="18">
                                <el-tag style="margin: 3px 5px;" type="success" size="small" effect="dark" closable
                                    @close="" v-for="(item, index) in skuInfo.skuAttrValueList" :key="index">{{ item.attrName }}</el-tag>

                            </el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">销售属性</el-col>
                            <el-col :span="18">
                                <el-tag style="margin: 3px 5px;" type='danger' size="small" effect="dark" closable @close=""
                                    v-for="(item, index) in skuInfo.skuSaleAttrValueList" :key="index">{{ item.saleAttrName }}</el-tag>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">商品图片</el-col>
                            <el-col :span="18">
                                <el-carousel :interval="4000" type="card" height="200px">
                                    <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
                                        <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
                                    </el-carousel-item>
                                </el-carousel>
                            </el-col>
                        </el-row>
                    </div>
                </template>
                <template #footer>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SkuData, SkuResponseData, SkuInfoData } from '@/api/product/sku/type'
import { reqSkuList, reqCancelSale, reqSaleSku, reqSalInfo } from '@/api/product/sku'
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<any>({})
onMounted(() => {
    getHasSku()
})
const getHasSku = async (pager = 1) => {
    pageNo.value = pager
    let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
    if (result.code == 200) {
        skuArr.value = result.data.records
        total.value = result.data.total
    }
}
const handleCurrentChange = () => {
    getHasSku()
}
const saleAndCancelSku = async (sku: SkuData) => {
    if (sku.isSale) {
        let result = await reqCancelSale((sku.id as number))
        if (result.code == 200) {
            ElMessage({
                type: 'success',
                message: '下架成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '下架失败'
            })
        }
        getHasSku(pageNo.value)
    } else {
        let result = await reqSaleSku((sku.id as number))
        if (result.code == 200) {
            ElMessage({
                type: 'success',
                message: '上架成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '上架失败'
            })
        }
        getHasSku(pageNo.value)
    }
}
const updateSku = () => {
    ElMessage({
        type: 'success',
        message: '程序员在努力开发中......'
    })
}
const findSku = async (row: any) => {
    drawer.value = true
    let result = await reqSalInfo(row.id)
    skuInfo.value = result.data   
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>