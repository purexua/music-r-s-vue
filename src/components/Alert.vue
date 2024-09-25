<template>
  <div v-if="isVisible" :class="[
    'rounded-md p-4 my-2',
    colorClasses[type as keyof typeof colorClasses].bg
  ]">
    <div class="flex">
      <div class="flex-shrink-0">
        <component :is="icon" :class="[
          'h-5 w-5',
          colorClasses[type as keyof typeof colorClasses].icon
        ]" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p :class="[
          'text-sm',
          colorClasses[type as keyof typeof colorClasses].text,
          { 'font-medium': type !== 'info' }
        ]">
          {{ title }}
        </p>
      </div>
      <div v-if="closable" class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button type="button" :class="[
            'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
            colorClasses[type as keyof typeof colorClasses].button
          ]" @click="close">
            <span class="sr-only">{{ closeText }}</span>
            <XMarkIcon v-if="!closeText" class="h-5 w-5" aria-hidden="true" />
            <span v-else>{{ closeText }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Alert">
import { ref, computed } from 'vue'
import { InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value: string) => ['info', 'warning', 'success', 'error'].includes(value)
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const isVisible = ref(true)

const close = () => {
  isVisible.value = false
  emit('close')
}

const colorClasses = {
  info: {
    bg: 'bg-blue-50',
    icon: 'text-blue-400',
    text: 'text-blue-700',
    button: 'bg-blue-50 text-blue-500 hover:bg-blue-100'
  },
  warning: {
    bg: 'bg-yellow-50',
    icon: 'text-yellow-400',
    text: 'text-yellow-700',
    button: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100'
  },
  success: {
    bg: 'bg-green-50',
    icon: 'text-green-400',
    text: 'text-green-700',
    button: 'bg-green-50 text-green-500 hover:bg-green-100'
  },
  error: {
    bg: 'bg-red-50',
    icon: 'text-red-400',
    text: 'text-red-700',
    button: 'bg-red-50 text-red-500 hover:bg-red-100'
  }
}

const icon = computed(() => {
  return {
    info: InformationCircleIcon,
    warning: ExclamationTriangleIcon,
    success: CheckCircleIcon,
    error: XMarkIcon
  }[props.type]
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>