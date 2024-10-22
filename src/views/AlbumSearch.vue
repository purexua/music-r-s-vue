<template>
  <div class="bg-white py-8 sm:py-16">
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
    </div>
  </div>
</template>

<script setup lang="ts" name="AlbumSearch">
import { ref, onMounted } from 'vue';
import AlbumList from '../components/list/AlbumList.vue';  
import { AlbumInfo } from '../types/global';
import { getLatestAlbums, getTopLikeCountAlbums } from '../api/httpClient';

const latestAlbums = ref<AlbumInfo[]>([]);
const hotAlbums = ref<AlbumInfo[]>([]);

const fetchAlbums = async () => {
  try {
    const latestResponse = await getLatestAlbums(8);
    latestAlbums.value = latestResponse.data.album_info_list;

    const hotResponse = await getTopLikeCountAlbums(8);
    hotAlbums.value = hotResponse.data.album_info_list;

  } catch (error) {
    console.error('获取专辑数据失败', error);
  }
};

onMounted(() => {
  fetchAlbums();
});
</script>

<style scoped></style>
