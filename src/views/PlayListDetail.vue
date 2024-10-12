<template>
    <div class="container mx-auto px-4 py-8">
        <section class="mb-12">
            <div class="flex flex-col md:flex-row items-start gap-8">
                <img :src="playlist.cover_url" :alt="playlist.playlist_name"
                    class="w-64 h-64 object-cover rounded-lg shadow-lg" />
                <div class="flex-1">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-3xl font-bold">{{ playlist.playlist_name }}</h1>
                        <button @click="toggleLikePlaylist"
                            class="flex items-center px-4 py-2 rounded-full border transition-colors duration-200"
                            :class="isLiked ? 'bg-red-100 border-red-300 text-red-600' : 'bg-gray-100 border-gray-300 text-gray-600'">
                            <HeartIcon class="w-5 h-5 mr-2" :class="isLiked ? 'text-red-500' : 'text-gray-500'" />
                            {{ isLiked ? '取消喜欢' : '喜欢歌单' }}
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div><span class="font-medium">创建者：</span>{{ playlist.user_id }}</div>
                        <div><span class="font-medium">创建时间：</span>{{ formatDate(playlist.creation_date) }}</div>
                        <div><span class="font-medium">喜欢数：</span>{{ formatNumber(playlist.like_count) }}</div>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <h2 class="font-medium mb-2">歌单简介</h2>
                        <p class="text-gray-700">{{ playlist.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold mb-6">歌单音乐列表</h2>
            <MusicCard :musicList="musicCardList" />
            <div class="flex justify-between items-center mt-4">
                <span class="text-sm text-gray-600">
                    显示第 {{ startIndex }} 到 {{ endIndex }} 项，共 {{ totalCount }} 项
                </span>
                <div>
                    <button @click="previousPage" :disabled="currentPage === 1"
                        class="px-3 py-2 rounded-md bg-white border text-sm font-medium text-gray-700 mr-2 disabled:opacity-50">
                        上一页
                    </button>
                    <button @click="nextPage" :disabled="!hasNextPage"
                        class="px-3 py-2 rounded-md bg-white border text-sm font-medium text-gray-700 disabled:opacity-50">
                        下一页
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import MusicCard from '../components/MusicCard.vue'
import { HeartIcon } from '@heroicons/vue/24/outline'
import { PlaylistInfo, MusicSCardInfo, DefaultPlaylistInfo } from '../types/global'
import { getPlaylistDetail, getPlaylistMusicCardList, checkUserLikedPlaylist, likePlaylist, unlikePlaylist } from '../api/httpClient'

const route = useRoute()
const playlist = ref<PlaylistInfo>(DefaultPlaylistInfo)
const musicCardList = ref<MusicSCardInfo[]>([])
const currentPage = ref(1)
const pageSize = 20
const totalCount = ref(0)
const playlistId = ref(Number(route.params.id))
const userId = Number(localStorage.getItem('user_id'))
const isLiked = ref(false)

const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1)
const endIndex = computed(() => Math.min(currentPage.value * pageSize, totalCount.value))
const hasNextPage = computed(() => endIndex.value < totalCount.value)

onMounted(async () => {
    await Promise.all([fetchPlaylistDetails(), fetchMusicList(), checkPlaylistLikeStatus()])
})

watch(currentPage, fetchMusicList)

async function fetchPlaylistDetails() {
    try {
        const response = await getPlaylistDetail(playlistId.value)
        if (response.code === 0) {
            playlist.value = response.data
        } else {
            console.error('获取歌单详情失败:', response.message)
        }
    } catch (error) {
        console.error('获取歌单详情出错:', error)
    }
}

async function fetchMusicList() {
    try {
        const offset = (currentPage.value - 1) * pageSize
        const response = await getPlaylistMusicCardList(playlistId.value, offset, pageSize)
        if (response.code === 0) {
            musicCardList.value = response.data.music_card_info_list || []
            totalCount.value = response.data.count
        } else {
            console.error('获取歌单音乐列表失败:', response.message)
        }
    } catch (error) {
        console.error('获取歌单音乐列表出错:', error)
    }
}

async function checkPlaylistLikeStatus() {
    try {
        const response = await checkUserLikedPlaylist(userId, playlistId.value)
        isLiked.value = response.data
    } catch (error) {
        console.error('检查歌单收藏状态出错:', error)
    }
}

async function toggleLikePlaylist() {
    try {
        if (isLiked.value) {
            await unlikePlaylist(userId, playlistId.value)
            playlist.value.like_count--
        } else {
            await likePlaylist(userId, playlistId.value)
            playlist.value.like_count++
        }
        isLiked.value = !isLiked.value
    } catch (error) {
        console.error('切换歌单收藏状态出错:', error)
    }
}

function previousPage() {
    if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
    if (hasNextPage.value) currentPage.value++
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatNumber(num: number): string {
    if (num == null) return '0'

    if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
    }

    return num.toLocaleString('zh-CN')
}
</script>
