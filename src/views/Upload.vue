<template>
    <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
                <!-- 上传类型选择 -->
                <div class="border-b border-gray-200 pb-8 mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">选择上传类型</h2>
                    <div class="flex space-x-4">
                        <label class="flex items-center cursor-pointer">
                            <input type="radio" v-model="uploadType" value="singer" class="sr-only" />
                            <div class="w-6 h-6 border-2 border-gray-300 rounded-full mr-2 flex items-center justify-center"
                                :class="{ 'border-emerald-500': uploadType === 'singer' }">
                                <div v-if="uploadType === 'singer'"
                                    class="w-3 h-3 bg-emerald-500 rounded-full transition-all duration-200"></div>
                            </div>
                            <span class="text-gray-700">歌手信息</span>
                        </label>
                        <label class="flex items-center cursor-pointer">
                            <input type="radio" v-model="uploadType" value="music" class="sr-only" />
                            <div class="w-6 h-6 border-2 border-gray-300 rounded-full mr-2 flex items-center justify-center"
                                :class="{ 'border-emerald-500': uploadType === 'music' }">
                                <div v-if="uploadType === 'music'"
                                    class="w-3 h-3 bg-emerald-500 rounded-full transition-all duration-200"></div>
                            </div>
                            <span class="text-gray-700">音乐信息</span>
                        </label>
                        <label class="flex items-center cursor-pointer">
                            <input type="radio" v-model="uploadType" value="album" class="sr-only" />
                            <div class="w-6 h-6 border-2 border-gray-300 rounded-full mr-2 flex items-center justify-center"
                                :class="{ 'border-emerald-500': uploadType === 'album' }">
                                <div v-if="uploadType === 'album'"
                                    class="w-3 h-3 bg-emerald-500 rounded-full transition-all duration-200"></div>
                            </div>
                            <span class="text-gray-700">专辑信息</span>
                        </label>
                    </div>
                </div>

                <!-- 歌手信息表单 -->
                <div v-if="uploadType === 'singer'" class="space-y-6">
                    <h2 class="text-xl font-semibold text-gray-900">歌手信息</h2>
                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="singer-name" class="block text-sm font-medium text-gray-700">姓名</label>
                            <div class="mt-1">
                                <input type="text" id="singer-name" v-model="singerInfo.name"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="singer-stage-name" class="block text-sm font-medium text-gray-700">艺名</label>
                            <div class="mt-1">
                                <input type="text" id="singer-stage-name" v-model="singerInfo.stage_name"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="singer-gender" class="block text-sm font-medium text-gray-700">性别</label>
                            <div class="mt-1">
                                <select id="singer-gender" v-model="singerInfo.gender"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                    <option value="other">其他</option>
                                </select>
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="singer-birthday" class="block text-sm font-medium text-gray-700">生日</label>
                            <div class="mt-1">
                                <input type="date" id="singer-birthday" v-model="singerInfo.birthday"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="singer-origin-country"
                                class="block text-sm font-medium text-gray-700">国籍</label>
                            <div class="mt-1">
                                <input type="text" id="singer-origin-country" v-model="singerInfo.origin_country"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-full grid grid-cols-2 gap-4">
                            <div>
                                <label for="singer-main-genre"
                                    class="block text-sm font-medium text-gray-700">主要音乐风格</label>
                                <div class="mt-1">
                                    <input type="text" id="singer-main-genre" v-model="singerInfo.main_genre"
                                        placeholder="例如：流行-摇滚-爵士"
                                        class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>

                            <div>
                                <label for="singer-debut-year"
                                    class="block text-sm font-medium text-gray-700">出道年份</label>
                                <div class="mt-1">
                                    <input type="text" id="singer-debut-year" v-model="singerInfo.debut_year"
                                        placeholder="例如：2023" pattern="\d{4}" title="请输入4位数字年份"
                                        class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>
                        </div>
                        <div class="sm:col-span-full grid grid-cols-2 gap-4 mt-1">
                            <p class="text-sm text-amber-500 flex items-center">
                                <ExclamationCircleIcon class="h-4 w-4 mr-1" />
                                请使用 - 分隔不同风格
                            </p>
                            <p class="text-sm text-amber-500 flex items-center">
                                <ExclamationCircleIcon class="h-4 w-4 mr-1" />
                                请务必输入4位数字年份
                            </p>
                        </div>

                        <div class="col-span-full">
                            <label for="singer-description" class="block text-sm font-medium text-gray-700">简介</label>
                            <div class="mt-1">
                                <textarea id="singer-description" v-model="singerInfo.description" rows="3"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="singer-avatar" class="block text-sm font-medium text-gray-700">头像</label>
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="singer-avatar-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                            <span>上传头像</span>
                                            <input id="singer-avatar-upload" name="singer-avatar-upload" type="file"
                                                class="sr-only" @change="handleSingerAvatarUpload" />
                                        </label>
                                        <p class="pl-1">或拖放文件</p>
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 音乐信息表单 -->
                <div v-if="uploadType === 'music'" class="space-y-6">
                    <h2 class="text-xl font-semibold text-gray-900">音乐信息</h2>
                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="music-title" class="block text-sm font-medium text-gray-700">标题</label>
                            <div class="mt-1">
                                <input type="text" id="music-title" v-model="musicInfo.title"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="music-singer-id" class="block text-sm font-medium text-gray-700">歌手ID</label>
                            <div class="mt-1">
                                <input type="text" id="music-singer-id" v-model.number="musicInfo.singer_id"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="music-album-id" class="block text-sm font-medium text-gray-700">专辑ID</label>
                            <div class="mt-1">
                                <input type="text" id="music-album-id" v-model.number="musicInfo.album_id"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="music-singer-name" class="block text-sm font-medium text-gray-700">歌手名称</label>
                            <div class="mt-1">
                                <input type="text" id="music-singer-name" v-model="musicInfo.singer_name"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="music-album-name" class="block text-sm font-medium text-gray-700">专辑名称</label>
                            <div class="mt-1">
                                <input type="text" id="music-album-name" v-model="musicInfo.album_name"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="music-release-date" class="block text-sm font-medium text-gray-700">发行日期</label>
                            <div class="mt-1">
                                <input type="date" id="music-release-date" v-model="musicInfo.release_date"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-full grid grid-cols-3 gap-4">
                            <div>
                                <label for="music-emotions" class="block text-sm font-medium text-gray-700">情感标签</label>
                                <div class="mt-1">
                                    <input type="text" id="music-emotions" v-model="musicInfo.emotions"
                                        placeholder="例如：快乐-悲伤-激情"
                                        class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>

                            <div>
                                <label for="music-genres" class="block text-sm font-medium text-gray-700">音乐风格</label>
                                <div class="mt-1">
                                    <input type="text" id="music-genres" v-model="musicInfo.genres"
                                        placeholder="例如：流行-摇滚-爵士"
                                        class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>

                            <div>
                                <label for="music-instruments"
                                    class="block text-sm font-medium text-gray-700">乐器</label>
                                <div class="mt-1">
                                    <input type="text" id="music-instruments" v-model="musicInfo.instruments"
                                        placeholder="例如：吉他-钢琴-鼓"
                                        class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-amber-500 flex items-center col-span-full">
                            <ExclamationCircleIcon class="h-4 w-4 mr-1" />
                            请在以上输入框中使用 - 分隔不同标签、风格或乐器
                        </p>

                        <div class="col-span-full">
                            <label for="music-file" class="block text-sm font-medium text-gray-700">音乐文件</label>
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <MusicalNoteIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="music-file-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                            <span>上传音乐文件</span>
                                            <input id="music-file-upload" name="music-file-upload" type="file"
                                                class="sr-only" @change="handleMusicFileUpload" />
                                        </label>
                                        <p class="pl-1">或拖放文件</p>
                                    </div>
                                    <p class="text-xs text-gray-500">MP3, WAV, FLAC 最大 50MB</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="music-cover" class="block text-sm font-medium text-gray-700">封面图片</label>
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="music-cover-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                            <span>上传封面图片</span>
                                            <input id="music-cover-upload" name="music-cover-upload" type="file"
                                                class="sr-only" @change="handleMusicCoverUpload" />
                                        </label>
                                        <p class="pl-1">或拖放文件</p>
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="music-lyric" class="block text-sm font-medium text-gray-700">歌词文件（可选）</label>
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="music-lyric-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                            <span>上传歌词文件</span>
                                            <input id="music-lyric-upload" name="music-lyric-upload" type="file"
                                                class="sr-only" @change="handleMusicLyricUpload" />
                                        </label>
                                        <p class="pl-1">或拖放文件</p>
                                    </div>
                                    <p class="text-xs text-gray-500">TXT, LRC 最大 1MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 专辑信息表单 -->
                <div v-if="uploadType === 'album'" class="space-y-6">
                    <h2 class="text-xl font-semibold text-gray-900">专辑信息</h2>
                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="album-name" class="block text-sm font-medium text-gray-700">专辑名称</label>
                            <div class="mt-1">
                                <input type="text" id="album-name" v-model="albumInfo.album_name"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="album-singer-id" class="block text-sm font-medium text-gray-700">歌手ID</label>
                            <div class="mt-1">
                                <input type="text" id="album-singer-id" v-model.number="albumInfo.singer_id"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="album-singer-name" class="block text-sm font-medium text-gray-700">歌手名称</label>
                            <div class="mt-1">
                                <input type="text" id="album-singer-name" v-model="albumInfo.singer_name"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="album-release-date" class="block text-sm font-medium text-gray-700">发行日期</label>
                            <div class="mt-1">
                                <input type="date" id="album-release-date" v-model="albumInfo.release_date"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="album-description" class="block text-sm font-medium text-gray-700">专辑简介</label>
                            <div class="mt-1">
                                <textarea id="album-description" v-model="albumInfo.description" rows="3"
                                    class="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="album-cover" class="block text-sm font-medium text-gray-700">专辑封面</label>
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="album-cover-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                            <span>上传专辑封面</span>
                                            <input id="album-cover-upload" name="album-cover-upload" type="file"
                                                class="sr-only" @change="handleAlbumCoverUpload" />
                                        </label>
                                        <p class="pl-1">或拖放文件</p>
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" @click="handleCancel"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                    取消
                </button>
                <button @click="handleSubmit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                    保存
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { uploadSingerInfo, uploadMusicInfo, uploadAlbumInfo } from '../api/httpClient';
import type { SingerInfo, MusicInfo, AlbumInfo } from '../types/global';
import { DocumentTextIcon, MusicalNoteIcon, PhotoIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const uploadType = ref('singer');
const singerInfo = ref<SingerInfo>({} as SingerInfo);
const musicInfo = ref<MusicInfo>({} as MusicInfo);
const albumInfo = ref<AlbumInfo>({} as AlbumInfo);

const singerAvatar = ref<File | null>(null);
const musicFile = ref<File | null>(null);
const musicCover = ref<File | null>(null);
const musicLyric = ref<File | null>(null);
const albumCover = ref<File | null>(null);

const handleSingerAvatarUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        singerAvatar.value = target.files[0];
    }
};

const handleMusicFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        musicFile.value = target.files[0];
    }
};

const handleMusicCoverUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        musicCover.value = target.files[0];
    }
};

const handleMusicLyricUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        musicLyric.value = target.files[0];
    }
};

const handleAlbumCoverUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        albumCover.value = target.files[0];
    }
};

const handleCancel = () => {
    // 处理取消操作,例如重置表单或返回上一页
    console.log('取消操作');
};

const handleSubmit = async () => {
    try {
        if (uploadType.value === 'singer' && singerAvatar.value) {
            await uploadSingerInfo(singerInfo.value, singerAvatar.value);
        } else if (uploadType.value === 'music' && musicFile.value && musicCover.value) {
            await uploadMusicInfo(musicInfo.value, musicFile.value, musicCover.value, musicLyric.value || undefined);
        } else if (uploadType.value === 'album' && albumCover.value) {
            await uploadAlbumInfo(albumInfo.value, albumCover.value);
        } else {
            alert('填写信息完整再上传');
        }
        console.log('上传成功');
        // 可以在这里添加成功提示或重定向逻辑
    } catch (error) {
        console.error('上传失败', error);
        // 在这里添加错误提示逻辑
    }
};
</script>
