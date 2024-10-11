<template>
  <div class="p-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <!-- 左侧：封面和控制 -->
        <div class="lg:col-span-2 space-y-8 bg-white">
          <div class="relative group w-96 h-96 mx-auto">
            <img :src="musicInfo.cover_url" :alt="musicInfo.title"
              class="w-full h-full object-cover rounded-2xl shadow-md transition duration-300 group-hover:shadow-xl">
            <div
              class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition duration-300 rounded-2xl flex items-center justify-center">
              <button @click="togglePlay"
                class="text-white focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
                <component :is="isPlaying ? PauseIcon : PlayIcon" class="h-12 w-12" />
              </button>
            </div>
          </div>

          <div class="text-center space-y-3">
            <h1 class="text-2xl font-bold text-gray-800 truncate">{{ musicInfo.title }}</h1>
            <p class="text-lg text-gray-600">{{ musicInfo.singer_name }}</p>
            <div class="flex justify-center items-center space-x-3 text-sm text-gray-500">
              <span class="bg-gray-100 px-2 py-1 rounded-full">{{ musicInfo.album_name }}</span>
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span class="bg-gray-100 px-2 py-1 rounded-full">{{ musicInfo.release_date }}</span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ formattedCurrentTime }}</span>
              <span>{{ formattedDuration }}</span>
            </div>
            <input type="range" min="0" :max="duration" v-model="currentTime" @input="seek"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500">
          </div>

          <div class="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-xl">
            <button @click="toggleLike"
              class="flex flex-col items-center text-gray-400 hover:text-pink-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
              <component :is="isLiked ? SolidHeartIcon : HeartIcon" :class="isLiked ? 'text-pink-500' : ''"
                class="h-7 w-7" />
              <span class="text-xs mt-1 font-medium">{{ musicInfo.like_count }}</span>
            </button>

            <div class="flex flex-col items-center text-indigo-400">
              <PlayCircleIcon class="h-7 w-7" />
              <span class="text-xs mt-1 font-medium">{{ musicInfo.play_count }}</span>
            </div>

            <button @click="showComments"
              class="flex flex-col items-center text-gray-400 hover:text-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
              <ChatBubbleLeftIcon class="h-7 w-7" />
              <span class="text-xs mt-1 font-medium">{{ musicInfo.comment_count }}</span>
            </button>
          </div>
        </div>

        <!-- 中间：空白区域 -->
        <div class="hidden lg:block lg:col-span-1"></div>

        <!-- 右侧：歌词 -->
        <div
          class="lg:col-span-2 bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl shadow-lg h-[calc(100vh-10rem)] overflow-hidden">
          <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">歌词</h2>
          <div v-if="lyrics.length"
            class="space-y-2 overflow-y-auto h-[calc(100%-4rem)] flex flex-col items-center px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <p v-for="(line, index) in lyrics" :key="index"
              :class="{ 'text-gray-800 font-bold text-xl transform scale-105': currentLyricIndex === index }"
              class="text-lg text-gray-600 transition-all duration-300 cursor-pointer text-center hover:text-gray-900 relative group py-2"
              @click="seekToLyric(line.time)">
              {{ line.text }}
              <span
                class="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {{ formatTime(line.time) }}
              </span>
            </p>
          </div>
          <p v-else class="text-gray-500 italic text-center">暂无歌词</p>
        </div>
      </div>
    </div>

    <audio ref="audioPlayer" :src="musicInfo.music_url"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HeartIcon, PlayIcon, PauseIcon, ChatBubbleLeftIcon, PlayCircleIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid'
import { DefaultMusicInfo, MusicInfo } from '../types/global'
import { getMusicById, checkUserLikingMusic, likeMusic, unlikeMusic, increaseMusicPlayCount } from '../api/httpClient'
import { useUserStore } from '../store/user'

interface LyricLine {
  time: number;
  text: string;
}

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const musicInfo = ref<MusicInfo>({ ...DefaultMusicInfo })
const lyrics = ref<LyricLine[]>([])
const currentLyricIndex = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const isPlaying = ref(false)
const isLiked = ref(false)
const hasPlayed = ref(false)

const audioPlayer = ref<HTMLAudioElement | null>(null)

const formattedCurrentTime = computed(() => formatTime(currentTime.value))
const formattedDuration = computed(() => formatTime(duration.value))

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
    audioPlayer.value.removeEventListener('loadedmetadata', onLoadedMetadata)
    audioPlayer.value.removeEventListener('ended', onEnded)
  }
})

watch(() => route.params.music_id, (newId) => {
  const id = Number(newId)
  if (!isNaN(id)) {
    fetchMusicInfo(id)
  }
})

async function fetchMusicInfo(id: number) {
  try {
    const { data } = await getMusicById(id)
    musicInfo.value = data
    await fetchLyrics(data.lyrics_url)
    resetAudioPlayer()

    if (userStore.isLoggedIn) {
      const { data: liked } = await checkUserLikingMusic(userStore.userId, id)
      isLiked.value = liked
    }
  } catch (error) {
    console.error('获取音乐信息出错:', error)
    musicInfo.value = { ...DefaultMusicInfo }
  }
}

async function fetchLyrics(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('获取歌词失败')
    const lyricsText = await response.text()
    lyrics.value = parseLyrics(lyricsText)
  } catch (error) {
    lyrics.value = []
  }
}

function parseLyrics(lyricsText: string): LyricLine[] {
  return lyricsText.split('\n')
    .map(line => {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/)
      if (match) {
        const [, minutes, seconds, milliseconds, text] = match
        const time = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 100
        return { time, text: text.trim() }
      }
      return null
    })
    .filter((line): line is LyricLine => line !== null)
}

function setupAudioEventListeners() {
  if (audioPlayer.value) {
    audioPlayer.value.addEventListener('timeupdate', updateTime)
    audioPlayer.value.addEventListener('loadedmetadata', onLoadedMetadata)
    audioPlayer.value.addEventListener('ended', onEnded)
  }
}

function updateTime() {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime
    updateCurrentLyric()
  }
}

function onLoadedMetadata() {
  duration.value = audioPlayer.value?.duration || 0
}

function onEnded() {
  isPlaying.value = false
  hasPlayed.value = false
}

function updateCurrentLyric() {
  const time = audioPlayer.value?.currentTime || 0
  const newIndex = lyrics.value.findIndex((line, index) => {
    const nextLine = lyrics.value[index + 1]
    return time >= line.time && (!nextLine || time < nextLine.time)
  })
  if (newIndex !== -1 && newIndex !== currentLyricIndex.value) {
    currentLyricIndex.value = newIndex
  }
}

async function togglePlay() {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause()
    } else {
      await audioPlayer.value.play()
      if (!hasPlayed.value) {
        musicInfo.value.play_count++
        hasPlayed.value = true
        try {
          await increaseMusicPlayCount(musicInfo.value.id)
        } catch (error) {
          console.error('更新播放次数失败', error)
        }
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

async function toggleLike() {
  if (!userStore.isLoggedIn) {
    console.log('请先登录')
    return
  }

  try {
    if (isLiked.value) {
      await unlikeMusic(userStore.userId, musicInfo.value.id)
      musicInfo.value.like_count--
    } else {
      await likeMusic(userStore.userId, musicInfo.value.id)
      musicInfo.value.like_count++
    }
    isLiked.value = !isLiked.value
  } catch (error) {
    console.error('更新收藏状态失败:', error)
  }
}

function showComments() {
  console.log('显示评论', musicInfo.value.comment_count)
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function seekToLyric(time: number) {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = time
    currentTime.value = time
    updateCurrentLyric()
  }
}

function resetAudioPlayer() {
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    audioPlayer.value.currentTime = 0
    isPlaying.value = false
  }
}
</script>

<style scoped></style>