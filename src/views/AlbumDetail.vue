<template>
  <div class="container mx-auto px-4 py-8">
    <section class="mb-12">
      <div class="flex flex-col md:flex-row items-start gap-8">
        <img :src="album.cover_url" :alt="album.album_name" class="w-64 h-64 object-cover rounded-lg shadow-lg" />
        <div class="flex-1">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-3xl font-bold">{{ album.album_name }}</h1>
            <button @click="toggleLikeAlbum"
              class="flex items-center px-4 py-2 rounded-full border transition-colors duration-200"
              :class="isLiked ? 'bg-red-100 border-red-300 text-red-600' : 'bg-gray-100 border-gray-300 text-gray-600'">
              <HeartIcon class="w-5 h-5 mr-2" :class="isLiked ? 'text-red-500' : 'text-gray-500'" />
              {{ isLiked ? '取消喜欢' : '喜欢专辑' }}
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div><span class="font-medium">歌手：</span>{{ album.singer_name }}</div>
            <div><span class="font-medium">发行时间：</span>{{ formatDate(album.release_date) }}</div>
            <div><span class="font-medium">喜欢数：</span>{{ formatNumber(album.like_count) }}</div>
          </div>
          <div class="bg-gray-100 p-4 rounded-lg">
            <h2 class="font-medium mb-2">专辑简介</h2>
            <p class="text-gray-700">{{ album.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-6">专辑音乐列表</h2>
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
import { AlbumInfo, MusicSCardInfo, DefaultAlbumInfo } from '../types/global'
import { getAlbumMusicCardInfoById, getAlbumById, checkUserLikingAlbum, likeAlbum, unlikeAlbum } from '../api/httpClient'
import { HeartIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const album = ref<AlbumInfo>(DefaultAlbumInfo)
const musicCardList = ref<MusicSCardInfo[]>([])
const currentPage = ref(1)
const pageSize = 20
const totalCount = ref(0)
const albumId = ref(Number(route.params.id))
const userId = Number(localStorage.getItem('user_id'))
const isLiked = ref(false)

const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1)
const endIndex = computed(() => Math.min(currentPage.value * pageSize, totalCount.value))
const hasNextPage = computed(() => endIndex.value < totalCount.value)

onMounted(async () => {
  await Promise.all([fetchAlbumDetails(), fetchMusicList(), checkAlbumLikeStatus()])
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
    const response = await checkUserLikingAlbum(userId, albumId.value)
    isLiked.value = response.data
  } catch (error) {
    console.error('检查专辑喜欢状态失败', error)
  }
}

async function toggleLikeAlbum() {
  try {
    isLiked.value = !isLiked.value
    await (isLiked.value ? likeAlbum : unlikeAlbum)(userId, albumId.value)
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
  return new Date(dateString).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatNumber(num: number): string {
  if (num == null) return ''

  // 对于大于等于10000的数字,仍然使用"万"作为单位
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }

  // 对于小于10000的数字,使用千分位分隔符格式化
  return num.toLocaleString('zh-CN')
}
</script>