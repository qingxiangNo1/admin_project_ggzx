<template>
        <!-- 顶部右侧按钮 -->
        <el-button size="default" circle icon="Refresh" @click="updateRefresh"></el-button>
        <el-button size="default" circle icon="FullScreen" @click="fullScreen"></el-button>
        <el-button size="default" circle icon="Setting"></el-button>
        <img :src="userStore.avatar" style="width: 28px; height: 28px; margin:0 10px; border-radius: 50%;">
        <!-- 下拉退出登录 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ userStore.username }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'  //获取刷新的小仓库
import useUserStore from '@/store/modules/user'  //获取用户有关的小仓库
import { useRouter,useRoute } from 'vue-router'
let layoutSettingStore = useLayOutSettingStore()
let userStore = useUserStore();
let $router = useRouter() //获取路由器对象
let $route = useRoute() //获取路由对象
//刷新按钮点击回调
const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
//全屏按钮点击的回调
const fullScreen = () => {
    //dom对象的一个属性document.fullscreenElement：可以用来判断是不是全屏模式 全屏为true 否则为 null
    let full = document.fullscreenElement
    //切换为全屏模式
    if(!full){
        //文档根节点的方法 requestFullscreen 实现全屏模式
        document.documentElement.requestFullscreen();
    }else{
        //退出全屏模式
        document.exitFullscreen();
    }
}
const logout = async() => {
    await userStore.userLogout();
    $router.push({path:'/login',query:{redirect:$route.path}})
}
</script>
<script lang="ts">
export default{
    name:'Setting'
}
</script>
<style scoped></style>