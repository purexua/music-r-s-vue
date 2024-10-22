<template>
  <div class="p-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- 左侧：封面和控制 -->
        <div class="lg:col-span-2 space-y-6">
          <div class="relative group w-96 h-96 mx-auto">
            <img :src="musicInfo?.cover_url" :alt="musicInfo?.title"
                 class="w-full h-full object-cover rounded-2xl shadow-md transition duration-300 group-hover:shadow-xl">
            <div
                class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition duration-300 rounded-2xl flex items-center justify-center">
              <button @click="togglePlay"
                      class="text-white focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
                <component :is="isPlaying ? PauseIcon : PlayIcon" class="h-12 w-12"/>
              </button>
            </div>
          </div>

          <div class="text-center space-y-3">
            <div class="flex items-baseline justify-center space-x-3">
              <h1 class="text-3xl font-bold text-gray-800 truncate max-w-[70%]">{{ musicInfo?.title }}</h1>
              <p class="text-lg text-gray-600">- {{ musicInfo?.singer_name }}</p>
            </div>
            <div class="flex justify-center items-center space-x-3 text-sm text-gray-500">
              <span class="bg-gray-100 px-2 py-1 rounded-full">{{ musicInfo?.album_name }}</span>
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span class="bg-gray-100 px-2 py-1 rounded-full">{{ musicInfo?.release_date }}</span>
            </div>
          </div>

          <!-- 新增：音乐属性信息 -->
          <div class="flex flex-wrap gap-4 justify-center">
            <div class="flex items-center space-x-2">
              <FaceSmileIcon class="h-5 w-5 text-yellow-500"/>
              <span class="text-sm font-medium text-gray-700">情感:</span>
              <div class="flex flex-wrap gap-1">
                <span v-for="emotion in musicInfo?.emotions.split(',')" :key="emotion"
                      class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  {{ emotion.trim() }}
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <MusicalNoteIcon class="h-5 w-5 text-blue-500"/>
              <span class="text-sm font-medium text-gray-700">流派:</span>
              <div class="flex flex-wrap gap-1">
                <span v-for="genre in musicInfo?.genres.split(',')" :key="genre"
                      class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {{ genre.trim() }}
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <WrenchScrewdriverIcon class="h-5 w-5 text-purple-500"/>
              <span class="text-sm font-medium text-gray-700">乐器:</span>
              <div class="flex flex-wrap gap-1">
                <span v-for="instrument in musicInfo?.instruments.split(',')" :key="instrument"
                      class="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  {{ instrument.trim() }}
                </span>
              </div>
            </div>
          </div>

          <!-- 播放次数、点赞数和评论数 -->
          <div class="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div class="flex items-center">
              <PlayCircleIcon class="h-5 w-5 mr-1 text-indigo-400"/>
              <span>{{ musicInfo?.play_count }}</span>
            </div>
            <div class="flex items-center">
              <HeartIcon class="h-5 w-5 mr-1 text-pink-400"/>
              <span>{{ musicInfo?.like_count }}</span>
            </div>
            <div class="flex items-center">
              <ChatBubbleLeftIcon class="h-5 w-5 mr-1 text-teal-400"/>
              <span>{{ musicInfo?.comment_count }}</span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ formattedCurrentTime }}</span>
              <span>{{ formattedDuration }}</span>
            </div>
            <div class="relative">
              <input type="range" min="0" :max="duration" v-model="currentTime" @input="seek"
                     @mousemove="updateHoverTime" @mouseleave="hideHoverTime"
                     class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-500">
              <div v-if="showHoverTime"
                   class="absolute top-[-25px] text-xs bg-gray-800 text-white px-2 py-1 rounded transform -translate-x-1/2"
                   :style="{ left: hoverPosition + 'px' }">
                {{ formattedHoverTime }}
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-xl">
            <button @click="toggleLike"
                    class="flex flex-col items-center text-gray-400 hover:text-emerald-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
              <component :is="isLiked ? SolidHeartIcon : HeartIcon" :class="isLiked ? 'text-red-700' : ''"
                         class="h-7 w-7"/>
              <span class="text-xs mt-1 font-medium">喜欢</span>
            </button>

            <button @click="showAddToPlaylistMenu"
                    class="flex flex-col items-center text-gray-400 hover:text-emerald-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
              <PlusCircleIcon class="h-7 w-7"/>
              <span class="text-xs mt-1 font-medium">添加到歌单</span>
            </button>

            <button @click="showComments"
                    class="flex flex-col items-center text-gray-400 hover:text-emerald-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110">
              <ChatBubbleLeftIcon class="h-7 w-7"/>
              <span class="text-xs mt-1 font-medium">评论</span>
            </button>
          </div>
        </div>

        <!-- 中间：空白区域 -->
        <div class="hidden lg:block lg:col-span-1"></div>

        <!-- 右侧：歌词 -->
        <div
            class="lg:col-span-2 bg-gray-50 p-6 rounded-3xl shadow-lg h-[calc(100vh-10rem)] overflow-hidden flex flex-col">
          <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">歌词</h2>
          <div v-if="lyrics.length" ref="lyricsContainer" class="flex-1 overflow-hidden relative">
            <div ref="lyricsWrapper" class="absolute inset-0"
                 :style="{ transform: `translateY(${lyricsTranslateY}px)` }">
              <div v-for="(line, index) in lyrics" :key="index" ref="lyricLines"
                   class="py-2 cursor-pointer transition-all duration-300" @click="seekToLyric(line.time)">
                <p :class="{
                  'text-gray-800 font-bold text-xl': currentLyricIndex === index,
                  'text-gray-400 font-semibold': currentLyricIndex !== index
                }" class="text-lg transition-all duration-300 text-center hover:text-emerald-700 hover:scale-105">
                  {{ line.text }}
                </p>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500 italic text-center">暂无歌词</p>
        </div>
      </div>
    </div>

    <!-- 添加到歌单菜单 -->
    <div v-if="showPlaylistMenu" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-96 max-w-[90%] shadow-2xl transform transition-all duration-300 ease-out"
           :class="showPlaylistMenu ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">选择歌单</h3>
          <button @click="closePlaylistMenu"
                  class="text-gray-500 hover:text-emerald-700 transition-colors duration-200">
            <XMarkIcon class="h-6 w-6"/>
          </button>
        </div>
        <ul
            class="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <li v-for="playlist in userPlaylists" :key="playlist.playlist_id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div class="flex items-center space-x-3">
              <MusicalNoteIcon class="h-5 w-5 text-gray-500"/>
              <span class="font-medium text-gray-700 hover:text-emerald-700">{{ playlist.playlist_name }}</span>
            </div>
            <button @click="toggleMusicInPlaylist(playlist.playlist_id, playlist.is_added || false)"
                    class="flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700"
                    :class="playlist.is_added
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-emerald-700'
                : 'bg-gray-500 text-white hover:bg-emerald-700'">
              <component :is="playlist.is_added ? MinusIcon : PlusIcon" class="h-4 w-4"/>
              <span>{{ playlist.is_added ? '移除' : '添加' }}</span>
            </button>
          </li>
        </ul>
        <button @click="closePlaylistMenu"
                class="mt-6 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 hover:text-emerald-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700">
          关闭
        </button>
      </div>
    </div>

    <audio ref="audioPlayer" :src="musicInfo?.music_url"></audio>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, onUnmounted, computed, nextTick} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {
  HeartIcon,
  PlayIcon,
  PauseIcon,
  ChatBubbleLeftIcon,
  PlayCircleIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon,
  MusicalNoteIcon,
  FaceSmileIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'
import {HeartIcon as SolidHeartIcon} from '@heroicons/vue/24/solid'
import {MusicInfo} from '../types/global'
import {
  getMusicById,
  checkUserLikingMusic,
  likeMusic,
  unlikeMusic,
  increaseMusicPlayCount,
  GetUserCreatedPlaylistNameAndMusicIsAdded,
  addMusicToPlaylist,
  removeMusicFromPlaylist,
  recommendFunctionUserPlayMusic
} from '../api/httpClient'
import {useUserStore} from '../store/user'

interface LyricLine {
  time: number;
  text: string;
}

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const userId = userStore.getUserId()

const musicInfo = ref<MusicInfo>()
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

const showPlaylistMenu = ref(false)
const userPlaylists = ref<Array<{ playlist_name: string; is_added?: boolean; playlist_id: number }>>([])

const lyricsContainer = ref<HTMLElement | null>(null)
const lyricsWrapper = ref<HTMLElement | null>(null)
const lyricLines = ref<HTMLElement[]>([])
const lyricsTranslateY = ref(0)

const showHoverTime = ref(false)
const hoverTime = ref(0)
const hoverPosition = ref(0)

const formattedHoverTime = computed(() => formatTime(hoverTime.value))

onMounted(() => {
  const id = Number(route.params.music_id)
  if (!isNaN(id)) {
    fetchMusicInfo(id)
  } else {
    router.push({path: '/error/404'})
  }

  setupAudioEventListeners()

  nextTick(() => {
    if (lyricsContainer.value) {
      const containerHeight = lyricsContainer.value.clientHeight
      lyricsContainer.value.style.height = `${containerHeight}px`
    }
  })
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
    const {data} = await getMusicById(id)
    musicInfo.value = data
    await fetchLyrics(data.lyrics_url)
    resetAudioPlayer()

    if (userStore.isLoggedIn) {
      const {data: liked} = await checkUserLikingMusic(userId, id)
      isLiked.value = liked
    }
  } catch (error) {
    console.error('获取音乐信息出错:', error)
  }
}

async function fetchLyrics(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("获取歌词失败")
    }
    const lyricsText = await response.text();
    return parseLyrics(lyricsText);
  } catch (error) {
    return [];
  }
}

function parseLyrics(lyricsText: string): LyricLine[] {
  return lyricsText.split('\n')
      .map(line => {
        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})](.*)/)
        if (match) {
          const [, minutes, seconds, milliseconds, text] = match
          const time = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 100
          return {time, text: text.trim()}
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
    scrollLyricToCenter(newIndex)
  }
}

function scrollLyricToCenter(index: number) {
  if (!lyricsContainer.value || !lyricsWrapper.value || lyricLines.value.length === 0) return

  const containerHeight = lyricsContainer.value.clientHeight
  const lineElement = lyricLines.value[index]
  const lineHeight = lineElement.clientHeight
  const lineTop = lineElement.offsetTop

  const halfContainerHeight = containerHeight / 2
  const targetScrollTop = Math.max(0, lineTop - halfContainerHeight + lineHeight / 2)

  lyricsTranslateY.value = -targetScrollTop
}

async function togglePlay() {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause()
    } else {
      await audioPlayer.value.play()
      if (!hasPlayed.value && musicInfo.value !== undefined) {
        musicInfo.value.play_count++
        hasPlayed.value = true
        try {
          await increaseMusicPlayCount(musicInfo.value.id)
          await recommendFunctionUserPlayMusic(userId, musicInfo.value.id)
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

  if(musicInfo.value === undefined) {
    return
  }

  try {
    if (isLiked.value) {
      await unlikeMusic(userId, musicInfo.value.id)
      musicInfo.value.like_count--
    } else {
      await likeMusic(userId, musicInfo.value.id)
      musicInfo.value.like_count++
    }
    isLiked.value = !isLiked.value
  } catch (error) {
    console.error('更新收藏状态失败:', error)
  }
}

function showComments() {
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

async function showAddToPlaylistMenu() {
  if (!userStore.isLoggedIn) {
    console.log('请先登录')
    return
  }

  if (musicInfo.value === undefined) {
    return
  }

  try {
    const response = await GetUserCreatedPlaylistNameAndMusicIsAdded(userId, musicInfo.value.id)
    userPlaylists.value = response.data.data_list
    showPlaylistMenu.value = true
  } catch (error) {
    console.error('获取用户歌单失败:', error)
  }
}

function closePlaylistMenu() {
  showPlaylistMenu.value = false
}

async function toggleMusicInPlaylist(playlistId: number, isAdded: boolean) {
  if(musicInfo.value === undefined) {
    return
  }

  try {
    if (isAdded) {
      await removeMusicFromPlaylist(playlistId, musicInfo.value.id)
    } else {
      await addMusicToPlaylist(playlistId, musicInfo.value.id)
    }

    // 更新本地状态
    const playlistIndex = userPlaylists.value.findIndex(p => p.playlist_id === playlistId)
    if (playlistIndex !== -1) {
      userPlaylists.value[playlistIndex].is_added = !isAdded
    }

    // 显示成功消息
    console.log(isAdded ? '音乐已从歌单中移除' : '音乐已添加到歌单')
  } catch (error) {
    console.error('操作失败:', error)
    // 显示错误消息
    console.log('操作失败，请稍后重试')
  }
}

// 监听 lyrics 的变化，在歌词加载完成后重新计算滚动位置
watch(lyrics, () => {
  nextTick(() => {
    lyricsTranslateY.value = 0 // 重置滚动位置到顶部
    scrollLyricToCenter(currentLyricIndex.value)
  })
})

function updateHoverTime(event: MouseEvent) {
  const rect = (event.target as HTMLInputElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = x / rect.width
  hoverTime.value = percentage * duration.value
  hoverPosition.value = x
  showHoverTime.value = true
}

function hideHoverTime() {
  showHoverTime.value = false
}
</script>

<style scoped></style>