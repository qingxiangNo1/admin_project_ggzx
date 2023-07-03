<template>
    <div class="tabbar">
        <div class="tabbar-left">
            <BreadCrumb/>
        </div>
        <div class="tabbar-right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>


<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // background: linear-gradient(to right,rgb(224, 215, 215),rgb(204, 156, 156),rgb(201, 190, 190));
    background: rgb(255, 255, 255);
    .tabbar-left {
        display: flex;
        align-items: center;
        margin-left: 10px;
        background: yellowgreen;
    }

    .tabbar-right {
        display: flex;
        align-items: center;
        margin-right: 20px;

    }
}
</style>