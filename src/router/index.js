import {createRouter, createWebHashHistory} from "vue-router";
import {isAccountLogin} from "@/utils/bridges";

const routes =
    [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/Home'),
            children: [
                {
                    path: '',
                    name: '/Applications',
                    component: () => import('@/pages/Home/Applications'),
                    meta: {slideKey: 0}
                },
                {
                    path: 'applicatiton-info/:id',
                    name: '/ApplicationInfo',
                    component: () => import('@/pages/Home/ApplicationInfo')
                }, {
                    path: 'other',
                    name: '/Other',
                    component: () => import('@/pages/Home/Others'),
                    meta: {slideKey: 1}
                }
            ]
        },
        {
            path: "/download/:id",
            name: "Download",
            component: () => import("@/pages/Download")
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/Login')
        },
    ]

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
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
