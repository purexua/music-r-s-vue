<template>
  <div class="p-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <!-- 左侧：封面和控制 -->
        <div class="lg:col-span-2 space-y-8">
          <div class="relative group">
            <img :src="state.musicInfo.cover_url" :alt="state.musicInfo.title"
              class="w-full aspect-square object-cover rounded-3xl shadow-lg transition duration-300 group-hover:shadow-2xl">
            <div
              class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 rounded-3xl flex items-center justify-center">
              <button @click="togglePlay"
                class="text-white focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
                <PauseIcon v-if="state.isPlaying" class="h-20 w-20" />
                <PlayIcon v-else class="h-20 w-20" />
              </button>
            </div>
          </div>

          <div class="text-center space-y-3">
            <h1 class="text-3xl font-bold text-gray-800 truncate">{{ state.musicInfo.title }}</h1>
            <p class="text-xl text-gray-600">{{ state.musicInfo.singer_name }}</p>
            <div class="flex justify-center items-center space-x-4 text-sm text-gray-500">
              <span>{{ state.musicInfo.album_name }}</span>
              <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>{{ state.musicInfo.release_date }}</span>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ formattedCurrentTime }}</span>
              <span>{{ formattedDuration }}</span>
            </div>
            <input type="range" min="0" :max="state.duration" v-model="state.currentTime" @input="seek"
              class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer">
          </div>

          <div class="flex justify-between items-center px-4">
            <button @click="toggleLike"
              class="flex flex-col items-center text-gray-400 hover:text-red-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
              <SolidHeartIcon v-if="state.isLiked" class="h-8 w-8 text-red-500" />
              <HeartIcon v-else class="h-8 w-8" />
              <span class="text-sm mt-1">{{ state.musicInfo.like_count }}</span>
            </button>

            <div class="flex flex-col items-center text-gray-400">
              <PlayCircleIcon class="h-6 w-6" />
              <span class="text-sm mt-1">{{ state.musicInfo.play_count }}</span>
            </div>

            <button @click="showComments"
              class="flex flex-col items-center text-gray-400 hover:text-gray-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
              <ChatBubbleLeftIcon class="h-8 w-8" />
              <span class="text-sm mt-1">{{ state.musicInfo.comment_count }}</span>
            </button>
          </div>
        </div>

        <!-- 中间：空白区域 -->
        <div class="hidden lg:block lg:col-span-1"></div>

        <!-- 右侧：歌词 -->
        <div class="lg:col-span-2 bg-white p-6 rounded-3xl shadow-md h-[calc(100vh-10rem)]">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center">歌词</h2>
          <div v-if="state.lyrics.length"
            class="space-y-4 overflow-y-auto h-[calc(100%-3rem)] flex flex-col items-center">
            <p v-for="(line, index) in state.lyrics" :key="index"
              :class="{ 'text-black font-bold text-xl current-lyric': state.currentLyricIndex === index }"
              class="text-lg text-gray-700 transition-all duration-300 cursor-pointer text-center hover:text-green-500"
              @click="seekToLyric(line.time)">
              {{ line.text }}
            </p>
          </div>
          <p v-else class="text-gray-500 italic text-center">暂无歌词</p>
        </div>
      </div>
    </div>

    <audio ref="audioPlayer" :src="state.musicInfo.music_url"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HeartIcon, PlayIcon, PauseIcon, ChatBubbleLeftIcon, PlayCircleIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid'
import { DefaultMusicInfo } from '../types/global'
import { getMusicById } from '../api/httpClient'

// 接口定义
interface LyricLine {
  time: number;
  text: string;
}

// 路由相关
const route = useRoute()
const router = useRouter()

// 响应式状态
const state = reactive({
  musicInfo: { ...DefaultMusicInfo },
  lyrics: [] as LyricLine[],
  currentLyricIndex: 0,
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  isLiked: false,
  hasPlayed: false,
})

// 计算属性
const formattedCurrentTime = computed(() => formatTime(state.currentTime))
const formattedDuration = computed(() => formatTime(state.duration))

// DOM 引用
const audioPlayer = ref<HTMLAudioElement | null>(null)

// 生命周期钩子
onMounted(() => {
  const id = Number(route.params.music_id)
  if (!isNaN(id)) {
    fetchMusicInfo(id)
  } else {
    router.push({ path: '/error/404' })
  }

  setupAudioEventListeners()
})

onUnmounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.removeEventListener('timeupdate', updateTime)
    audioPlayer.value.removeEventListener('loadedmetadata', () => { })
    audioPlayer.value.removeEventListener('ended', () => { })
  }
})

// 监听器
watch(() => route.params.music_id, (newId) => {
  const id = Number(newId)
  if (!isNaN(id)) {
    fetchMusicInfo(id)
  }
})

// 方法定义
async function fetchMusicInfo(id: number) {
  try {
    const getMusicByIdResponse = await getMusicById(id)
    state.musicInfo = getMusicByIdResponse.data
    await fetchLyrics(state.musicInfo.lyrics_url)
    resetAudioPlayer()
  } catch (error) {
    console.error('获取音乐信息出错:', error)
    state.musicInfo = { ...DefaultMusicInfo }
  }
}

async function fetchLyrics(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('获取歌词失败')
    }
    const lyricsText = await response.text()
    state.lyrics = parseLyrics(lyricsText)
  } catch (error) {
    state.lyrics = []
  }
}

function parseLyrics(lyricsText: string): LyricLine[] {
  const lines = lyricsText.split('\n')
  return lines
    .map(line => {
      const match = line.match(/\[(\d{2})\:(\d{2})\](.*)/)
      if (match) {
        const [, minutes, seconds, text] = match
        const time = parseInt(minutes) * 60 + parseInt(seconds)
        return { time, text: text.trim() }
      }
      return null
    })
    .filter((line): line is LyricLine => line !== null)
}

function setupAudioEventListeners() {
  if (audioPlayer.value) {
    audioPlayer.value.addEventListener('timeupdate', updateTime)
    audioPlayer.value.addEventListener('loadedmetadata', () => {
      state.duration = audioPlayer.value?.duration || 0
    })
    audioPlayer.value.addEventListener('ended', () => {
      state.isPlaying = false
      state.hasPlayed = false // 歌曲播放结束时重置标志
    })
  }
}

function updateTime() {
  if (audioPlayer.value) {
    state.currentTime = audioPlayer.value.currentTime
    updateCurrentLyric()
  }
}

function updateCurrentLyric() {
  const currentTime = audioPlayer.value?.currentTime || 0
  const newIndex = state.lyrics.findIndex((line, index) => {
    const nextLine = state.lyrics[index + 1]
    return currentTime >= line.time && (!nextLine || currentTime < nextLine.time)
  })
  if (newIndex !== -1 && newIndex !== state.currentLyricIndex) {
    state.currentLyricIndex = newIndex
    scrollToCurrentLyric()
  }
}

function scrollToCurrentLyric() {
  const lyricsContainer = document.querySelector('.lyrics-container')
  const currentLyric = document.querySelector('.current-lyric')
  if (lyricsContainer && currentLyric) {
    lyricsContainer.scrollTop = (currentLyric as HTMLElement).offsetTop - lyricsContainer.clientHeight / 2
  }
}

function togglePlay() {
  if (audioPlayer.value) {
    if (state.isPlaying) {
      audioPlayer.value.pause()
    } else {
      audioPlayer.value.play()
      if (!state.hasPlayed) {
        state.musicInfo.play_count++
        state.hasPlayed = true
        // TODO: 发送请求到后端更新播放次数
      }
    }
    state.isPlaying = !state.isPlaying
  }
}

function seek() {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = state.currentTime
  }
}

function toggleLike() {
  state.isLiked = !state.isLiked
  if (state.isLiked) {
    state.musicInfo.like_count++
  } else {
    state.musicInfo.like_count--
  }
  // TODO: 发送请求到后端更新点赞状态
  console.log('toggleLike', state.isLiked)
}

function showComments() {
  console.log('显示评论', state.musicInfo.comment_count)
  // 这里应该跳转到评论页面或打开评论模态框
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function seekToLyric(time: number) {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = time;
    state.currentTime = time;
    updateCurrentLyric();
  }
}

function resetAudioPlayer() {
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    audioPlayer.value.currentTime = 0
    state.isPlaying = false
  }
}
</script>

<style scoped></style>z