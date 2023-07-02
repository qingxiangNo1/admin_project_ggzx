<template>
    <div class="layout_contain">
        <!-- 左侧菜单 -->
        <div class="layout_left">
            <LOGO></LOGO>
            <!-- 展示菜单   -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="white">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="3">数据大屏</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>Workspace</template>
                        <el-menu-item index="2-1">用户管理</el-menu-item>
                        <el-menu-item index="2-2">角色管理</el-menu-item>
                        <el-menu-item index="2-3">菜单管理</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_top">456</div>
        <!-- 内容区域 -->
        <div class="layout_main">
            <p style="height: 100000px">woshi ni die</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import LOGO from './logo/index.vue'
</script>

<style scoped lang="scss">
.layout_contain {
    width: 100%;
    height: 100vh;
    background: yellowgreen;
}

.layout_left {
    width: $left-menu-width;
    height: 100vh;
    background: $left-menu-background;

    .scrollbar {
        width: 100%;
        height: calc(100vh - $left-menu-logo-height);
    }
}

.layout_top {
    position: fixed;
    width: calc(100% - $left-menu-width);
    height: $top-menu-height;
    background: hotpink;
    right: 0px;
    top: 0px;
}

.layout_main {
    position: absolute;
    width: calc(100% - $left-menu-width);
    height: calc(100vh - $top-menu-height);
    background: red;
    right: 0px;
    top: 50px;
    padding: 20px;
    overflow: auto;
}
</style>