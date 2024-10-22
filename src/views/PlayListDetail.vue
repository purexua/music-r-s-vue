<template>
  <div class="container mx-auto px-4 py-8 bg-white">
    <section class="mb-12">
      <div class="flex flex-col md:flex-row items-start gap-8">
        <img :src="playlist?.cover_url" :alt="playlist?.playlist_name"
             class="w-64 h-64 object-cover rounded-lg shadow-lg"/>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-3xl font-bold text-gray-800">{{ playlist?.playlist_name }}</h1>

            <button @click="toggleLikePlaylist"
                    class="group flex items-center px-4 py-2 rounded-full border transition-all duration-300 ease-in-out transform hover:scale-110"
                    :class="isLiked ? 'bg-gray-100 border-gray-300 text-emerald-700' : 'bg-gray-100 border-gray-300 text-gray-600 hover:text-emerald-700'">
              <component :is="isLiked ? SolidHeartIcon : HeartIcon" :class="[
                                isLiked ? 'text-red-700' : 'text-gray-500',
                                'h-7 w-7 transition-all duration-300 ease-in-out',
                                'group-hover:rotate-12'
                            ]"/>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div><span class="font-medium text-gray-600">创建者：</span><span class="text-gray-500">{{
                playlist?.user_id
              }}</span></div>
            <div><span class="font-medium text-gray-600">创建时间：</span><span class="text-gray-500">{{
                playlist?.creation_date ? formatDate(playlist?.creation_date) : "未知"
              }}</span></div>
            <div><span class="font-medium text-gray-600">喜欢数：</span><span class="text-gray-500">{{
                playlist?.like_count ? formatNumber(playlist?.like_count) : "0"
              }}</span></div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h2 class="font-medium mb-2 text-gray-700">歌单简介</h2>
            <p class="text-gray-600">{{ playlist?.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-6 text-gray-800">歌单音乐列表</h2>
      <div v-if="totalCount > 0">
        <div class="flex justify-between items-center mt-4">
                    <span class="text-sm text-gray-500">
                        显示第 {{ startIndex }} 到 {{ endIndex }} 项，共 {{ totalCount }} 项
                    </span>
          <div>
            <button @click="previousPage" :disabled="currentPage === 1"
                    class="px-3 py-2 rounded-md bg-white border text-sm font-medium text-gray-600 mr-2 disabled:opacity-50 hover:text-emerald-700">
              上一页
            </button>
            <button @click="nextPage" :disabled="!hasNextPage"
                    class="px-3 py-2 rounded-md bg-white border text-sm font-medium text-gray-600 disabled:opacity-50 hover:text-emerald-700">
              下一页
            </button>
          </div>
        </div>
        <MusicCard :musicList="musicCardList"/>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-12 text-gray-500">
        <MusicalNoteIcon class="w-16 h-16 mb-4 animate-bounce text-emerald-600"/>
        <p class="text-xl font-medium mb-2 text-gray-700">这个歌单还没有音乐哦</p>
        <p class="text-sm">快去添加一些好听的歌曲吧！</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, computed} from 'vue'
import {useRoute} from 'vue-router'
import MusicCard from '../components/card/MusicCard.vue'
import {HeartIcon} from '@heroicons/vue/24/outline'
import {PlaylistInfo, MusicSCardInfo} from '../types/global'
import {
  getPlaylistDetail,
  getPlaylistMusicCardList,
  checkUserLikedPlaylist,
  likePlaylist,
  unlikePlaylist,
  recommendFunctionUserBrowsePlaylist
} from '../api/httpClient'
import {MusicalNoteIcon} from '@heroicons/vue/24/outline'
import {HeartIcon as SolidHeartIcon} from '@heroicons/vue/24/solid'
import {useUserStore} from '../store/user'

const route = useRoute()
const userStore = useUserStore()

const userId = userStore.getUserId()
const playlist = ref<PlaylistInfo>()
const musicCardList = ref<MusicSCardInfo[]>([])
const currentPage = ref(1)
const pageSize = 20
const totalCount = ref(0)
const playlistId = ref(Number(route.params.id))
const isLiked = ref(false)

const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1)
const endIndex = computed(() => Math.min(currentPage.value * pageSize, totalCount.value))
const hasNextPage = computed(() => endIndex.value < totalCount.value)

onMounted(async () => {
  await Promise.all([fetchPlaylistDetails(), fetchMusicList(), checkPlaylistLikeStatus(), recommendFunctionUserBrowsePlaylist(userId, playlistId.value)])
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
  if (playlist.value === undefined) {
    return
  }
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
  return new Date(dateString).toLocaleDateString('zh-CN', {year: 'numeric', month: 'long', day: 'numeric'})
}

function formatNumber(num: number): string {
  if (num == null) return '0'

  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }

  return num.toLocaleString('zh-CN')
}
</script>
