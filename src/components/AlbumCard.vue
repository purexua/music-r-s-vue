<template>
  <div class="mt-4">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <ul role="list"
        class="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
        <li v-for="album in props.albumList" :key="album.id">
          <router-link :to="`/album/${album.id}`" class="focus:outline-none">
            <img class="mx-auto h-24 w-24 rounded-full object-cover" :src="album.cover_url" :alt="album.album_name" />
            <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{{ album.album_name }}</h3>
            <p class="text-sm leading-6 text-gray-600">{{ album.singer_name }} - {{ formatDate(album.release_date) }}
            </p>
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