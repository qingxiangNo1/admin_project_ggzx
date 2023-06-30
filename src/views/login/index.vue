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
                        <el-button type="primary" class="login_btn">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User,Lock } from '@element-plus/icons-vue';
import { reactive } from 'vue';
//收集账号和密码的数据
let loginForm = reactive({username:'admin',password:'111111'})
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