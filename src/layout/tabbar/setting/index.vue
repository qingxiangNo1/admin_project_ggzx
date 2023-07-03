<template>
        <!-- 顶部右侧按钮 -->
        <el-button size="default" circle icon="Refresh"></el-button>
        <el-button size="default" circle icon="FullScreen"></el-button>
        <el-button size="default" circle icon="Setting"></el-button>
        <img src="/jile2.jpeg" style="width: 28px; height: 28px; margin:0 10px;">
        <!-- 下拉退出登录 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                admin
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
</template>

<script setup lang="ts">

</script>

<style scoped></style>