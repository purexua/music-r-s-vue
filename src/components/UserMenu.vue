<template>
  <Menu as="div" class="relative ml-4 bg-white">
    <div>
      <MenuButton
        class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
        <span class="absolute -inset-1.5" />
        <span class="sr-only">打开用户菜单</span>
        <div
          v-if="userStore.userInfo.avatar_url !== '' && userStore.userInfo.avatar_url !== null && userStore.userInfo.avatar_url !== undefined">
          <img :src="userStore.userInfo.avatar_url" alt="用户头像" class="h-8 w-8 rounded-full object-cover" />
        </div>
        <UserCircleIcon v-else class="h-8 w-8 text-gray-500" aria-hidden="true" />
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <!-- 修改分隔线颜色 -->
        <div v-for="(section, sectionIndex) in userNavigation" :key="sectionIndex" class="py-1">
          <MenuItem v-for="item in section" :key="item.index" v-slot="{ active, close }">
          <a :class="[
            active ? 'text-emerald-700 bg-gray-200' : '  text-gray-900',
            'block px-4 py-2 text-sm',
            item.name === '我的主页' ? 'font-bold text-gray-900' : ''
          ]" @click.prevent="handleClick(item.href, close)">
            {{ item.name }}
          </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts" name="UserMenu">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { NavigationItem } from '../types/global'
import { UserCircleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const userStore = useUserStore()

const handleClick = (href: string, close: () => void) => {
  // 单独判断 logout
  if (href === '/logout') {
    close();
    userStore.logout();
    router.push('/feed');
    return;
  }
  close();
  router.push(href);
}

defineProps<{
  userNavigation: Array<Array<NavigationItem>>;
}>();
</script>
