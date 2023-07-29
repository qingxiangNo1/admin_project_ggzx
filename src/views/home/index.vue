<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="" class="avatar">
            <div class="bottom">
                <h3 class="hello">{{ GET_TIME() + ', ' + userStore.username }}</h3>
                <h4 class="finish">qx运营平台</h4>
            </div>
        </div>
    </el-card>
    <div class="svg">
        <svg-icon name="welcome" width='300px' height='300px'></svg-icon>

    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { GET_TIME } from '@/utils/time'
let userStore = useUserStore()
</script>

<style scoped>
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .bottom {
        margin-left: 30px;

        .hello {
            font-size: 25px;
            font-weight: 700;
            margin-bottom: 50px;
        }

        .finish {
            font-style: italic;
            color: skyblue;
        }
    }
}

.svg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
}
</style>