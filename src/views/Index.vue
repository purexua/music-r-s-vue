<template>
    <div class="min-h-full">
        <NavBar :navigation="navigation" :notificationNavigation="notificationNavigation"
            :userNavigation="userNavigation" />
        <main class="mx-auto px-4 py-2 sm:px-6 lg:px-8">
            <RouterView />
        </main>

    </div>
</template>

<script setup lang="ts" name="Index">
import NavBar from '../components/NavBar.vue'
import { EnvelopeIcon, HandThumbUpIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '../store/user'
import { onMounted } from 'vue'
import { getUserInfo } from '../api/httpClient'
import { NavigationItem, UserInfo } from '../types/global'

const userStore = useUserStore()

onMounted(async () => {
    try {
        const userId = userStore.userId
        if (userId) {
            const result = await getUserInfo(userId)
            if (result.code === 0) {
                let info: UserInfo = result.data.user_info
                localStorage.setItem('user_info', JSON.stringify(info))
                userStore.setUserInfo(info)
            } else {
                console.error('获取用户信息失败:', result.msg)
            }
        }
    } catch (error) {
        console.error('获取或设置用户信息失败', error)
    }
})

const navigation: NavigationItem[] = [
    { index: 0, name: '推荐', href: '/feed', title: 'For You' },
    { index: 1, name: '巅峰榜', href: '/top-list', title: 'Top List' },
    { index: 2, name: '音乐', href: '/music-search', title: 'Music' },
    { index: 3, name: '歌手', href: '/singer-search', title: 'Singer' },
    { index: 4, name: '歌单', href: '/playlist-search', title: 'Playlist' },
]


const notificationNavigation: NavigationItem[] = [
    { index: 0, name: '消息', href: '/message', title: 'Message', icon: EnvelopeIcon },
    { index: 1, name: '收到的点赞', href: '/received-like', title: 'Received Like', icon: HandThumbUpIcon },
    { index: 2, name: '收到的评论', href: '/received-comment', title: 'Received Comment', icon: ChatBubbleLeftRightIcon },
]

const userNavigation: NavigationItem[][] = [
    [{ index: 0, name: '我的主页', href: '/about-me', title: 'My Profile' }],
    [
        { index: 1, name: '我喜欢', href: '/my-like', title: 'My Like' },
        { index: 2, name: '我的歌单', href: '/my-playlist', title: 'My Playlist' },
        { index: 3, name: '设置', href: '/settings', title: 'Settings' },

    ],
    [
        { index: 4, name: '反馈', href: '/feedback', title: 'Feedback' },
        { index: 5, name: '关于', href: '/about', title: 'About' },
        { index: 6, name: '登出', href: '/logout', title: 'Logout' },
    ],
]
</script>

<style scoped>
.index {
    margin-top: 60px;
}
</style>