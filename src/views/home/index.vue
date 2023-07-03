<template>
    <div>
       <h1>一级路由展示home界面{{ userStore.username}}</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user'
const userStore = useUserStore();
onMounted(() => {
    userStore.userInfo()
})
</script>

<style scoped>

</style>