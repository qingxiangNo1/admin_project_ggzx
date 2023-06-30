//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入登录需要的参数类型
import {loginForm,loginResponseData} from '@/api/user/type'
//引入登录接口
import { reqLogin } from '@/api/user'
import {userState} from './types/type'
//引入存储函数
import { SET_TOKEN,GET_TOKEN } from '@/utils/token'
//创建用户小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据的地方
    state: ():userState => {
        return {
            token:GET_TOKEN()//用户唯一标识token
        }
    },
    actions:{
        // 登录请求
        async userLogin(data:loginForm){
            // 登录请求：成功200-》token
            //登录请求：失败201-》错误信息
             let result:loginResponseData = await reqLogin(data);
             console.log(result);
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
        }
    },
    
    
})
// 对外暴露获取小仓库的方法
export default useUserStore