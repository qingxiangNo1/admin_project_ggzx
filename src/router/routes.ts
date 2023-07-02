export const constantRoute = [
    {
        //登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',//菜单标题
            hidden:true,//代表路由标题在菜单中是否隐藏 true：隐藏 false：不隐藏

        }
    },
    {
        //登陆成功后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: 'layout',
            hidden:false,//代表路由标题在菜单中是否隐藏 true：隐藏 false：不隐藏
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    hidden:false,//代表路由标题在菜单中是否隐藏 true：隐藏 false：不隐藏
                }
            },
            {
                path: '/ceshi',
                component: () => import('@/views/home/index.vue'),
                name: 'ceshi',
                meta: {
                    title: '测试',
                    hidden:false,//代表路由标题在菜单中是否隐藏 true：隐藏 false：不隐藏
                }
            }
        ]
    },
    {
        //404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden:true,//代表路由标题在菜单中是否隐藏 true：隐藏 false：不隐藏
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden:true,//代表路由标题在菜单中是否隐藏 true：隐藏 false：不隐藏
        }
    }
]