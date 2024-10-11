<template>
    <div class="bg-white py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div v-if="likedMusic.length > 0" class="text-center">  
          <div class="mx-auto max-w-2xl " >
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我喜欢的音乐</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">这些是我收藏的精选音乐,每一首都承载着独特的音乐记忆。</p>
          </div>
          <MusicCard :musicList="likedMusic" />
        </div>
            <div v-else class="text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">您还没有喜欢的音乐</h2>
                <p class="mt-6 text-lg leading-8 text-gray-600">去探索一些新的音乐,开始您的音乐收藏之旅吧！</p>
                <button @click="navigateToDiscoverMusic" class="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                    发现音乐
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="MyLikeMusic">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MusicCard from '../components/MusicCard.vue';
import { MusicSCardInfo } from '../types/global';
import { getUserLikedMusicIdList, getMusicCardInfoByIdList } from '../api/httpClient';
import { useUserStore } from '../store/user';

const router = useRouter();
const userStore = useUserStore();
const likedMusic = ref<MusicSCardInfo[]>([]);

const navigateToDiscoverMusic = () => {
    router.push('/feed');
};

const fetchLikedMusic = async () => {
    try {
        const userId = userStore.userId;
        const likeResponse = await getUserLikedMusicIdList(userId);
        const musicIds = likeResponse.data.music_id_list;
        console.log(musicIds);
        if (musicIds.length > 0) {
            const musicResponse = await getMusicCardInfoByIdList(musicIds);
            likedMusic.value = musicResponse.data.music_card_info_list;
        }
    } catch (error) {
        console.error('获取喜欢的音乐列表失败', error);
        // 这里可以添加错误处理逻辑,比如显示错误消息
    }
};

onMounted(() => {
    fetchLikedMusic();
});
</script>

<style scoped>
/* 如果需要,可以在这里添加自定义样式 */
</style>
