<template>
    <div class="bg-white">
      <!-- 封面图部分 -->
      <div aria-hidden="true" class="relative">
        <img :src="userInfo.cover_url" alt="用户封面" class="h-96 w-full object-cover object-center" />
        <div class="absolute inset-0 bg-gradient-to-t from-white" />
      </div>
  
      <!-- 个人信息部分 -->
      <div class="relative mx-auto -mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-start space-x-8">
          <img class="aspect-square w-40 flex-none rounded-2xl object-cover shadow-lg" :src="userInfo.avatar_url"
            :alt="userInfo.username" />
          <div class="max-w-xl flex-auto">
            <h3 class="text-3xl font-semibold leading-8 tracking-tight text-gray-800">{{ userInfo.username }}</h3>
            <p class="mt-2 text-xl leading-7 text-gray-600">{{ userInfo.gender }} · {{ userInfo.age }}岁</p>
            <p class="mt-4 text-base leading-7 text-gray-600">{{ userInfo.description }}</p>
            <div class="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
              <p class="flex items-center">
                <CakeIcon class="h-5 w-5 mr-2 text-gray-400" />
                {{ userInfo.birthday ? formatDate(userInfo.birthday) : '未知' }}
              </p>
              <p class="flex items-center">
                <EnvelopeIcon class="h-5 w-5 mr-2 text-gray-400" />
                {{ userInfo.email || '未知' }}
              </p>
            </div>
            <ul role="list" class="mt-6 flex gap-x-6">
              <li>
                <a href="#" class="text-gray-400 hover:text-emerald-700">
                  <span class="sr-only">X</span>
                  <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- 导航部分 -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">选择一个标签页</label>
          <select id="tabs" name="tabs" v-model="selectedTab"
            class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
            <option v-for="tab in tabs" :key="tab.index" :value="tab.href">{{ tab.name }}</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
            <RouterLink v-for="(tab, tabIdx) in tabs" :key="tab.index" :to="tab.href" :class="[
              isCurrentTab(tab) ? 'text-gray-800' : 'text-gray-500 hover:text-emerald-700',
              tabIdx === 0 ? 'rounded-l-lg' : '',
              tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
              'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
            ]" :aria-current="isCurrentTab(tab) ? 'page' : undefined">
              <span class="flex items-center justify-center">
                <component :is="tab.icon" v-if="tab.icon" class="h-5 w-5 mr-2" />
                {{ tab.name }}
              </span>
              <span aria-hidden="true"
                :class="[isCurrentTab(tab) ? 'bg-emerald-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
            </RouterLink>
          </nav>
        </div>
        <div class="mt-10">
          <RouterView />
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts" name="AboutMe">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView, RouterLink } from 'vue-router'
import { UserInfo } from '../types/global'
import { useUserStore } from '../store/user'
import { CakeIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import { NavigationItem } from '../types/global'
import { HeartIcon, MusicalNoteIcon, UserGroupIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'

const userStore = useUserStore()

const userInfo = ref<UserInfo>({
    ...userStore.userInfo
})

const route = useRoute()
const selectedTab = ref(route.path)

const tabs = ref<NavigationItem[]>([
    { index: 0, name: '我的喜欢', href: '/about-me/my-like/music', title: '我喜欢的内容', icon: HeartIcon },
    { index: 1, name: '我的关注', href: '/about-me/my-follow-singer', title: '我关注的歌手', icon: UserGroupIcon },
    { index: 2, name: '我的歌单', href: '/about-me/my-playlist', title: '我的歌单列表', icon: MusicalNoteIcon },
    { index: 3, name: '设置', href: '/about-me/settings', title: '设置', icon: Cog6ToothIcon },
])

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const isCurrentTab = (tab: NavigationItem) => {
    return route.path.startsWith(tab.href) || (tab.href === '/about-me/my-like/music' && route.path.startsWith('/about-me/my-like/'));
}
</script>

<style scoped>
/* 可以在这里添加任何特定的样式 */
</style>