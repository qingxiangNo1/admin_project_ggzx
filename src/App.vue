<template>
  <div>
    <h1>woaini</h1>
    <el-button type="primary">hhhh</el-button>
    <h1>wozhengzaiceshi</h1>
    <el-button type="primary" size="default" :icon="Plus"></el-button>
    <el-button type="success" size="small" :icon="Edit"></el-button>
    <el-button type="danger" size="default" :icon="Delete"></el-button>
    <Svgicon name="welcome" color="blank" width="100px" height="100px"></Svgicon>

  </div>
</template>

<script setup lang="ts">
import {Plus,Edit,Delete} from '@element-plus/icons-vue'
import Svgicon from '@/components/SvgIcon/index.vue'
</script>
<style scoped lang="scss">
div {

  }
</style>

