//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入登录需要的参数类型
import {loginForm,loginResponseData} from '@/api/user/type'
//引入登录接口
import { reqLogin,reqUserinfo } from '@/api/user'
import {userState} from './types/type'
//引入存储函数
import { SET_TOKEN,GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由（常量路由）
import { constantRoute } from '@/router/routes'
//创建用户小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据的地方
    state: ():userState => {
        return {
            token:GET_TOKEN(),//用户唯一标识token
            menuRoutes:constantRoute,//仓库存储数据生成菜单需要数组（路由）
            username:'',
            avatar:''
            
        }
    },
    actions:{
        //处理异步||逻辑
        // 登录请求
        async userLogin(data:loginForm){
            // 登录请求：成功200-》token
            //登录请求：失败201-》错误信息
             let result:loginResponseData = await reqLogin(data);
             if(result.code==200){
                // pinia仓库存储一下token
                this.token = (result.data.token as string);
                //本地持久化存储一份
              SET_TOKEN(result.data.token as string)
                //保证返回结果
                return 'ok'
             }else{
               return Promise.reject(new Error(result.data.message))
             }
        },
        // 获取用户信息的方法
        async userInfo(){
            let result = await reqUserinfo();
            if(result.code==200){
                this.username = result.data.checkUser.username;
                this.avatar = result.data.checkUser.avatar
            }
        },
        // 用户退出登录方法
        userLogout(){
            //需要调用一个退出登录接口 ， 使用以下代替
            this.token = ''
            this.avatar = ''
            this.username = ''
            REMOVE_TOKEN();//移除本地token存储
        },

    },
    
    
})
// 对外暴露获取小仓库的方法
export default useUserStore