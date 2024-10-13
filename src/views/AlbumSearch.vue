<template>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <!-- 最新上架 -->
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">最新上架</h2>
          <p class="mt-2 text-lg leading-8 text-gray-500">探索刚刚发行的精彩专辑</p>
        </div>
        <AlbumList :albums="latestAlbums" />
  
        <!-- 本周最热 -->
        <div class="mx-auto max-w-2xl text-center mt-24">
          <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">本周最热</h2>
          <p class="mt-2 text-lg leading-8 text-gray-500">大家都在听的热门专辑</p>
        </div>
        <AlbumList :albums="hotAlbums" />
  
        <!-- 更多专辑 -->
        <div class="mx-auto max-w-2xl text-center mt-24">
          <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">更多专辑</h2>
          <p class="mt-2 text-lg leading-8 text-gray-500">浏览更多精彩专辑</p>
        </div>
        <AlbumList :albums="moreAlbums" />
      </div>
    </div>
  </template>

<script setup lang="ts" name="AlbumSearch">
import { ref } from 'vue';
import AlbumList from '../components/AlbumList.vue';
import { AlbumInfo } from '../types/global';

// 模拟数据
const latestAlbums = ref<AlbumInfo[]>([
    {
        id: 1,
        cover_url: 'http://localhost:8000/music-r-s/album/covers/cover-100000.jpg',
        album_name: '新专辑1',
        singer_id: 1,
        singer_name: '歌手1',
        release_date: '2023-05-01',
        like_count: 1000,
        description: '这是一张新专辑的描述...',
    },
    {
        id: 2,
        cover_url: 'http://localhost:8000/music-r-s/album/covers/cover-100001.jpg',
        album_name: '新专辑2',
        singer_id: 2,
        singer_name: '歌手2',
        release_date: '2023-05-02',
        like_count: 2000,
        description: '这是一张新专辑的描述...',
    },
    {
        id: 3,
        cover_url: 'http://localhost:8000/music-r-s/album/covers/cover-100002.jpg',
        album_name: '新专辑3',
        singer_id: 3,
        singer_name: '歌手3',
        release_date: '2023-05-03',
        like_count: 3000,
        description: '这是一张新专辑的描述...',
    },
    {
        id: 4,
        cover_url: 'http://localhost:8000/music-r-s/album/covers/cover-100003.jpg',
        album_name: '新专辑4',
        singer_id: 4,
        singer_name: '歌手4',
        release_date: '2023-05-04',
        like_count: 4000,
        description: '这是一张新专辑的描述...',
    },
    // 添加更多模拟数据...
]);

const hotAlbums = ref<AlbumInfo[]>([
    // 添加本周最热专辑的模拟数据...
]);

const moreAlbums = ref<AlbumInfo[]>([
    // 添加更多专辑的模拟数据...
]);
</script>

<style scoped>

</style>

