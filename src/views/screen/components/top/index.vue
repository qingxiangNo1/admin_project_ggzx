<template>
    <div class="top">
        <div class="left">
            <span class="llbtn" @click="goHome">条令构建</span>
            <span class="lrbtn" @click="goHome">条令应用</span>
        </div>
        <div class="center">
            <div class="title"></div>
        </div>
        <div class="right">
            <span class="rlbtn">条令管理</span>
            <span class="rrbtn" @click="goHome">体系构建</span>
            <!-- <span class="time">当前时间:{{ time }}</span> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useRouter } from 'vue-router';
import { onMounted,onBeforeUnmount,ref } from 'vue';
//存储当前时间
let $router = useRouter()
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'));
let timer = ref(0);
const goHome = () => {
    $router.push('/home')
}
onMounted(() => {
     timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
    },1000)
 })
 onBeforeUnmount(() => {
    clearInterval(timer.value)
 })
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 70px;
    display: flex;

    .left {
        flex: 1;
        // background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        // background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .llbtn {
            width: 150px;
            height: 40px;
            background: url(../../images/tiaolingguanli.png) no-repeat;
            background-size: 100% 100%;
            float: right;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }
        .lrbtn {
            width: 150px;
            height: 40px;
            background: url(../../images/tiaolingguanli.png) no-repeat;
            background-size: 100% 100%;
            float: right;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }
    }

    .right {
        flex: 1;
        // background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        // background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rlbtn{
            background:url(../../images/tiaolingguanli.png) no-repeat;
            background-size: 100% 100%;
            float: left;
            width: 150px;
            height: 40px;
            top:30px;
            text-align: center;
            color: #29fcff;
            line-height: 40px;
            font-size: 20px;
        }
        .rrbtn{
            background:url(../../images/tiaolingguanli.png) no-repeat;
            background-size: 100% 100%;
            float: left;
            width: 150px;
            height: 40px;
            top:30px;
            text-align: center;
            color: #29fcff;
            line-height: 40px;
            font-size: 20px;
        }
        .time{
            text-align: center;
            color: #29fcff;
            line-height: 40px;
            font-size: 20px;
        }


    }

    .center {
        flex: 3;
        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/biaoti.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 30px;


        }
    }
}</style>