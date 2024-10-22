<template>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="music in props.musics" :key="music.id" @click="navigateToMusicDetail(music.id)"
            class="flex bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out overflow-hidden cursor-pointer relative">
            <div class="w-1/3 flex-shrink-0">
                <img class="w-full h-full object-cover" :src="music.cover_url" :alt="music.title" />
            </div>
            <div class="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-sm font-semibold text-gray-900 line-clamp-1 flex-grow">{{ music.title }}</h3>
                        <div class="flex items-center space-x-2 flex-shrink-0">
                            <button @click.stop
                                class="p-1 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition duration-300 ease-in-out">
                                <PlayIcon class="h-3 w-3" />
                            </button>
                            <span class="text-xs text-gray-500">{{ formatPlayCount(music.play_count) }}</span>
                        </div>
                    </div>
                    <p class="text-xs text-gray-600 mt-1">{{ music.singer_name }}</p>
                    <div class="flex items-center text-xs text-gray-500 mt-1">
                        <CalendarIcon class="h-3 w-3 text-gray-400 mr-1" />
                        {{ formatDate(music.release_date) }}
                    </div>
                </div>
                <div class="mt-2">
                    <div class="flex flex-wrap gap-1">
                        <span class="px-1.5 py-0.5 text-[10px] rounded-full bg-pink-100 text-pink-800">
                            {{ music.emotions }}
                        </span>
                        <span class="px-1.5 py-0.5 text-[10px] rounded-full bg-blue-100 text-blue-800">
                            {{ music.genres }}
                        </span>
                        <span class="px-1.5 py-0.5 text-[10px] rounded-full bg-green-100 text-green-800">
                            {{ music.instruments }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="MusicList">
import { MusicInfo } from '../../types/global';
import { useRouter } from 'vue-router';
import { PlayIcon, CalendarIcon } from '@heroicons/vue/24/solid';
const props = defineProps<{
    musics: MusicInfo[]
}>();

const router = useRouter();

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function formatPlayCount(count: number): string {
    if (count >= 10000) {
        return (count / 10000).toFixed(1) + '万';
    }
    return count.toString();
}

const navigateToMusicDetail = (musicId: number) => {
    router.push(`/music/${musicId}`);
};
</script>
