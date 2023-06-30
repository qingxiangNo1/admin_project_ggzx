<template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue';
//当你组件挂载完毕 测试发送一个请求
onMounted(() => {
  request ({
    url:'user/login',
    method:'post',
    data:{
      username:'admin',
      password:'111111',
    },
  }).then(res=> {
    console.log(res);
  },)
},)
</script>
<style scoped lang="scss">
div {
   h1{
    color: $color;
   }
  }
</style>

