<template>
    <div class="bg-white pt-12 sm:pt-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="text-center">
                <!-- 展示歌单列表 -->
                <div v-if="likedPlaylists.length > 0">
                    <div class="mx-auto max-w-2xl">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我收藏的歌单</h2>
                        <p class="mt-6 text-lg leading-8 text-gray-600">这些是我收藏的精选歌单,每一个都代表着独特的音乐品味。</p>
                    </div>
                    <PlayListCard :playlists="likedPlaylists" />
                </div>
                <div v-else class="flex flex-col items-center justify-center text-gray-500">
                    <MusicalNoteIcon class="w-16 h-16 mb-4 animate-bounce" />
                    <p class="text-xl font-medium mb-2">您还没有收藏的歌单</p>
                    <p class="text-sm mb-8">去探索一些新的歌单,开始您的音乐收藏之旅吧！</p>
                    <button @click="navigateToDiscoverPlaylists"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                        发现歌单
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="MyLikePlayList">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PlaylistInfo } from '../types/global';
import { getUserLikedPlaylistIdList, getPlaylistInfoListByIdList } from '../api/httpClient';
import { useUserStore } from '../store/user';
import PlayListCard from '../components/PlayListCard.vue';
import { MusicalNoteIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const userStore = useUserStore();
const likedPlaylists = ref<PlaylistInfo[]>([]);

const navigateToDiscoverPlaylists = () => {
    router.push('/playlist-search'); // 假设有一个发现歌单的路由
};

const fetchLikedPlaylists = async () => {
    try {
        const userId = userStore.userId;
        const likeResponse = await getUserLikedPlaylistIdList(userId);
        const playlistIds = likeResponse.data.playlist_id_list || [];
        if (playlistIds.length > 0) {
            const playlistResponse = await getPlaylistInfoListByIdList(playlistIds);
            likedPlaylists.value = playlistResponse.data.playlist_info_list || [];
        } else {
            likedPlaylists.value = [];
        }
    } catch (error) {
        console.error('获取收藏的歌单列表失败', error);
        likedPlaylists.value = [];
        // 这里可以添加错误处理逻辑,比如显示错误消息
    }
};

onMounted(() => {
    fetchLikedPlaylists();
});
</script>

<style scoped>
/* 如果需要,可以在这里添加自定义样式 */
</style>
