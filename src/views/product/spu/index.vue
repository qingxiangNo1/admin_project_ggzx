<template>
    <el-card>
        <!-- 三级分类 -->
        <Category :scene="scene"></Category>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <!-- v-if|v-show:都可以实现显示与隐藏 -->
        <div v-show="scene == 0">
            <el-button type="primary" size="default" icon="Plus" @click="addSpu"
                :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
            <!-- 展示已有SPU数据 -->
            <el-table border style="margin: 10px 0px;" :data="records">
                <el-table-column type="index" label="序号" width="80px" align="center">
                </el-table-column>
                <el-table-column label="SPU名称" prop="spuName">
                </el-table-column>
                <el-table-column label="SPU描述" prop="description" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <!-- row:即为已有的SPU对象 -->
                    <template #='{ row }'>
                        <el-button type="primary" size="small" @click="edit(row)" icon="Edit" title="编辑spu">
                        </el-button>
                        <el-button type="primary" size="small" @click="addSku(row)" icon="Plus" title="添加sku">
                        </el-button>
                        <el-button type="primary" size="small" @click="findSku(row)" icon="View" title="查看spu">
                        </el-button>
                        <el-popconfirm :title="`你确定删除${row.spuName}吗？`" @confirm="deleteSpu(row)">
                            <template #reference>
                                <el-button type="primary" size="small"  icon="Delete" title="删除spu">
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper,->,total, sizes" :total="total"
                @size-change="handleSizeChange" @current-change="getHasSpu" />
        </div>
        <!-- 添加SPU|修改SPU子组件 -->
        <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
        <!-- 添加SKU的子组件 -->
        <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="sku"></SkuForm>
        <!-- dialog对话框:展示已有的SKU数据 -->
        <el-dialog v-model="display">
            <el-table :data="skuArr" border>
                <el-table-column label="SKU名字" prop="skuName" align="center"></el-table-column>
                <el-table-column label="SKU价格" prop="price" align="center"></el-table-column>
                <el-table-column label="SKU重量" prop="weight" align="center"></el-table-column>
                <el-table-column label="SKU图片" align="center">
                    <template #='{ row}'>
                        <img :src="row.skuDefaultImg" alt="" style="weight:100px;height: 100px;">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category' //引入分类的仓库
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
import type { HasResponseDate, Records, SkuData } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let scene = ref<number>(0) //场景的数据 //0:显示已有SPU  1:添加或者修改已有SPU 2:添加SKU的结构
let pageNo = ref<number>(1) //分页器默认页码
let pageSize = ref<number>(3) //每一页展示几条数据
let spu = ref<any>() //获取子组件实例SpuForm
let sku = ref<any>() //获取子组件实例skuform
let records = ref<Records>([]) //存储已有的SPU的数据
let total = ref<number>(0) //存储已有SPU总个数
let skuArr = ref<SkuData[]>([])
let display = ref<boolean>(false)
//监听三级分类ID变化
watch(() =>
    categoryStore.c3Id
    , () => {
        //务必保证有三级分类ID
        if (!categoryStore.c3Id) return
        getHasSpu()
    })
//此方法执行:可以获取某一个三级分类下全部的已有的SPU
const getHasSpu = async (pager = 1) => {
    pageNo.value = pager
    let result: HasResponseDate = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (result.code == 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}
//分页器下拉菜单发生变化的时候触发  
const handleSizeChange = () => {
    getHasSpu()
}
//修改已有的SPU的按钮的回调
const edit = (row: any) => {
    scene.value = 1 //切换为场景1:添加与修改已有SPU结构->SpuForm
    spu.value.initHasSpuData(row) //调用子组件实例方法获取完整已有的SPU的数据
}
//子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
    //子组件Spuform点击取消变为场景0:展示已有的SPU
    scene.value = obj.flag
    if (obj.params == 'update') {
        //更新留在当前页
        getHasSpu(pageNo.value)
    } else {
        getHasSpu()    //添加留在第一页
    }
}
//添加新的SPU按钮的回调
const addSpu = () => {
    scene.value = 1 //切换为场景1:添加与修改已有SPU结构->SpuForm
    spu.value.initAddSpu() //调用子组件实例方法获取完整已有的SPU的数据
}
//添加sku的回调
const addSku = (row: any) => {
    scene.value = 2 //切换场景为1 添加场景skuform
    sku.value.initAddSku(categoryStore.c1Id, categoryStore.c2Id, row)
}
const findSku = async (row: any) => {
    let result = await reqSkuList(row.id)
    if (result.code == 200) {
        display.value = true
        console.log(display.value);
        skuArr.value = result.data
    }
}
const deleteSpu = async(row:any) => {
    let result:any = await reqRemoveSpu(row.id)
    console.log(result);
    if(result.code == 200 ){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasSpu(records.value.length>1?pageNo.value:pageNo.value-1)
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}
//路由组件销毁前，清除仓库关于分类的数据
onBeforeUnmount(() => {
    categoryStore.$reset();
})
</script>
<style scoped></style>