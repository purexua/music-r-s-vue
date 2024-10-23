<template>
    <div class="bg-white mx-10 my-10">
        <!-- 上传类型选择 -->
        <div class="border-b border-gray-200 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-800">上传类型</h2>
            <div class="mt-4 space-y-4">
                <div class="flex items-center">
                    <input id="singer" v-model="uploadType" value="singer" type="radio"
                        class="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-600" />
                    <label for="singer" class="ml-3 block text-sm font-medium leading-6 text-gray-600">歌手信息</label>
                </div>
                <div class="flex items-center">
                    <input id="music" v-model="uploadType" value="music" type="radio"
                        class="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-600" />
                    <label for="music" class="ml-3 block text-sm font-medium leading-6 text-gray-600">音乐信息</label>
                </div>
                <div class="flex items-center">
                    <input id="album" v-model="uploadType" value="album" type="radio"
                        class="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-600" />
                    <label for="album" class="ml-3 block text-sm font-medium leading-6 text-gray-600">专辑信息</label>
                </div>
            </div>
        </div>

        <!-- 歌手信息表单 -->
        <div v-if="uploadType === 'singer'" class="border-b border-gray-200 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-800">歌手信息</h2>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <label for="singer-name" class="block text-sm font-medium leading-6 text-gray-600">姓名</label>
                    <div class="mt-2">
                        <input type="text" id="singer-name" v-model="singerInfo.name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="singer-stage-name"
                        class="block text-sm font-medium leading-6 text-gray-600">艺名</label>
                    <div class="mt-2">
                        <input type="text" id="singer-stage-name" v-model="singerInfo.stage_name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="singer-gender" class="block text-sm font-medium leading-6 text-gray-600">性别</label>
                    <div class="mt-2">
                        <select id="singer-gender" v-model="singerInfo.gender"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="男">男</option>
                            <option value="女">女</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="singer-birthday"
                        class="block text-sm font-medium leading-6 text-gray-600">生日</label>
                    <div class="mt-2">
                        <input type="date" id="singer-birthday" v-model="singerInfo.birthday"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="singer-origin-country"
                        class="block text-sm font-medium leading-6 text-gray-600">国籍</label>
                    <div class="mt-2">
                        <input type="text" id="singer-origin-country" v-model="singerInfo.origin_country"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="singer-main-genre"
                        class="block text-sm font-medium leading-6 text-gray-600">主要音乐风格</label>
                    <div class="mt-2">
                        <input type="text" id="singer-main-genre" v-model="singerInfo.main_genre"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="singer-debut-year"
                        class="block text-sm font-medium leading-6 text-gray-600">出道年份</label>
                    <div class="mt-2">
                        <input type="text" id="singer-debut-year" v-model="singerInfo.debut_year"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="singer-description"
                        class="block text-sm font-medium leading-6 text-gray-600">简介</label>
                    <div class="mt-2">
                        <textarea id="singer-description" v-model="singerInfo.description" rows="3"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="singer-avatar" class="block text-sm font-medium leading-6 text-gray-600">头像</label>
                    <div
                        class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                        <div class="text-center">
                            <PhotoIcon class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                <label for="singer-avatar-upload"
                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-700">
                                    <span>上传头像</span>
                                    <input id="singer-avatar-upload" name="singer-avatar-upload" type="file"
                                        class="sr-only" @change="handleSingerAvatarUpload" />
                                </label>
                                <p class="pl-1">或拖放文件</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-500">PNG, JPG, GIF 最大 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 音乐信息表单 -->
        <div v-if="uploadType === 'music'" class="border-b border-gray-200 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-800">音乐信息</h2>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-4">
                    <label for="music-title" class="block text-sm font-medium leading-6 text-gray-600">标题</label>
                    <div class="mt-2">
                        <input type="text" id="music-title" v-model="musicInfo.title"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="music-singer-name"
                        class="block text-sm font-medium leading-6 text-gray-600">歌手名称</label>
                    <div class="mt-2">
                        <input type="text" id="music-singer-name" v-model="musicInfo.singer_name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="music-album-name"
                        class="block text-sm font-medium leading-6 text-gray-600">专辑名称</label>
                    <div class="mt-2">
                        <input type="text" id="music-album-name" v-model="musicInfo.album_name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="music-release-date"
                        class="block text-sm font-medium leading-6 text-gray-600">发行日期</label>
                    <div class="mt-2">
                        <input type="date" id="music-release-date" v-model="musicInfo.release_date"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="music-emotions"
                        class="block text-sm font-medium leading-6 text-gray-600">情感标签</label>
                    <div class="mt-2">
                        <input type="text" id="music-emotions" v-model="musicInfo.emotions"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="music-genres" class="block text-sm font-medium leading-6 text-gray-600">音乐风格</label>
                    <div class="mt-2">
                        <input type="text" id="music-genres" v-model="musicInfo.genres"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="music-instruments"
                        class="block text-sm font-medium leading-6 text-gray-600">乐器</label>
                    <div class="mt-2">
                        <input type="text" id="music-instruments" v-model="musicInfo.instruments"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="music-file" class="block text-sm font-medium leading-6 text-gray-600">音乐文件</label>
                    <div class="mt-2">
                        <input type="file" id="music-file" @change="handleMusicFileUpload"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="music-cover" class="block text-sm font-medium leading-6 text-gray-600">封面图片</label>
                    <div class="mt-2">
                        <input type="file" id="music-cover" @change="handleMusicCoverUpload"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="music-lyric"
                        class="block text-sm font-medium leading-6 text-gray-600">歌词文件（可选）</label>
                    <div class="mt-2">
                        <input type="file" id="music-lyric" @change="handleMusicLyricUpload"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 专辑信息表单 -->
        <div v-if="uploadType === 'album'" class="border-b border-gray-200 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-800">专辑信息</h2>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-4">
                    <label for="album-name" class="block text-sm font-medium leading-6 text-gray-600">专辑名称</label>
                    <div class="mt-2">
                        <input type="text" id="album-name" v-model="albumInfo.album_name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="album-singer-name"
                        class="block text-sm font-medium leading-6 text-gray-600">歌手名称</label>
                    <div class="mt-2">
                        <input type="text" id="album-singer-name" v-model="albumInfo.singer_name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="album-release-date"
                        class="block text-sm font-medium leading-6 text-gray-600">发行日期</label>
                    <div class="mt-2">
                        <input type="date" id="album-release-date" v-model="albumInfo.release_date"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="album-description"
                        class="block text-sm font-medium leading-6 text-gray-600">专辑简介</label>
                    <div class="mt-2">
                        <textarea id="album-description" v-model="albumInfo.description" rows="3"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="album-cover" class="block text-sm font-medium leading-6 text-gray-600">专辑封面</label>
                    <div class="mt-2">
                        <input type="file" id="album-cover" @change="handleAlbumCoverUpload"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" @click="handleCancel"
            class="text-sm font-semibold leading-6 text-gray-600 hover:text-emerald-700">取消</button>
        <button @click="handleSubmit"
            class="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">保存</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PhotoIcon } from '@heroicons/vue/24/solid';
import { uploadSingerInfo, uploadMusicInfo, uploadAlbumInfo } from '../api/httpClient';
import type { SingerInfo, MusicInfo, AlbumInfo } from '../types/global';

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
            throw new Error('请填写所有必要信息并上传相应文件');
        }
        console.log('上传成功');
        // 可以在这里添加成功提示或重定向逻辑
    } catch (error) {
        console.error('上传失败', error);
        // 在这里添加错误提示逻辑
    }
};
</script>
