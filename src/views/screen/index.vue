<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top></Top>
            </div>
            <div class="floor">首页</div>
            <div class="bottom">
                <div class="left">我是left</div>
                <div class="center">我是center</div>
                <div class="right">我是right</div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Top from './components/top/index.vue'
let screen = ref();
onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
});
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
}
//监听视口变化
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/dengru.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;

        .top {
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-left: 40px;

                .rank {
                    flex: 1.5;
                }

                .year {
                    flex: 1;

                }

                .count {
                    flex: 1;
                }
            }

            .left {
                flex: 1;
                height: 1040px;
                display: flex;
                flex-direction: column;

                .tourist {
                    flex: 1.2;
                }

                .sex {
                    flex: 1;

                }

                .age {
                    flex: 1;
                }
            }

            .center {
                flex: 1.5;
                display: flex;
                flex-direction: column;

                .map {
                    flex: 4;
                }

                .line {
                    flex: 1;
                }
            }
        }
        
    }
    .floor{
            width: 100%;
            height: 40px;
            margin-top: 1000px;
            text-align: center;
            color: cyan;
            font-size: 20px;

        }
}</style>