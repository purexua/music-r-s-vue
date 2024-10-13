<template>
    <div class="p-4 min-h-screen bg-white">
        <template v-if="totalCount > 0">
            <AlbumCard :albumList="albumList" />
            <!-- 优化"加载更多"按钮 -->
            <div v-if="hasMore" class="flex justify-center mt-8">
                <button
                    @click="loadMore"
                    class="px-6 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md focus:ring-opacity-50"
                >
                    <span v-if="isLoading" class="inline-block animate-spin mr-2">&#9696;</span>
                    {{ isLoading ? '加载中...' : '加载更多' }}
                </button>
            </div>
        </template> 
        <template v-else>
            <div class="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                <RectangleStackIcon class="w-20 h-20 text-emerald-400 mb-4 animate-pulse" />
                <p class="text-2xl font-semibold text-gray-800">暂无专辑</p>
                <p class="text-sm text-gray-500 mt-2">该歌手目前没有可用的专辑</p>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts" name="SingerAlbums">
import { ref, onMounted, computed } from 'vue';
import { AlbumInfo } from '../types/global';
import { useRoute } from 'vue-router';
import { getSingerAlbumInfoById } from '../api/httpClient';
import AlbumCard from '../components/AlbumCard.vue';
import { RectangleStackIcon } from '@heroicons/vue/24/outline'
const route = useRoute();

const albumList = ref<AlbumInfo[]>([]);
const currentPage = ref(1);
const pageSize = 8; // 每页显示的专辑数量
const totalCount = ref(0);
const singerId = ref(Number(route.params.id));

// 移除 startIndex 和 endIndex 计算属性
// 添加 hasMore 计算属性
const hasMore = computed(() => albumList.value.length < totalCount.value);

const isLoading = ref(false);

onMounted(() => {
    fetchAlbumList();
});

async function fetchAlbumList(isLoadMore = false) {
    isLoading.value = true;
    const offset = (currentPage.value - 1) * pageSize;
    try {
        const response = await getSingerAlbumInfoById(singerId.value, pageSize, offset);
        if (response.code === 0) {
            if (response.data.count > 0) {
                if (isLoadMore) {
                    albumList.value = [...albumList.value, ...response.data.album_info_list];
                } else {
                    albumList.value = response.data.album_info_list;
                }
            }
            totalCount.value = response.data.count;
        } else {
            console.error('获取专辑列表失败:', response.msg);
        }
    } catch (error) {
        console.error('获取专辑列表出错:', error);
    } finally {
        isLoading.value = false;
    }
}

// 添加 loadMore 函数
function loadMore() {
    if (hasMore.value) {
        currentPage.value++;
        fetchAlbumList(true);
    }
}

// 移除 previousPage 和 nextPage 函数
</script>

<style scoped></style>
