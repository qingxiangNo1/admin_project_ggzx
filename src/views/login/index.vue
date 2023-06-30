<template>
    <div class="login_contain">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎访问庆祥甄选</h2>
                    <el-form-item>
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" class="login_btn" @click="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User,Lock } from '@element-plus/icons-vue';
import { reactive,ref } from 'vue';
import useUserStore from "@/store/modules/user";
import {useRouter} from 'vue-router'
import { ElNotification } from 'element-plus';
let useStore = useUserStore()
let loading = ref(false)
// 获取路由器
let $router = useRouter()
//收集账号和密码的数据
let loginForm = reactive({username:'admin',password:'111111'})
const login  = async() => {
  try {
    //登录加载效果开始
    loading.value = true
    // 保证登陆成功
    await useStore.userLogin(loginForm);
    // 编程式导航跳转到数据首页
    $router.push('/')
    // 登陆成功提示信息
    ElNotification  ({
        type:'success',
        message:'登陆成功'
    })
  } catch (error) {
    //登录加载效果结束
    loading.value = false
    //登录失败的提示信息
    ElNotification ({
        type:'error',
        message:error.message
    })
  }
}
</script>

<style scoped lang="scss">
.login_contain {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
}
.login_form{
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
h1{
    color: white;
    font-size: 40px;
}
h2{
    color: white;
    font-size: 20px;
    margin: 20px 0px;
}
.login_btn{
    width:100%;
}
el-input{
    margin: 0px 20px;
}
}
</style>