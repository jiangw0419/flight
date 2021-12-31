import {createRouter, createWebHashHistory} from "vue-router";
import {isAccountLogin} from "@/utils/bridges";

const routes =
    [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/Home')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/Login')
        },
    ]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})


router.beforeEach((to, from, next) => {
    if (to.name !== 'Login') {
        isAccountLogin().then(data => {
            console.log("beforeEach------>", data)
            if (data) {
                next()
            } else {
                next({name: "Login"})
            }
        }).catch(() => {
            next({name: "Login"})
        })
    } else {
        next()
    }
})

export default router
