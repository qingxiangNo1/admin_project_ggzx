<template>
    <!-- 顶部左侧图标 -->
    <el-icon style="margin-right: 8px;" @click="changeIcon">
        <component :is="LayOutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <!-- 顶部左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon style="margin: 0 3px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'; //获取路由对象
import useLayOutSettingStore from '@/store/modules/setting';
//获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore();
let $route = useRoute()
const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>
<script lang="ts">
export default {
    name: 'BreadCrumb'
}
</script>
<style scoped></style>