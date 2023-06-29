<template>
  <div>
    <h1>woaini</h1>
    <el-button type="primary">hhhh</el-button>
    <h1>wozhengzaiceshi</h1>
    <el-button type="primary" size="default" :icon="Plus"></el-button>
    <el-button type="success" size="small" :icon="Edit"></el-button>
    <el-button type="danger" size="default" :icon="Delete"></el-button>
    <svg>
      <use xlink:href="#icon-phone" fill="red">

      </use>
    </svg>
    
  </div>
</template>

<script setup lang="ts">
import {Plus,Edit,Delete} from '@element-plus/icons-vue'
</script>
<style scoped lang="scss">
div {
  width: 600px;
  height: 200px;
  background: yellowgreen;
  h1 {
    color: hotpink;
  }
}
</style>

