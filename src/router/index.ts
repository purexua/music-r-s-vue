import {createRouter,createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/Index.vue'),
        },
        {
            path: '/login',
            component: () => import('../components/Login.vue'),
        },
        {
            path: '/register',
            component: () => import('../components/Register.vue'),
        },
        {
            path: '/test',
            component: () => import('../components/Test.vue'),
        },
    ],
});

export default router

