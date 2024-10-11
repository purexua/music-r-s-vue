<template>
    <div class="bg-white py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div v-if="likedAlbums.length > 0">
                <div class="mx-auto max-w-2xl">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我喜欢的专辑</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-600">这些是我收藏的精选专辑,每一张都承载着独特的音乐记忆。</p>
                </div>
                <AlbumCard :albumList="likedAlbums" />
            </div>
            <div v-else class="text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">您还没有喜欢的专辑</h2>
                <p class="mt-6 text-lg leading-8 text-gray-600">去发现一些新的音乐,开始您的专辑收藏之旅吧！</p>
                <button @click="navigateToDiscoverAlbums" class="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                    发现专辑
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="MyLikeAlbum">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AlbumCard from '../components/AlbumCard.vue';
import { AlbumInfo } from '../types/global';
import { getUserLikedAlbumIdList, getAlbumInfoByIdList } from '../api/httpClient';
import { useUserStore } from '../store/user';

const router = useRouter();
const userStore = useUserStore();
const likedAlbums = ref<AlbumInfo[]>([]);

const navigateToDiscoverAlbums = () => {
    router.push('/album-search');
};

const fetchLikedAlbums = async () => {
    try {
        const userId = userStore.userId;
        const likeResponse = await getUserLikedAlbumIdList(userId);
        const albumIds = likeResponse.data.album_id_list;
        if (albumIds.length > 0) {
            const albumResponse = await getAlbumInfoByIdList(albumIds);
            likedAlbums.value = albumResponse.data.album_info_list;
        }
    } catch (error) {
        console.error('获取喜欢的专辑列表失败', error);
        // 这里可以添加错误处理逻辑,比如显示错误消息
    }
};

onMounted(() => {
    fetchLikedAlbums();
});
</script>

<style scoped>
/* 如果需要,可以在这里添加自定义样式 */
</style>

