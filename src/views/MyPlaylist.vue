<template>
    <div class="bg-white py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="relative">
                <div class="text-center">
                    <div class="mx-auto max-w-2xl">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">我的歌单</h2>
                        <p class="mt-6 text-lg leading-8 text-gray-500">这些是我创建和收藏的歌单，每一个都代表着不同的音乐风格和心情。</p>
                    </div>
                    <PlayListList />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PlayListList from '../components/PlayListList.vue'
</script>

<style scoped>
/* 可以在这里添加任何特定于组件的样式 */
</style>
