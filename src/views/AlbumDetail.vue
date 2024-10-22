<template>
  <div class="container mx-auto px-4 py-8 bg-white">
    <section class="mb-12">
      <div class="flex flex-col md:flex-row items-start gap-8">
        <img :src="album?.cover_url" :alt="album?.album_name" class="w-64 h-64 object-cover rounded-lg shadow-lg"/>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-3xl font-bold text-gray-800">{{ album?.album_name }}</h1>
            <button @click="toggleLikeAlbum"
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
            <div><span class="font-medium text-gray-800">歌手：</span><span class="text-gray-600">{{
                album?.singer_name
              }}</span></div>
            <div><span class="font-medium text-gray-800">发行时间：</span><span class="text-gray-600">{{
                album?.release_date ? formatDate(album?.release_date) : "未知"
              }}</span></div>
            <div><span class="font-medium text-gray-800">喜欢数：</span><span class="text-gray-600">{{
                album?.like_count ? formatNumber(album?.like_count) : '0'
              }}</span></div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h2 class="font-medium mb-2 text-gray-800">专辑简介</h2>
            <p class="text-gray-600">{{ album?.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-6 text-gray-800">专辑音乐列表</h2>
      <MusicCard :musicList="musicCardList"/>
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
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, computed} from 'vue'
import {useRoute} from 'vue-router'
import MusicCard from '../components/card/MusicCard.vue'
import {AlbumInfo, MusicSCardInfo} from '../types/global'
import {
  getAlbumMusicCardInfoById,
  getAlbumById,
  checkUserLikingAlbum,
  likeAlbum,
  unlikeAlbum,
  recommendFunctionUserBrowseAlbum
} from '../api/httpClient'
import {HeartIcon} from '@heroicons/vue/24/outline'
import {HeartIcon as SolidHeartIcon} from '@heroicons/vue/24/solid'
import {useUserStore} from '../store/user'

const route = useRoute()
const userStore = useUserStore()
const album = ref<AlbumInfo>()
const musicCardList = ref<MusicSCardInfo[]>([])
const currentPage = ref(1)
const pageSize = 20
const totalCount = ref(0)
const albumId = ref(Number(route.params.id))
const isLiked = ref(false)

const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1)
const endIndex = computed(() => Math.min(currentPage.value * pageSize, totalCount.value))
const hasNextPage = computed(() => endIndex.value < totalCount.value)

onMounted(async () => {
  await Promise.all([fetchAlbumDetails(), fetchMusicList(), checkAlbumLikeStatus(), recommendFunctionUserBrowseAlbum(userStore.userId, albumId.value)])
})

watch(currentPage, fetchMusicList)

async function fetchAlbumDetails() {
  if (albumId.value) {
    const response = await getAlbumById(albumId.value)
    album.value = response.data
  }
}

async function fetchMusicList() {
  const offset = (currentPage.value - 1) * pageSize
  const response = await getAlbumMusicCardInfoById(albumId.value, pageSize, offset)
  if (response.code === 0) {
    musicCardList.value = response.data.music_card_info_list
    totalCount.value = response.data.count
  } else {
    console.error('获取音乐列表失败:', response.msg)
  }
}

async function checkAlbumLikeStatus() {
  try {
    const response = await checkUserLikingAlbum(userStore.userId, albumId.value)
    isLiked.value = response.data
  } catch (error) {
    console.error('检查专辑喜欢状态失败', error)
  }
}

async function toggleLikeAlbum() {
  if (album.value === undefined) {
    return
  }

  try {
    isLiked.value = !isLiked.value
    await (isLiked.value ? likeAlbum : unlikeAlbum)(userStore.userId, albumId.value)
    if (isLiked.value) {
      album.value.like_count++
    } else {
      album.value.like_count--
    }
  } catch (error) {
    console.error('切换专辑喜欢状态失败', error)
    isLiked.value = !isLiked.value // 恢复原状态
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
  // 对于大于等于10000的数字,仍然使用"万"作为单位
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }

  // 对于小于10000的数字,使用千分位分隔符格式化
  return num.toLocaleString('zh-CN')
}
</script>

