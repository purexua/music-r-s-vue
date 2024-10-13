<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                <router-link v-for="playlist in props.playlists" :key="playlist.id"
                    :to="`/playlist-detail/${playlist.id}`" class="group relative block">
                    <div
                        class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:scale-105">
                        <img :src="playlist.cover_url" :alt="playlist.playlist_name"
                            class="object-cover object-center" />
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-800 truncate">
                                {{ playlist.playlist_name }}
                            </h3>
                            <div class="flex items-center text-gray-600">
                                <HeartIcon class="h-5 w-5 mr-1 text-emerald-600" />
                                <span class="text-gray-800">{{ playlist.like_count }}</span>
                            </div>
                        </div>
                        <div class="mt-2 flex flex-wrap gap-2">
                            <span v-for="(tag, index) in playlist.tags.split('-')" :key="index"
                                class="inline-block px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full transition-colors duration-300 hover:bg-gray-300 hover:text-emerald-700">
                                {{ tag.trim() }}
                            </span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { PlaylistInfo } from '../types/global';
import { HeartIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
    playlists: PlaylistInfo[]
}>()
</script>
