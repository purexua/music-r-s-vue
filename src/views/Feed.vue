<template>
  <div class="bg-white py-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">动态</h1>
    <div class="space-y-6">
      <MusicPlayer v-for="(_, index) in 2" :key="index" :musicInfo="musicPlayerInfo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import { MusicPlayerInfo } from '../types/global'

// 测试数据
const musicPlayerInfo = ref<MusicPlayerInfo>({
  id: 100000,
  cover_url: 'http://127.0.0.1:8000/music-r-s/music/covers/cover-100000.jpg',
  title: '我的歌曲',
  singer_id: 100000,
  singer_name: '艺术家名称',
  album_id: 100000,
  album_name: '专辑名称',
  music_url: 'http://127.0.0.1:8000/music-r-s/music/test-100001.mp3',
  play_count: 100000,
  like_count: 100000,
  comment_count: 100000,
})  
</script>
