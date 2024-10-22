<template>
  <div class="bg-white py-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">For you</h1>
    <div class="space-y-6">
      <MusicList :musics="recommendMusicList" />
    </div>
    <div class="mt-8 flex justify-center" v-if="recommendMusicList.length > 0">
      <button @click="loadMore"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        :disabled="isLoading">
        {{ isLoading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MusicInfo } from '../types/global'
import { useUserStore } from '../store/user'
import { recommendFunctionBuildUserProfileByMusic, recommendFunctionBuildUserProfileBySinger, getRecommendedMusic } from '../api/httpClient'
import MusicList from '../components/list/MusicList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const recommendMusicList = ref<MusicInfo[]>([])
const isLoading = ref(false)
const limit = 10

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
  }
  await loadCachedRecommendations()
  if (recommendMusicList.value.length === 0) {
    await fetchInitialRecommendations()
  }
})

async function loadCachedRecommendations() {
  const cachedList = localStorage.getItem('recommendMusicList')
  if (cachedList) {
    recommendMusicList.value = JSON.parse(cachedList)
  }
}

async function fetchInitialRecommendations() {
  await recommendFunctionBuildUserProfileByMusic(userStore.userId)
  await recommendFunctionBuildUserProfileBySinger(userStore.userId)
  await fetchRecommendMusicList()
}

async function fetchRecommendMusicList() {
  const recommendList = await getRecommendedMusic(userStore.userId, limit)
  recommendMusicList.value = [...recommendMusicList.value, ...recommendList.data]
  localStorage.setItem('recommendMusicList', JSON.stringify(recommendMusicList.value))
}

async function loadMore() {
  if (isLoading.value) return

  isLoading.value = true

  try {
    await fetchRecommendMusicList()
  } catch (error) {
    console.error('加载更多音乐失败:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
