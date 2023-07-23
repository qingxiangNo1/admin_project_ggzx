<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" size="normal"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)" type="number"></el-input>
            </el-form-item>
            <el-form-item label="重量(克)">
                <el-input placeholder="重量(克)" type="number"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item label="手机一级">
                        <el-select placeholder="请选择">
                            <el-option label="1"></el-option>
                            <el-option label="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="电池容量">
                        <el-select placeholder="请选择">
                            <el-option label="1"></el-option>
                            <el-option label="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运行内存">
                        <el-select placeholder="请选择">
                            <el-option label="1"></el-option>
                            <el-option label="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机身内存">
                        <el-select placeholder="请选择">
                            <el-option label="1"></el-option>
                            <el-option label="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="CPU型号">
                        <el-select placeholder="请选择">
                            <el-option label="1"></el-option>
                            <el-option label="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="屏幕内存">
                        <el-select placeholder="请选择">
                            <el-option label="1"></el-option>
                            <el-option label="1"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form>
                    <el-form-item label="颜色">
                        <el-select placeholder="请选择">
                            <el-option label="1"></el-option>
                            <el-option label="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table border style="margin: 10px 0px;">
                    <el-table-column type="selection" align="center" width="80px"></el-table-column>
                    <el-table-column label="图片" align="center"></el-table-column>
                    <el-table-column label="名称" align="center"></el-table-column>
                    <el-table-column label="操作" align="center"></el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
let $emit = defineEmits(['changeScene'])
//取消按钮的回调
const cancel = () => {
      $emit('changeScene',{flag:0,params:''
    })
}
</script>

<style scoped></style>