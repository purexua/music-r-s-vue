import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/Index.vue'),
            redirect: '/feed',
            children: [
                {
                    path: 'feed',
                    component: () => import('../views/Feed.vue'),
                },
                {
                    path: 'top-list',
                    component: () => import('../views/TopList.vue'),
                },
                {
                    path: 'music-search',
                    component: () => import('../views/MusicSearch.vue'),
                },
                {
                    path: 'singer-search',
                    component: () => import('../views/Singer.vue'),
                },
                {
                    path: 'playlist-search',
                    component: () => import('../views/Playlist.vue'),
                },
                {
                    path: 'message',
                    component: () => import('../views/Message.vue'),
                },
                {
                    path: 'received-like',
                    component: () => import('../views/ReceivedLike.vue'),
                },
                {
                    path: 'received-comment',
                    component: () => import('../views/ReceivedComment.vue'),
                },
                {
                    path: 'about-me',
                    component: () => import('../views/AboutMe.vue'),
                },
                {
                    path: 'my-like',
                    component: () => import('../views/MyLike.vue'),
                },
                {
                    path: 'my-playlist',
                    component: () => import('../views/MyPlaylist.vue'),
                },
                {
                    path: 'settings',
                    component: () => import('../views/Settings.vue'),
                },
                {
                    path: 'feedback',
                    component: () => import('../views/Feedback.vue'),
                },
                {
                    path: 'about',
                    component: () => import('../views/About.vue'),
                }
            ],
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

