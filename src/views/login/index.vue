<template>
    <div class="login_contain">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎访问庆祥甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login_btn" @click="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from 'vue-router';//引入路由器和路由
import { ElNotification } from 'element-plus';
import { GET_TIME } from '@/utils/time';//引入获取当前时间的函数
let useStore = useUserStore()
let loading = ref(false)
let $router = useRouter()// 获取路由器
let $route = useRoute()//获取路由
let loginForms = ref()
//收集账号和密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
//自定义校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
    if (value.length >= 5 && value.length <= 10) {
        callback();
    } else {
        callback(new Error('账号长度是5-10位'))
        console.log(rule);
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length >= 6 && value.length <= 15) {
        callback();
    } else {
        callback(new Error('密码长度是6-15位'))
        console.log(rule);
    }
}
const rules = {
    //规则对象属性：
    //required，代表这个字段是务必校验的
    //message：错误提示信息
    //trigger：触发方式blur 是失去焦点 change是文本发生改变时
    //min：规则内可输入最小文本
    //max：规则内可输入最多文本
    username: [
        // {required:true,message:'用户名不能为空',trigger:"blur"},
        // {required:true,min:6,max:10,message:'账号长度在6-10位',trigger:'change'}
        { required: true, validator: validatorUserName, trigger: 'change' }
    ],
    password: [
        // {requird:true,min:6,max:15,message:'密码的长度在6-15位',trigger:'change'}
        { trigger: 'change', validator: validatorPassword }
    ]
}
//登录按钮回调
const login = async () => {
    await loginForms.value.validate();
    //登录加载效果开始
    loading.value = true
    try {
        // 保证登陆成功
        await useStore.userLogin(loginForm);
        let redirect: any = $route.query.redirect
        // 编程式导航跳转到数据首页
        $router.push({ path: redirect || '/' })
        // 登陆成功提示信息
        ElNotification({
            type: 'success',
            title: '欢迎回来',
            message: `hi,庆祥,${GET_TIME()}`
        })
    } catch (error: any) {
        //登录加载效果结束
        loading.value = false
        //登录失败的提示信息
        ElNotification({
            type: 'error',
            message: error.message
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

.login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;

    h1 {
        color: white;
        font-size: 40px;
    }

    h2 {
        color: white;
        font-size: 20px;
        margin: 20px 0px;
    }

    .login_btn {
        width: 100%;
    }

    el-input {
        margin: 0px 20px;
    }
}</style>