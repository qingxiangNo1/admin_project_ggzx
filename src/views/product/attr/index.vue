<template>
    <div>
        <el-card>
            <Category :scene="scene"></Category>
        </el-card>
        <el-card>
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id"
                    @click="addVaule">添加属性</el-button>
                <el-table border stripe :data="attrArr">
                    <el-table-column label='序号' type="index" width="80px" align="center" />
                    <el-table-column label="属性名称" width="200px" align="center" prop="attrName">
                    </el-table-column>
                    <el-table-column label="属性值名称" align="center">
                        <template #='{ row, $index }'>
                            <el-tag class="ml-2" style="margin: 0px 5px;" type="success"
                                v-for="(item, index) in row.attrValueList" :key="index">{{ item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200px" align="center">
                        <template #='{ row, $index }'>
                            <el-button type="success" size="small" icon="Edit"></el-button>
                            <el-button type="danger" size="small" icon="Delete"></el-button>

                        </template>
                    </el-table-column>
                </el-table>

            </div>
            <div v-show="scene == 1">
                <el-form>
                    <el-form-item label="属性名称" :inline="true">
                        <el-input placeholder="请您输入属性的名字" v-model="attrParams.attrName" size="normal"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" :disabled="attrParams.attrName ? false : true" size="default"
                    @click="addAttrValue" icon="Plus" style="">添加属性值</el-button>
                <el-button type="primary" size="default" @click="">取消</el-button>
                <el-table border :data="attrParams.attrValueList">
                    <el-table-column label="序号" width="80px" type="index" align="center">
                    </el-table-column>
                    <el-table-column label="属性值" align="center">
                        <template #='{ row, $index }'>
                            <el-input v-if="row.flag" v-model="row.valueName" @blur="toLook(row, $index)"
                                placeholder="请输入属性值" size="small" @keyup.enter.native="toLook(row, $index)"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
                <el-button type="primary" size="default" @click="cancel1">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue'
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category';
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
let scene = ref<number>(0)
//收集新增的属性的数据
let attrParams = reactive<Attr>({
    attrName: "",//新增的属性的名字
    attrValueList: [//新增的属性值数组
    ],
    categoryId: '',//三级分类的ID
    categoryLevel: 3,//代表的是三级分类
})
watch(() => categoryStore.c3Id, () => {
    getAttr();
})
const getAttr = async () => {
    //获取c1 c2 c3 id
    const { c1Id, c2Id, c3Id } = categoryStore
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrArr.value = result.data

    }
}
const addVaule = () => {
    Object.assign(attrParams, {
        attrName: "",//新增的属性的名字
        attrValueList: [//新增的属性值数组
        ],
        categoryId: categoryStore.c3Id,//三级分类的ID
        categoryLevel: 3,
    })
    scene.value = 1
}
const cancel1 = () => {
    scene.value = 0
}
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,
    })
}
const save = async () => {
    let result: any = await reqAddOrUpdateAttr(attrParams)
    if (result.code == 200) {
        scene.value = 0;
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        getAttr();
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
        getAttr();
    }
}
const toLook = (row: AttrValue, $index: number) => {
    if (row.valueName.trim() == '') {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能为空！'
        })
        return
    }
    let repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName
        }
    })
    if(repeat){
        ElMessage({
            type:'error',
            message:'属性值不能重复',
        })
        return
    }

    row.flag = false
}
const toEdit = (row: AttrValue, $index: number) => {
    row.flag = true
}
</script>

<style scoped></style>