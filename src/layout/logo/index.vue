<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <p>{{ setting.title}}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>
<script lang="ts">
export default{
    name:'Logo'
}
</script>
<style scoped lang="scss">
  .logo{
    display: flex;
    align-items: center;
    width: 100%;
    height: $left-menu-logo-height;
    color: white;
    padding: 15px;
    img{
        width: 28px;
        height: 28px;
    }
    p{
        font-size: 15px;
        padding-left: 15px;
    }
  }
</style>