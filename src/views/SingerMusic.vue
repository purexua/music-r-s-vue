<template>
    <div class="p-4">
        <template v-if="totalCount > 0">
            <MusicCard :musicList="musicList" />
            <div class="mt-4 flex flex-1 justify-between items-center">
                <span class="text-sm text-gray-700">
                    显示第 {{ startIndex }} 到 {{ endIndex }} 项，共 {{ totalCount }} 项
                </span>
                <div class="flex justify-end">
                    <button @click="previousPage" :disabled="currentPage === 1"
                        class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed">
                        上一页
                    </button>
                    <button @click="nextPage" :disabled="!hasNextPage"
                        class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed">
                        下一页
                    </button>
                </div>
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
import { ref, onMounted, watch, computed } from 'vue';
import { MusicSCardInfo } from '../types/global';
import { useRoute } from 'vue-router';
import { getMusicCardInfoBySingerId } from '../api/httpClient';
import MusicCard from '../components/MusicCard.vue';
import { RectangleStackIcon } from '@heroicons/vue/24/outline'

const route = useRoute();

const musicList = ref<MusicSCardInfo[]>([]);
const currentPage = ref(1);
const pageSize = 20; // 每页显示的音乐数量
const totalCount = ref(0);
const singerId = ref(Number(route.params.id));

const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1);
const endIndex = computed(() => Math.min(currentPage.value * pageSize, totalCount.value));
const hasNextPage = computed(() => endIndex.value < totalCount.value);

onMounted(() => {
    fetchMusicList();
});

watch(currentPage, () => {
    fetchMusicList();
});

async function fetchMusicList() {
    const offset = (currentPage.value - 1) * pageSize;
    const response = await getMusicCardInfoBySingerId(singerId.value, pageSize, offset);
    if (response.code === 0) {
        if (response.data.count > 0) {  
            musicList.value = response.data.music_card_list_info;
        }
        totalCount.value = response.data.count;
    } else {
        console.error('获取音乐列表失败:', response.msg);
    }
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (hasNextPage.value) {
        currentPage.value++;
    }
}
</script>

<style scoped></style>
