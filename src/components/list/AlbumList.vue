<template>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        <article v-for="album in props.albums" :key="album.id"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            @click="navigateToAlbumDetail(album.id)">
            <img :src="album.cover_url" :alt="album.album_name" class="w-full h-48 object-cover" />
            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-800 truncate group-hover:text-emerald-700">{{
                        album.album_name }}</h3>
                    <span class="text-sm font-medium text-gray-500 bg-gray-100 rounded-full px-2 py-1">{{
                        album.like_count }} 赞</span>
                </div>
                <p class="text-sm text-gray-500 line-clamp-2 mb-2">{{ album.description }}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <div class="flex items-center">
                        <!-- <img :src="album.singer_avatar_url" :alt="album.singer_name" class="h-6 w-6 rounded-full mr-2" /> -->
                        <span>{{ album.singer_name }}</span>
                    </div>
                    <time :datetime="album.release_date">{{ formatDate(album.release_date) }}</time>
                </div>
            </div>
        </article>
    </div>
</template>

<script setup lang="ts" name="AlbumList">
import { AlbumInfo } from '../../types/global';
import { useRouter } from 'vue-router';

const props = defineProps<{
    albums: AlbumInfo[]
}>();

const router = useRouter();

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

const navigateToAlbumDetail = (albumId: number) => {
    router.push(`/album-detail/${albumId}`);
};
</script>

<style scoped>
.hover\:scale-105:hover {
    transform: scale(1.05);
}
</style>
