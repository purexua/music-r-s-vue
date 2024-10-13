<template>
  <div
    class="bg-white shadow rounded-lg p-6 m-6 max-w-sm mx-auto transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
    <div class="flex items-center space-x-4">
      <img :src="cover_url" alt="专辑封面" class="h-16 w-16 rounded-md object-cover">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-800 truncate">{{ title }}#{{ id }}</h3>
        <p class="text-sm text-gray-500 truncate">{{ singer_name }} • {{ album_name }}</p>
      </div>
    </div>

    <div class="mt-4">
      <div class="flex justify-between text-sm text-gray-500">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
      <input type="range" min="0" :max="duration" v-model="currentTime" @input="seek"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
    </div>

    <div class="mt-4 flex justify-between items-center">
      <button @click="toggleLike"
        class="flex items-center text-gray-400 hover:text-emerald-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
        <HeartIcon :class="['h-6 w-6', { 'text-emerald-700 fill-current': isLiked }]" />
        <span class="ml-1 text-xs">{{ likeCount }}</span>
      </button>
      <button @click="togglePlay"
        class="bg-emerald-600 text-white rounded-full p-2 hover:bg-emerald-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
        <PlayIcon v-if="!isPlaying" class="h-8 w-8" />
        <PauseIcon v-else class="h-8 w-8" />
      </button>
      <button @click="showComments"
        class="flex items-center text-gray-400 hover:text-emerald-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
        <ChatBubbleLeftIcon class="h-6 w-6" />
        <span class="ml-1 text-xs">{{ commentCount }}</span>
      </button>
    </div>

    <div class="mt-4 flex justify-between items-center text-xs text-gray-500">
      <div class="flex items-center">
        <PlayCircleIcon class="h-4 w-4 mr-1" />
        <span>{{ playCount }}</span>
      </div>
    </div>

    <audio ref="audioPlayer" :src="music_url"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue'
import { HeartIcon, PlayIcon, PauseIcon, ChatBubbleLeftIcon, PlayCircleIcon } from '@heroicons/vue/24/outline'
import { MusicPlayerInfo } from '../types/global'

const props = defineProps<{
  musicInfo: MusicPlayerInfo
}>()

const audioPlayer = ref<HTMLAudioElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)
const isPlaying = ref(false)
const isLiked = ref(false)

const {
  id,
  cover_url,
  title,
  singer_name,
  album_name,
  music_url,
} = props.musicInfo

const playCount = ref(props.musicInfo.play_count)
let hasPlayed = ref(false) // 新增：用于跟踪当前歌曲是否已经播放过

const likeCount = ref(props.musicInfo.like_count)
const commentCount = ref(props.musicInfo.comment_count)

function togglePlay() {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause()
    } else {
      audioPlayer.value.play()
      if (!hasPlayed.value) {
        playCount.value++
        hasPlayed.value = true
      }
    }
    isPlaying.value = !isPlaying.value
  }
}

function seek() {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = currentTime.value
  }
}

function toggleLike() {
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    likeCount.value++
  } else {
    likeCount.value--
  }
  console.log('toggleLike', isLiked.value)
}

function showComments() {
  console.log('显示评论')
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.addEventListener('loadedmetadata', () => {
      duration.value = audioPlayer.value?.duration || 0
    })
    audioPlayer.value.addEventListener('timeupdate', () => {
      currentTime.value = audioPlayer.value?.currentTime || 0
    })
    audioPlayer.value.addEventListener('ended', () => {
      isPlaying.value = false
      hasPlayed.value = false // 歌曲播放结束时重置标志
    })
  }
})

onUnmounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.removeEventListener('loadedmetadata', () => { })
    audioPlayer.value.removeEventListener('timeupdate', () => { })
    audioPlayer.value.removeEventListener('ended', () => { })
  }
})
</script>
