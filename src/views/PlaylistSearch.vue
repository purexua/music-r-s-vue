<template>
    <div class="bg-white py-8 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <!-- 最新歌单 -->
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">最新歌单</h2>
                <p class="mt-2 text-lg leading-8 text-gray-500">探索最新创建的精彩歌单</p>
            </div>
            <PlayListCard :playlists="latestPlaylists" />

            <!-- 最受欢迎 -->
            <div class="mx-auto max-w-2xl text-center mt-12">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">最受欢迎</h2>
                <p class="mt-2 text-lg leading-8 text-gray-500">大家都在收藏的热门歌单</p>
            </div>
            <PlayListCard :playlists="popularPlaylists" />
        </div>
    </div>
</template>

<script setup lang="ts" name="PlayListSearch">
import { ref, onMounted } from 'vue';
import PlayListCard from '../components/card/PlayListCard.vue';
import { PlaylistInfo } from '../types/global';
import { getLatestPlaylists, getTopLikeCountPlaylists } from '../api/httpClient';

const latestPlaylists = ref<PlaylistInfo[]>([]);
const popularPlaylists = ref<PlaylistInfo[]>([]);

const fetchPlaylists = async () => {
    try {
        const latestResponse = await getLatestPlaylists(8);
        latestPlaylists.value = latestResponse.data.playlist_info_list;

        const popularResponse = await getTopLikeCountPlaylists(8);
        popularPlaylists.value = popularResponse.data.playlist_info_list;

    } catch (error) {
        console.error('获取歌单数据失败', error);
    }
};

onMounted(() => {
    fetchPlaylists();
});
</script>

<style scoped></style>