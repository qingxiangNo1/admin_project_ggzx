<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <p>{{ setting.title}}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>

<style scoped lang="scss">
  .logo{
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    color: white;
    padding: 15px;
    img{
        width: 60px;
        height: 60px;
    }
    p{
        font-size: 15px;
        padding-left: 15px;
    }
  }
</style>