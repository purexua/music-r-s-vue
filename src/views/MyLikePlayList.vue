<template>
    <div class="bg-white pt-12 sm:pt-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="text-center">
                <!-- 展示歌单列表 -->
                <div v-if="likedPlaylists.length > 0">
                    <div class="mx-auto max-w-2xl">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">我收藏的歌单</h2>
                        <p class="mt-6 text-lg leading-8 text-gray-500">这些是我收藏的精选歌单,每一个都代表着独特的音乐品味。</p>
                    </div>
                    <PlayListCard :playlists="likedPlaylists" />
                    <div v-if="hasMore" class="flex justify-center mt-4">
                        <button @click="loadMoreLikedPlaylists"
                            class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
                            加载更多
                        </button>
                    </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center text-gray-500">
                    <MusicalNoteIcon class="w-16 h-16 mb-4 animate-bounce text-emerald-600" />
                    <p class="text-xl font-medium mb-2 text-gray-800">您还没有收藏的歌单</p>
                    <p class="text-sm mb-8">去探索一些新的歌单,开始您的音乐收藏之旅吧！</p>
                    <button @click="navigateToDiscoverPlaylists"
                        class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
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
import { getUserLikedPlaylistIdsList } from '../api/httpClient';
import { useUserStore } from '../store/user';
import PlayListCard from '../components/card/PlayListCard.vue';
import { MusicalNoteIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const userStore = useUserStore();

const userId = userStore.getUserId()
const likedPlaylists = ref<PlaylistInfo[]>([]);
const hasMore = ref(false)
const currentPage = ref(0)
const pageSize = 8

const navigateToDiscoverPlaylists = () => {
    router.push('/playlist-search'); // 假设有一个发现歌单的路由
};

const fetchLikedPlaylists = async () => {
    try {
        const followResponse = await getUserLikedPlaylistIdsList(userId, pageSize, currentPage.value * pageSize)
        if (followResponse.data.playlist_info_list && followResponse.data.playlist_info_list.length > 0) {
            likedPlaylists.value = [...likedPlaylists.value, ...followResponse.data.playlist_info_list]
            currentPage.value++
            hasMore.value = followResponse.data.has_more
        } else {
            hasMore.value = false
        }
    } catch (error) {
        console.error('获取关注歌手列表失败', error)
        // 不要清空现有的歌手列表
        hasMore.value = false
    }
};

const loadMoreLikedPlaylists = () => {
    fetchLikedPlaylists()
}

onMounted(() => {
    fetchLikedPlaylists();
});
</script>

<style scoped>
/* 如果需要,可以在这里添加自定义样式 */
</style>
