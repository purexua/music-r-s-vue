<template>
  <section class="isolate overflow-hidden bg-white px-6 lg:px-8">
    <div class="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
      <div
        class="absolute left-1/2 top-0 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,theme(colors.indigo.100),white)] opacity-20 lg:left-36" />
      <div
        class="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />

      <figure class="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
        <div class="col-end-1 w-full lg:row-span-4 lg:w-80">
          <img class="rounded-xl bg-indigo-50 lg:rounded-3xl w-full h-auto" :src="album.cover_url"
            :alt="album.album_name" />
        </div>
        <figcaption class="text-base lg:col-start-1 lg:row-start-3">
          <h1 class="text-3xl font-bold text-gray-900">{{ album.album_name }}</h1>
          <div class="mt-1 text-xl text-gray-500">{{ album.singer_name }}</div>
          <div class="mt-2 text-sm text-gray-600">发行时间：{{ formatDate(album.release_date) }}</div>
        </figcaption>
      </figure>
    </div>
  </section>

  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-12">
    <h2 class="text-2xl font-bold mb-6">专辑音乐列表</h2>


    <div class="mt-4 flex flex-1 justify-between items-center">
      <span class="text-sm text-gray-700">
        显示第 {{ startIndex }} 到 {{ endIndex }} 项，共 {{ totalCount }} 项
      </span>
      <div class="flex justify-end">
        <button @click="previousPage" :disabled="currentPage === 1"
          class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed">
          上一页
        </button>
        <button @click="nextPage" :disabled="!hasNextPage"
          class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed">
          下一页
        </button>
      </div>
    </div>
    <MusicCard :musicList="musciCardList" />
  </div>
</template>

<script setup lang="ts" name="AlbumDetail">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import MusicCard from '../components/MusicCard.vue'
import { AlbumInfo, MusicSCardInfo, DefaultAlbumInfo } from '../types/global'
import { getMusicCardInfoByAlbumId, getAlbumById } from '../api/httpClient'

const route = useRoute()
const album = ref<AlbumInfo>(DefaultAlbumInfo)
const musciCardList = ref<MusicSCardInfo[]>([])

const currentPage = ref(1)
const pageSize = 20 // 每页显示的音乐数量
const totalCount = ref(0)
const albumId = ref(Number(route.params.id))

const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1)
const endIndex = computed(() => Math.min(currentPage.value * pageSize, totalCount.value))
const hasNextPage = computed(() => endIndex.value < totalCount.value)

onMounted(() => {
  fetchAlbumDetails()
  fetchMusicList()
})

watch(currentPage, () => {
  fetchMusicList()
})

async function fetchAlbumDetails() {
  if (albumId.value) {
    const response = await getAlbumById(albumId.value)
    album.value = response.data
  }
}

async function fetchMusicList() {
  const offset = (currentPage.value - 1) * pageSize
  const response = await getMusicCardInfoByAlbumId(albumId.value, pageSize, offset)
  if (response.code === 0) {
    if (response.data.count > 0) {
      musciCardList.value = response.data.music_card_list_info 
    }
    totalCount.value = response.data.count  
  } else {
    console.error('获取音乐列表失败:', response.msg)
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (hasNextPage.value) {
    currentPage.value++
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}
</script>