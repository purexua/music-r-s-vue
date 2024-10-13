<template>
  <Menu as="div" class="relative">
    <div>
      <MenuButton
        :class="['relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2']">
        <span class="absolute -inset-1.5" />
        <span class="sr-only">查看通知</span>
        <BellIcon class="h-6 w-6" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <MenuItem v-for="item in notificationNavigation" :key="item.index" v-slot="{ active, close }">
        <a
          :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-800 hover:text-emerald-700']"
          @click.prevent="handleClick(item.href, close)"
        >
          <component :is="item.icon" class="mr-3 inline-block h-5 w-5 text-gray-400" aria-hidden="true" />
          {{ item.name }}
        </a>
      </MenuItem>
    </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts" name="NotificationMenu">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { NavigationItem } from '../types/global'
const router = useRouter()

const handleClick = (href: string, close: () => void) => {
  close();
  router.push(href);
}

defineProps<{
  notificationNavigation: Array<NavigationItem>;
}>();
</script>
