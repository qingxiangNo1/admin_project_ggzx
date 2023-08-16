<template>
    <div>
        <!-- <h1 style="color: white">{{menuList}}</h1> -->
        <template v-for="(item) in menuList" :key="item.path">
            <!-- 没有子路由 -->
            <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 有子路由但只有一个 -->
            <el-menu-item v-if="item.children && item.children.length == 1 && !item.meta.hidden" :index="item.children[0].path"
                @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>

                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 有大于等于两个子路由 -->
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length >= 2 && !item.meta.hidden">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>

    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
defineProps(['menuList']);
const $router = useRouter();
const goRoute = (vc: any) => {
    //vc.index 是点击跳转的路径
    $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style scoped></style>