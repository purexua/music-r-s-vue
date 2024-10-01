<template>
  <Disclosure as="nav" class="border-b border-gray-200 bg-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <img class="hidden h-8 w-auto lg:block"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          </div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink v-for="item in activeNavigation" :key="item.index" :to="item.href"
              :class="[item.current ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium']"
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
              class="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 mr-2">
              登录
            </router-link>
            <router-link to="/register"
              class="rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              注册
            </router-link>
          </template>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
          :class="[item.current ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800', 'block border-l-4 py-2 pl-3 pr-4 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.title }}</DisclosureButton>
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="userStore.userInfo?.avatar_url" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ userStore.username }}</div>
            <div class="text-sm font-medium text-gray-500">{{ userStore.userInfo?.email }}</div>
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
import { computed } from 'vue'
import NotificationMenu from './NotificationMenu.vue'
import UserMenu from './UserMenu.vue'
import { useUserStore } from '../store/user'
import { NavigationItem } from '../types/global'

const route = useRoute()
const userStore = useUserStore()

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