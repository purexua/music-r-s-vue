<template>
    <div class="p-4 min-h-screen">
        <template v-if="totalCount > 0">
            <MusicCard :musicList="musicList" />
            <!-- 添加"加载更多"按钮 -->
            <div v-if="hasMore" class="flex justify-center mt-8">
                <button
                    @click="loadMore"
                    class="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md focus:ring-opacity-50"
                >
                    <span v-if="isLoading" class="inline-block animate-spin mr-2">&#9696;</span>
                    {{ isLoading ? '加载中...' : '加载更多' }}
                </button>
            </div>
        </template>
        <template v-else>
            <div class="flex flex-col items-center justify-center h-64 bg-white rounded-lg">
                <RectangleStackIcon class="w-16 h-16 text-gray-400 mb-4" />
                <p class="text-xl font-semibold text-gray-700">暂无音乐</p>
                <p class="text-sm text-gray-500 mt-2">该歌手目前没有可用的音乐作品</p>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts" name="SingerSongs">
import { ref, onMounted, computed } from 'vue';
import { MusicSCardInfo } from '../types/global';
import { useRoute } from 'vue-router';
import { getSingerMusicCardInfoById } from '../api/httpClient';
import MusicCard from '../components/MusicCard.vue';
import { RectangleStackIcon } from '@heroicons/vue/24/outline'

const route = useRoute();

const musicList = ref<MusicSCardInfo[]>([]);
const currentPage = ref(1);
const pageSize = 8; // 每页加载的音乐数量
const totalCount = ref(0);
const singerId = ref(Number(route.params.id));

// 添加 hasMore 计算属性
const hasMore = computed(() => musicList.value.length < totalCount.value);

const isLoading = ref(false);

onMounted(() => {
    fetchMusicList();
});

async function fetchMusicList(isLoadMore = false) {
    isLoading.value = true;
    const offset = (currentPage.value - 1) * pageSize;
    try {
        const response = await getSingerMusicCardInfoById(singerId.value, pageSize, offset);
        if (response.code === 0) {
            if (response.data.count > 0) {
                if (isLoadMore) {
                    musicList.value = [...musicList.value, ...response.data.music_card_info_list];
                } else {
                    musicList.value = response.data.music_card_info_list;
                }
            }
            totalCount.value = response.data.count;
        } else {
            console.error('获取音乐列表失败:', response.msg);
        }
    } catch (error) {
        console.error('获取音乐列表出错:', error);
    } finally {
        isLoading.value = false;
    }
}

// 添加 loadMore 函数
function loadMore() {
    if (hasMore.value) {
        currentPage.value++;
        fetchMusicList(true);
    }
}

// 移除 previousPage 和 nextPage 函数
</script>

<style scoped></style>
