//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入登录需要的参数类型
import { loginFormData, loginResponseData, userInfoReponseData } from '@/api/user/type'
//引入登录接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { userState } from './types/type'
//引入存储函数
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由（常量路由）
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
//引入深拷贝方法
//@ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
    return asnycRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                //硅谷333账号:product\trademark\attr\sku
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
    })
}

//创建用户小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据的地方
    state: (): userState => {
        return {
            token: GET_TOKEN(),//用户唯一标识token
            menuRoutes: constantRoute,//仓库存储数据生成菜单需要数组（路由）
            username: '',
            avatar: ''
        }
    },
    actions: {
        //处理异步||逻辑
        // 登录请求
        async userLogin(data: loginFormData) {
            // 登录请求：成功200-》token
            //登录请求：失败201-》错误信息
            const result: loginResponseData = await reqLogin(data);
            if (result.code == 200) {
                // pinia仓库存储一下token
                this.token = (result.data as string);
                //本地持久化存储一份
                SET_TOKEN(result.data as string)
                //保证返回结果
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 获取用户信息的方法
        async userInfo() {
            let result: userInfoReponseData = await reqUserInfo();
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar
                //计算当前用户需要展示的异步路由
                const userAsyncRoute = filterAsyncRoute(
                    cloneDeep(asnycRoute),
                    result.data.routes,
                )
                //菜单需要的数据整理完毕
                this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
                    //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
                    ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
                        router.addRoute(route)
                    })
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 用户退出登录方法
        async userLogout() {
            let result: any = await reqLogout();
            if (result.code == 200) {
                //需要调用一个退出登录接口 ， 使用以下代替
                this.token = ''
                this.avatar = ''
                this.username = ''
                REMOVE_TOKEN();//移除本地token存储
                return 'ok'; //退出成功返回一个成功的promise
            } else {
                return Promise.reject(new Error(result.message))//退出失败返回一个失败的promise
            }
        },
    },
})
// 对外暴露获取小仓库的方法
export default useUserStore