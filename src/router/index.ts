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
                    path: 'album-search',
                    component: () => import('../views/AlbumSearch.vue'),
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
                    path: '/music/:music_id',
                    component: () => import('../views/MusicPlayerPage.vue')
                },
                {
                    path: '/album-detail/:id',
                    component: () => import('../views/AlbumDetail.vue'),
                },
                {
                    path: 'singer-detail/:id',
                    component: () => import('../views/SingerDetail.vue'),
                    children: [
                        {
                            path: '',
                            name: 'default',
                            component: () => import('../views/SingerForYou.vue'),
                        },
                        {
                            path: 'for-you',
                            component: () => import('../views/SingerForYou.vue'),
                        },
                        {
                            path: 'music',
                            component: () => import('../views/SingerMusic.vue'),
                        },
                        {
                            path: 'albums',
                            component: () => import('../views/SingerAlbums.vue'),
                        },
                        {
                            path: 'mv',
                            component: () => import('../views/SingerMV.vue'),
                        },
                    ],
                },
                {
                    path: '/playlist-detail/:id',
                    component: () => import('../views/PlayListDetail.vue'),
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
                    children: [
                        {
                            path: 'my-like',
                            component: () => import('../views/MyLike.vue'),
                            children: [
                                {
                                    path: 'music',
                                    component: () => import('../views/MyLikeMusic.vue'),
                                },
                                {
                                    path: 'album',
                                    component: () => import('../views/MyLikeAlbum.vue'),
                                },
                                {
                                    path: 'playlist',
                                    component: () => import('../views/MyLikePlayList.vue'),
                                },
                            ],
                        },
                        {
                            path: 'my-playlist',
                            component: () => import('../views/MyPlaylist.vue'),
                        },
                        {
                            path: 'my-follow-singer',
                            component: () => import('../views/MyLikeSinger.vue'),
                        },
                        {
                            path: 'settings',
                            component: () => import('../views/Settings.vue'),
                        },
                    ],
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
        {
            path: '/error/:errorCode',
            component: () => import('../views/Error.vue'),
        },
        {
            path: '/contact',
            component: () => import('../views/Contact.vue'),
        }
    ],
});

export default router

