<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="spu名称">
                <el-input placeholder="请你输入spu名称" size="normal"></el-input>
            </el-form-item>
            <el-form-item label="spu品牌">
                <el-select placeholder="请你选择品牌">
                    <el-option>
                        哈哈
                    </el-option>
                    <el-option>
                        嘿嘿
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="请你输入描述"></el-input>
            </el-form-item>
            <el-form-item label="spu照片">
                <el-upload v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
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
                        <template #='{row,$index}'>
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
let $emit =  defineEmits(['changeScene'])
const cancel = () => {
    $emit('changeScene',0)
}
</script>

<style scoped></style>