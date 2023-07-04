import router from "./router";
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
router.beforeEach((to,from,next) => {
    nprogress.start()
    next();
})

router.afterEach((to,from) => {
    nprogress.done();
})
