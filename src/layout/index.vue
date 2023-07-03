<template>
    <div class="layout_contain">
        <!-- 左侧菜单 -->
        <div class="layout_left">
            <LOGO></LOGO>
            <!-- 展示菜单   -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="white" :default-active="$router.path">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_top">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容区域 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import LOGO from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user';
import Main from './main/index.vue'
import { useRoute } from 'vue-router';//引入路由对象
import Tabbar from './tabbar/index.vue'
let userStore = useUserStore();
const $router = useRoute();

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
    color: white;
    .scrollbar {
        width: 100%;
        height: calc(100vh - $left-menu-logo-height);
        .el-menu{
            border-right: none;
        }
    }
}

.layout_top {
    position: fixed;
    width: calc(100% - $left-menu-width);
    height: $top-menu-height;
    background: rgb(0, 153, 255);
    right: 0px;
    top: 0px;
}

.layout_main {
    position: absolute;
    width: calc(100% - $left-menu-width);
    height: calc(100vh - $top-menu-height);
    background: rgb(41, 196, 235);
    right: 0px;
    top: 50px;
    padding: 20px;
    overflow: auto;
}
</style>