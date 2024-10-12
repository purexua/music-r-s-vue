<template>
    <div>
        <div class="sm:hidden">
            <label for="tabs" class="sr-only">选择一个标签页</label>
            <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                <option v-for="item in navigationItems" :key="item.index" :selected="isActive(item)">{{ item.name }}</option>
            </select>
        </div>
        <div class="hidden sm:block">
            <nav class="flex space-x-4" aria-label="Tabs">
                <RouterLink
                    v-for="item in navigationItems"
                    :key="item.index"
                    :to="item.href"
                    :class="[
                        isActive(item) ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                        'rounded-md px-3 py-2 text-sm font-medium'
                    ]"
                    :aria-current="isActive(item) ? 'page' : undefined"
                >
                    {{ item.name }}
                </RouterLink>
            </nav>
        </div>
        <RouterView />
    </div>
</template>

<script setup lang="ts" name="MyLike">
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import type { NavigationItem } from '../types/global';

const route = useRoute();

const navigationItems = ref<NavigationItem[]>([
    { index: 1, name: '音乐', href: '/about-me/my-like/music', title: '我喜欢的音乐' },
    { index: 2, name: '专辑', href: '/about-me/my-like/album', title: '我喜欢的专辑' },
    { index: 3, name: '歌单', href: '/about-me/my-like/playlist', title: '我喜欢的歌单' },
]);

const isActive = (item: NavigationItem) => {
    return route.path.startsWith(item.href);
};
</script>

<style scoped>
/* 可以在这里添加特定的样式 */
</style>

