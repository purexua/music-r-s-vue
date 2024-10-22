<template>
    <div class="bg-white py-8 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <!-- 最新音乐 -->
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">最新音乐</h2>
                <p class="mt-2 text-lg leading-8 text-gray-500">最新上传的音乐作品</p>
            </div>
            <MusicList :musics="latestMusics" />

            <!-- 播放量最高 -->
            <div class="mx-auto max-w-2xl text-center mt-12">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">播放量最高</h2>
                <p class="mt-2 text-lg leading-8 text-gray-500">最受欢迎的热门音乐</p>
            </div>
            <MusicList :musics="topPlayCountMusics" />

            <!-- 点赞数最高 -->
            <div class="mx-auto max-w-2xl text-center mt-12">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">点赞数最高</h2>
                <p class="mt-2 text-lg leading-8 text-gray-500">最受喜爱的音乐作品</p>
            </div>
            <MusicList :musics="topLikeCountMusics" />

            <!-- 评论数最高 -->
            <div class="mx-auto max-w-2xl text-center mt-12">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">评论数最高</h2>
                <p class="mt-2 text-lg leading-8 text-gray-500">引发热议的音乐作品</p>
            </div>
            <MusicList :musics="topCommentCountMusics" />
        </div>
    </div>
</template>

<script setup lang="ts" name="TopList">
import { ref, onMounted } from 'vue';
import MusicList from '../components/list/MusicList.vue';
import { MusicInfo } from '../types/global';
import { getLatestMusics, getTopPlayCountMusics, getTopLikeCountMusics, getTopCommentCountMusics } from '../api/httpClient';

const latestMusics = ref<MusicInfo[]>([]);
const topPlayCountMusics = ref<MusicInfo[]>([]);
const topLikeCountMusics = ref<MusicInfo[]>([]);
const topCommentCountMusics = ref<MusicInfo[]>([]);

const fetchTopMusics = async () => {
    try {
        const latestResponse = await getLatestMusics(10);
        latestMusics.value = latestResponse.data.music_info_list;

        const playCountResponse = await getTopPlayCountMusics(10);
        topPlayCountMusics.value = playCountResponse.data.music_info_list;

        const likeCountResponse = await getTopLikeCountMusics(10);
        topLikeCountMusics.value = likeCountResponse.data.music_info_list;

        const commentCountResponse = await getTopCommentCountMusics(10);
        topCommentCountMusics.value = commentCountResponse.data.music_info_list;
    } catch (error) {
        console.error('获取排行榜数据失败', error);
    }
};

onMounted(() => {
    fetchTopMusics();
});
</script>

<style scoped></style>