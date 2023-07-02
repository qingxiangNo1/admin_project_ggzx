<template>
    <div class="layout_contain">
        <h1></h1>
        <div class="layout_left">123</div>
        <div class="layout_top">456</div>
        <div class="layout_main">
            <p style="height: 100000px">woshi ni die</p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.layout_contain{
    width:100%;
    height:100vh;
    background: yellowgreen;
}
.layout_left{
    width:$left-menu-width;
    height: 100vh;
    background:$left-menu-background;
}
.layout_top{
    position: fixed;
    width:calc(100% - $left-menu-width);
    height: $top-menu-height;
    background: hotpink;
    right:0px;
    top:0px;
}
.layout_main{
    position: absolute;
    width:calc(100% - $left-menu-width);
    height: calc(100vh - $top-menu-height);
    background:red;
    right: 0px;
    top:50px;
    padding: 20px;
    overflow: auto;
}
</style>