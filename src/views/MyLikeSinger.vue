<template>
    <div class="bg-white py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div v-if="singers.length > 0">
                <div class="mx-auto max-w-2xl">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">我喜欢的歌手</h2>
                    <p class="mt-4 text-lg leading-8 text-gray-500">这些是我最喜欢的歌手,他们的音乐给我带来了无尽的快乐和灵感。</p>
                </div>
                <ul role="list"
                    class="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    <li v-for="singer in singers" :key="singer.id"
                        class="group flex flex-col items-center rounded-lg bg-white p-3 shadow transition duration-300 ease-in-out hover:shadow-md hover:bg-gray-50"
                        @click="navigateToSingerDetail(singer.id)">
                        <div class="relative h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28">
                            <img class="h-full w-full object-cover" :src="singer.avatar_url" :alt="singer.name" />
                            <div
                                class="absolute inset-0 bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            </div>
                        </div>
                        <h3
                            class="mt-2 text-center text-sm font-medium text-gray-800 sm:text-base group-hover:text-emerald-700">
                            {{ singer.name }}</h3>
                        <p class="text-center text-xs text-gray-500">{{ singer.stage_name }}</p>
                        <div class="mt-1 flex items-center text-xs text-gray-400">
                            <HeartIcon class="h-4 w-4 mr-1 text-emerald-600" />
                            <span>{{ singer.followers_count }}</span>
                        </div>
                    </li>
                </ul>
                <div v-if="hasMore" class="mt-8">
                    <button @click="loadMoreSingers"
                        class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
                        加载更多
                    </button>
                </div>
            </div>
            <div v-else class="mx-auto max-w-2xl">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">您还没有关注任何歌手</h2>
                <p class="mt-4 text-lg leading-8 text-gray-500">去发现一些优秀的歌手,开始您的音乐之旅吧!</p>
                <button @click="navigateToDiscoverSingers"
                    class="mt-8 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
                    发现歌手
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="MyLikeSinger">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { SingerInfo } from '../types/global'
import { UserFollowedSingersInfoList } from '../api/httpClient'
import { useUserStore } from '../store/user' // 假设您有一个用户存储
import { HeartIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const userStore = useUserStore()

const userId = userStore.getUserId()
const singers = ref<SingerInfo[]>([])
const hasMore = ref(false)
const currentPage = ref(0)
const pageSize = 8

const navigateToSingerDetail = (singerId: number) => {
    router.push(`/singer-detail/${singerId}`)
}

const navigateToDiscoverSingers = () => {
    router.push('/singer-search')
}

const fetchSingers = async () => {
    try {
        const followResponse = await UserFollowedSingersInfoList(userId, pageSize, currentPage.value * pageSize)
        if (followResponse.data.singer_info_list && followResponse.data.singer_info_list.length > 0) {
            singers.value = [...singers.value, ...followResponse.data.singer_info_list]
            currentPage.value++
            hasMore.value = followResponse.data.has_more
        } else {
            hasMore.value = false
        }
    } catch (error) {
        console.error('获取关注歌手列表失败', error)
        // 不要清空现有的歌手列表
        hasMore.value = false
    }
}

const loadMoreSingers = () => {
    fetchSingers()
}

onMounted(() => {
    fetchSingers()
})
</script>

<style scoped>
/* 如果需要,可以在这里添加自定义样式 */
</style>
