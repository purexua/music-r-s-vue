<template>
  <div class="mt-4">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <ul role="list"
        class="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
        <li v-for="album in props.albumList" :key="album.id" class="group">
          <router-link :to="`/album-detail/${album.id}`" class="focus:outline-none block transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-lg p-4">
            <img class="mx-auto h-24 w-24 rounded-full object-cover transition duration-300 ease-in-out group-hover:shadow-md" :src="album.cover_url" :alt="album.album_name" />
            <h3 class="mt-4 text-base font-semibold leading-7 tracking-tight text-gray-900 group-hover:text-indigo-600">{{ album.album_name }}</h3>
            <p class="text-sm leading-6 text-gray-600 group-hover:text-gray-500">{{ album.singer_name }} - {{ formatDate(album.release_date) }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="AlbumCard">
import { defineProps } from 'vue'
import { AlbumInfo } from '../types/global'

const props = defineProps<{
  albumList: AlbumInfo[]
}>()

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
</script>

<style scoped>
/* 可以添加额外的样式来增强效果 */
</style>