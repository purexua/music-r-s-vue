<template>
    <div class="relative">
        <div class="mb-4 flex justify-end my-4">
            <button @click="openModal"
                class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
                创建歌单
            </button>
        </div>
        <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <div v-for="playlist in playlists" :key="playlist.id"
                class="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
                <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden relative cursor-pointer"
                    @click="openQuickview(playlist)">
                    <img :src="playlist.cover_url" :alt="playlist.playlist_name"
                        class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300">
                    <div
                        class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                        <EyeIcon
                            class="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{{ playlist.playlist_name }}</h3>
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex flex-wrap gap-2">
                                <span v-for="(tag, index) in playlist.tags.split('-')" :key="index"
                                    class="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full transition-colors duration-300 hover:bg-gray-300 hover:text-emerald-700">
                                    {{ tag.trim() }}
                                </span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <HeartIcon class="h-5 w-5 text-emerald-600 mr-1" />
                                <span class="text-sm text-gray-800">{{ formatNumber(playlist.like_count) }}</span>
                            </div>
                        </div>
                    </div>
                    <button @click="navigateToPlaylistDetail(playlist.id)"
                        class="w-full px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-300 flex items-center justify-center">
                        <PlayIcon class="h-5 w-5 mr-2" />
                        歌单详情
                    </button>
                </div>
            </div>
        </div>
    </div>

    <TransitionRoot as="template" :show="isQuickviewOpen">
        <Dialog as="div" class="relative z-10" @close="closeQuickview">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 md:scale-100"
                        leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                        <DialogPanel
                            class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                            <div
                                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl border border-gray-200">
                                <div
                                    class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 mt-8">
                                    <div
                                        class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5 shadow-md">
                                        <img :src="selectedPlaylist.cover_url" :alt="selectedPlaylist.playlist_name"
                                            class="object-cover object-center w-full h-full" />
                                    </div>
                                    <div class="sm:col-span-8 lg:col-span-7">
                                        <div class="flex items-center justify-between">
                                            <h2 class="text-2xl font-bold text-gray-800 sm:pr-12 flex items-center">
                                                <MusicalNoteIcon class="h-6 w-6 text-emerald-600 mr-2" />
                                                {{ selectedPlaylist.playlist_name }}
                                            </h2>
                                            <div class="flex items-center text-gray-600">
                                                <HeartIcon class="h-6 w-6 text-emerald-600 mr-1" />
                                                <span class="text-lg font-semibold text-gray-800">{{ selectedPlaylist.like_count }}</span>
                                            </div>
                                        </div>

                                        <section aria-labelledby="information-heading" class="mt-4">
                                            <h3 id="information-heading" class="sr-only">歌单信息</h3>

                                            <div class="flex flex-wrap gap-2 mb-4">
                                                <span v-for="(tag, index) in selectedPlaylist.tags.split('-')"
                                                    :key="index"
                                                    class="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full flex items-center border border-gray-300 hover:bg-gray-200 transition-colors duration-200 hover:text-emerald-700">
                                                    <TagIcon class="h-4 w-4 mr-1 text-emerald-600" />
                                                    {{ tag.trim() }}
                                                </span>
                                            </div>
                                        </section>

                                        <section aria-labelledby="description-heading" class="mt-6">
                                            <h3 id="description-heading"
                                                class="text-lg font-medium text-gray-800 flex items-center">
                                                <InformationCircleIcon class="h-5 w-5 text-gray-500 mr-2" />
                                                歌单描述
                                            </h3>

                                            <div class="mt-2">
                                                <p class="text-base text-gray-700">{{ selectedPlaylist.description }}</p>
                                            </div>
                                        </section>

                                        <div class="mt-8 flex space-x-4">
                                            <button @click="handleLikePlaylist" :class="[ 
                                                'flex-1 flex items-center justify-center px-4 py-2 text-base font-medium rounded-md transition-colors duration-200',
                                                isLiked
                                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md'
                                                    : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:shadow-sm'
                                            ]">
                                                <HeartIcon
                                                    :class="['h-5 w-5 mr-2', isLiked ? 'text-white' : 'text-gray-400']" />
                                                {{ isLiked ? '取消收藏' : '收藏歌单' }}
                                            </button>
                                            <button @click="handleDeletePlaylist"
                                                class="flex-1 flex items-center justify-center px-4 py-2 text-base font-medium rounded-md transition-colors duration-200 bg-red-500 text-white hover:bg-red-600 hover:shadow-md">
                                                <TrashIcon class="h-5 w-5 mr-2" />
                                                删除歌单
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <!-- 添加歌单模态框 -->
    <TransitionRoot as="template" :show="isModalOpen">
        <Dialog as="div" class="relative z-10" @close="closeModal">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-800">
                                            添加新歌单
                                        </DialogTitle>
                                        <div class="mt-2">
                                            <form @submit.prevent="submitPlaylist">
                                                <div class="mb-4">
                                                    <label for="playlist-name"
                                                        class="block text-sm font-medium text-gray-700">歌单名称</label>
                                                    <input type="text" id="playlist-name"
                                                        v-model="newPlaylist.playlist_name" required
                                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-600 focus:ring-emerald-600 sm:text-sm">
                                                </div>
                                                <div class="mb-4">
                                                    <label for="tags" class="block text-sm font-medium text-gray-700">标签
                                                        (最多3个，用-分隔)</label>
                                                    <input type="text" id="tags" v-model="newPlaylist.tags"
                                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-600 focus:ring-emerald-600 sm:text-sm">
                                                </div>
                                                <div class="mb-4">
                                                    <label for="description"
                                                        class="block text-sm font-medium text-gray-700">描述</label>
                                                    <textarea id="description" v-model="newPlaylist.description"
                                                        rows="3"
                                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-600 focus:ring-emerald-600 sm:text-sm"></textarea>
                                                </div>
                                                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                    <button type="submit"
                                                        class="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 sm:ml-3 sm:w-auto">
                                                        添加
                                                    </button>
                                                    <button type="button" @click="closeModal"
                                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                                        取消
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { MusicalNoteIcon, TagIcon, InformationCircleIcon, PlayIcon, HeartIcon, EyeIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { PlaylistInfo, DefaultPlaylistInfo } from '../types/global'
import { useRouter } from 'vue-router'
import { checkUserLikedPlaylist, likePlaylist, unlikePlaylist, getUserCreatedPlaylistList, deletePlaylist } from '../api/httpClient'
import { createPlaylist } from '../api/httpClient'
import { useUserStore } from '../store/user'

const router = useRouter()
const userStore = useUserStore()

const playlists = ref<PlaylistInfo[]>([])
const isModalOpen = ref(false)
const newPlaylist = ref<PlaylistInfo>(DefaultPlaylistInfo)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    resetForm()
    fetchPlaylists()
}

const resetForm = () => {
    newPlaylist.value = DefaultPlaylistInfo
}

const validateTags = (tags: string): string[] | null => {
    // 移除首尾空格，并按 '-' 分割
    const tagArray = tags.trim().split('-').map(tag => tag.trim()).filter(tag => tag !== '')

    // 检查是否不超过 3 个标签
    if (tagArray.length > 3) {
        return null
    }

    // 如果所有检查都通过，返回处理后的标签数组
    return tagArray
}

const submitPlaylist = async () => {
    // 验证标签
    const validatedTags = validateTags(newPlaylist.value.tags)
    if (validatedTags === null) {
        alert('标签格式不正确。请确保不超过3个标签，并用"-"分隔。')
        return
    }

    // 更新 newPlaylist 中的 tags
    newPlaylist.value.tags = validatedTags.join('-')

    try {
        const response = await createPlaylist(
            newPlaylist.value.playlist_name,
            newPlaylist.value.tags,
            newPlaylist.value.description,
            userStore.userId
        )
        if (response.code === 0) {
            closeModal()
        } else {
            alert(response.message)
        }
    } catch (error) {
        alert('创建歌单失败，请稍后重试')
    }
}

const fetchPlaylists = async () => {
    try {
        const userId = userStore.userId
        const response = await getUserCreatedPlaylistList(userId)
        playlists.value = response.data.playlist_info_list
    } catch (error) {
        console.error('获取歌单列表失败', error)
    }
}

onMounted(() => {
    fetchPlaylists()
})

const isQuickviewOpen = ref(false)
const selectedPlaylist = ref<PlaylistInfo>(DefaultPlaylistInfo)
const isLiked = ref(false)

const openQuickview = async (playlist: PlaylistInfo) => {
    selectedPlaylist.value = playlist
    isQuickviewOpen.value = true
    await checkLikeStatus()
}

const closeQuickview = () => {
    isQuickviewOpen.value = false
    fetchPlaylists()
}

const navigateToPlaylistDetail = (id: number) => {
    router.push(`/playlist-detail/${id}`)
}

const checkLikeStatus = async () => {
    try {
        const result = await checkUserLikedPlaylist(userStore.userId, selectedPlaylist.value.id)
        isLiked.value = result.data
    } catch (error) {
        console.error('检查收藏状态失败', error)
    }
}

async function handleLikePlaylist() {
    try {
        if (isLiked.value) {
            await unlikePlaylist(userStore.userId, selectedPlaylist.value.id)
            isLiked.value = false
            selectedPlaylist.value.like_count--
        } else {
            await likePlaylist(userStore.userId, selectedPlaylist.value.id)
            isLiked.value = true
            selectedPlaylist.value.like_count++
        }
    } catch (error) {
        console.error('切换收藏状态失败', error)
    }
}

async function handleDeletePlaylist() {
    try {
        await deletePlaylist(selectedPlaylist.value.id)
        closeQuickview()
    } catch (error) {
        console.error('删除歌单失败', error)
    }
}

function formatNumber(num: number): string {
    if (num == null) return '0'

    if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
    }

    return num.toLocaleString('zh-CN')
}
</script>