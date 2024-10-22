<template>
  <Disclosure as="nav" class="border-b border-gray-200 bg-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden"
              src="http://127.0.0.1:8000/music-r-s/logo.svg" alt="Your Company" />
            <img class="hidden h-8 w-auto lg:block"
              src="http://127.0.0.1:8000/music-r-s/logo.svg" alt="Your Company" />
          </div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink v-for="item in activeNavigation" :key="item.index" :to="item.href"
              :class="[item.current ? 'border-emerald-700 text-gray-800' : 'border-transparent text-gray-500 hover:border-emerald-700 hover:text-emerald-700', 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200']"
              :aria-current="item.current ? 'page' : undefined">
              {{ item.name }}
            </RouterLink>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <template v-if="isLoggedIn()">
            <NotificationMenu :notificationNavigation="notificationNavigation" />
            <UserMenu  :userNavigation="userNavigation" />
          </template>
          <template v-else>
            <router-link to="/login"
              class="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 mr-2 transition-colors duration-200">
              登录
            </router-link>
            <router-link to="/register"
              class="rounded-md bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 transition-colors duration-200">
              注册
            </router-link>
          </template>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 transition-colors duration-200">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <DisclosureButton v-for="item in activeNavigation" :key="item.name" as="a" :href="item.href"
          :class="[item.current ? 'border-emerald-700 bg-emerald-50 text-emerald-700' : 'border-transparent text-gray-600 hover:border-emerald-700 hover:bg-gray-50 hover:text-emerald-700', 'block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-colors duration-200']"
          :aria-current="item.current ? 'page' : undefined">{{ item.title }}</DisclosureButton>
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img v-if="userInfo?.avatar_url" class="h-10 w-10 rounded-full" :src="userInfo.avatar_url" alt="用户头像" />
            <UserCircleIcon v-else class="h-10 w-10 text-gray-300" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ userInfo?.username || '未登录' }}</div>
            <div class="text-sm font-medium text-gray-500">{{ userInfo?.email || '请登录以查看邮箱' }}</div>
          </div>
          <NotificationMenu :notificationNavigation="notificationNavigation" className="ml-auto"
            buttonClassName="flex-shrink-0" />
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts" name="NavBar">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { RouterLink, useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import NotificationMenu from './NotificationMenu.vue'
import UserMenu from './UserMenu.vue'
import { useUserStore } from '../store/user'
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { NavigationItem, UserInfo } from '../types/global'
import { getUserInfo } from '../api/httpClient'
const route = useRoute()
const userStore = useUserStore()

const userInfo = ref<UserInfo>()

onMounted(async () => {
  const res = await getUserInfo(userStore.getUserId())
  if (res.code === 0) {
    userInfo.value = res.data.user_info
  }
})

const props = defineProps<{
  navigation: Array<NavigationItem>;
  userNavigation: Array<Array<NavigationItem>>;
  notificationNavigation: Array<NavigationItem>;
}>();


const isLoggedIn = () => {
  return userStore.isLoggedIn
}

const activeNavigation = computed(() => {
  return props.navigation.map(item => ({
    ...item,
    current: route.path === item.href
  }))
})

</script>

