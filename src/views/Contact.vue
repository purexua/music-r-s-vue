<template>
  <div class="isolate bg-white px-6 py-4 sm:py-16 lg:px-8">
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">联系支持</h2>
      <p class="mt-2 text-lg leading-8 text-gray-500">我们随时为您提供帮助和支持。</p>
    </div>
    <div class="mx-auto mt-20 max-w-lg space-y-16">
      <div v-for="(item, index) in supportItems" :key="index" 
           class="flex gap-x-6 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md group">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 transition-colors duration-300 group-hover:bg-gray-200">
          <component :is="item.icon" class="h-6 w-6 text-gray-500 transition-colors duration-300 group-hover:text-emerald-700" aria-hidden="true" />
        </div>
        <div>
          <h3 class="text-base font-semibold leading-7 text-gray-800">{{ item.title }}</h3>
          <p class="mt-2 leading-7 text-gray-500">{{ item.description }}</p>
          <p class="mt-4">
            <a :href="item.link" class="text-sm font-semibold leading-6 text-gray-600 group-hover:text-emerald-700 transition-colors duration-300">
              {{ item.linkText }} 
              <span aria-hidden="true" class="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts" name="Contact">
  import { BugAntIcon, ChatBubbleLeftRightIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'

  const supportItems = [
    {
      icon: BugAntIcon,
      title: 'Bug reports',
      description: '报告错误',
      link: '#',
      linkText: '报告错误'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Technical support',
      description: '技术支持',
      link: '#',
      linkText: '加入我们的Discord'
    },
    {
      icon: ComputerDesktopIcon,
      title: 'Service support',
      description: '服务支持',
      link: '#',
      linkText: '联系开发人员'
    }
  ]
  </script>