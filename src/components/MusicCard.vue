<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
    <div v-for="music in props.musicList" :key="music.id"
      class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div class="flex-shrink-0">
        <img class="h-10 w-10 rounded-full object-cover" :src="music.cover_url" :alt="music.title" />
      </div>
      <div class="min-w-0 flex-1">
        <router-link :to="`/music/${music.id}`" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">{{ music.title }}</p>
          <p class="truncate text-sm text-gray-500">{{ music.singer_name }} • {{ music.album_name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { MusicSCardInfo } from '../types/global';

const props = defineProps<{
  musicList: MusicSCardInfo[]
}>()
</script>