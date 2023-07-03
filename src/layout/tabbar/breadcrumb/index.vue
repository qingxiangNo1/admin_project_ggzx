<template>
      <!-- 顶部左侧图标 -->
      <el-icon style="margin-right: 8px;" @click="changeIcon">
                <component :is="LayOutSettingStore.fold?'Fold':'Expand'"></component>
            </el-icon>
            <!-- 顶部左侧面包屑 -->
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
//获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore();
const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>
<script lang="ts">
export default{
    name:'BreadCrumb'
}
</script>
<style scoped>

</style>