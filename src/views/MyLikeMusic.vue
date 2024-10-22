<template>
    <div class="bg-white pt-12 sm:pt-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="text-center">
                <!-- 展示喜欢的音乐列表 -->
                <div v-if="likedMusic.length > 0">
                    <div class="mx-auto max-w-2xl">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">我喜欢的音乐</h2>
                        <p class="mt-6 text-lg leading-8 text-gray-500">这些是我收藏的精选音乐,每一首都承载着独特的音乐记忆。</p>
                    </div>
                    <MusicCard :musicList="likedMusic" />
                    <div v-if="hasMore" class="mt-8">
                        <button @click="loadMoreLikedMusic"
                            class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
                            加载更多
                        </button>
                    </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center text-gray-500">
                    <MusicalNoteIcon class="w-16 h-16 mb-4 animate-bounce text-emerald-600" />
                    <p class="text-xl font-medium mb-2 text-gray-800">您还没有喜欢的音乐</p>
                    <p class="text-sm mb-8">去探索一些新的音乐,开始您的音乐收藏之旅吧！</p>
                    <button @click="navigateToDiscoverMusic"
                        class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
                        发现音乐
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="MyLikeMusic">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MusicCard from '../components/card/MusicCard.vue';
import { MusicSCardInfo } from '../types/global';
import { getUserLikedMusicIdsList } from '../api/httpClient';
import { useUserStore } from '../store/user';
import { MusicalNoteIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const userStore = useUserStore();

const userId = userStore.getUserId()
const likedMusic = ref<MusicSCardInfo[]>([]);
const hasMore = ref(false)
const currentPage = ref(0)
const pageSize = 8

const navigateToDiscoverMusic = () => {
    router.push('/feed');
};

const loadMoreLikedMusic = () => {
    fetchLikedMusic()
}

const fetchLikedMusic = async () => {
    try {
        const followResponse = await getUserLikedMusicIdsList(userId, pageSize, currentPage.value * pageSize)
        if (followResponse.data.music_card_info_list && followResponse.data.music_card_info_list.length > 0) {
            likedMusic.value = [...likedMusic.value, ...followResponse.data.music_card_info_list]
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

onMounted(() => {
    fetchLikedMusic();
});
</script>

<style scoped>
/* 如果需要,可以在这里添加自定义样式 */
</style>
