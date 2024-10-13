<template>
    <div class="bg-white py-12 sm:py-8">
        <div class="mx-auto px-6 lg:px-8">
            <!-- 歌手列表 -->
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">遇见你喜欢的歌手</h2>
                <p class="mt-4 text-lg leading-8 text-gray-600">用音符编织梦想，用歌声传递情感。每位歌手都是一个独特的音乐宇宙。</p>
            </div>

            <!-- 筛选条件 -->
            <div class="my-4  mx-16">
                <div class="sm:hidden">
                    <label for="country" class="sr-only">选择国家/地区</label>
                    <select id="country" v-model="country" @change="handleCountryChange"
                        class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 mb-4">
                        <option v-for="option in countryOptions" :key="option.value" :value="option.value">{{
                            option.name }}</option>
                    </select>
                    <label for="gender" class="sr-only">选择性别</label>
                    <select id="gender" v-model="gender" @change="handleGenderChange"
                        class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <option v-for="option in genderOptions" :key="option.value" :value="option.value">{{ option.name
                            }}</option>
                    </select>
                </div>
                <div class="hidden sm:block">
                    <nav class="flex space-x-4 mb-4" aria-label="国家/地区">
                        <a v-for="option in countryOptions" :key="option.value"
                            @click.prevent="selectCountry(option.value)" href="#"
                            :class="[country === option.value ? 'bg-gray-100 text-emerald-700' : 'text-gray-600 hover:text-emerald-700', 'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200']">
                            {{ option.name }}
                        </a>
                    </nav>
                    <nav class="flex space-x-4" aria-label="性别">
                        <a v-for="option in genderOptions" :key="option.value"
                            @click.prevent="selectGender(option.value)" href="#"
                            :class="[gender === option.value ? 'bg-gray-100 text-emerald-700' : 'text-gray-600 hover:text-emerald-700', 'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200']">
                            {{ option.name }}
                        </a>
                    </nav>
                </div>
            </div>
            <template v-if="singerList.length > 0">
                <ul role="list"
                    class="mx-auto my-8 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <li v-for="singer in singerList" :key="singer.id"
                        class="group relative overflow-hidden rounded-lg bg-white shadow-sm transition duration-300 ease-in-out hover:shadow-md"
                        @click="navigateToSingerDetail(singer.id)">
                        <div class="flex items-center p-4">
                            <div class="flex-shrink-0">
                                <img class="h-16 w-16 rounded-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                                    :src="singer.avatar_url" :alt="singer.name" />
                            </div>
                            <div class="ml-4 flex-grow">
                                <h3
                                    class="text-lg font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors duration-200">
                                    {{ singer.name }}
                                </h3>
                                <p v-if="singer.stage_name" class="text-sm text-gray-500">
                                    {{ singer.stage_name }}
                                </p>
                                <div class="mt-1 flex items-center space-x-2">
                                    <span
                                        class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                                        {{ singer.main_genre }}
                                    </span>
                                    <span class="text-xs text-gray-500">{{ getCountryName(singer.origin_country)
                                        }}</span>
                                </div>
                            </div>
                            <div class="ml-4 text-right">
                                <p class="text-sm text-gray-600">
                                    出道: {{ singer.debut_year }}
                                </p>
                                <p class="mt-1 text-sm font-medium text-gray-700">
                                    粉丝: {{ formatFollowersCount(singer.followers_count) }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-200 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100">
                        </div>
                    </li>
                </ul>

                <!-- 加载更多按钮 -->
                <div v-if="hasMore" class="flex justify-center mt-8">
                    <button @click="loadMore"
                        class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200">
                        加载更多
                    </button>
                </div>
            </template>
            <template v-else>
                <div class="flex flex-col items-center justify-center h-64 bg-white rounded-lg my-8">
                    <UserGroupIcon class="w-16 h-16 text-emerald-400 mb-4" />
                    <p class="text-xl font-semibold text-gray-800">暂无符合条件的歌手</p>
                    <p class="text-sm text-gray-500 mt-2">换个条件试试吧</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSingerInfoListByCountryAndGender } from '../api/httpClient';
import { SingerInfo } from '../types/global';
import { useRouter } from 'vue-router';
import { UserGroupIcon } from '@heroicons/vue/24/outline'

const router = useRouter();

const singerList = ref<SingerInfo[]>([]);
const offset = ref(0);
const limit = ref(12);
const country = ref('');
const gender = ref('');
const hasMore = ref(false);

const countryOptions = [
    { name: '全部', value: '' },
    { name: '内地', value: 'china' },
    { name: '港台', value: 'hkt' },
    { name: '欧美', value: 'western' },
    { name: '日本', value: 'japan' },
    { name: '韩国', value: 'korea' },
];


const genderOptions = [
    { name: '全部', value: '' },
    { name: '男', value: 'male' },
    { name: '女', value: 'female' },
];


const navigateToSingerDetail = (singerId: number) => {
    router.push(`/singer-detail/${singerId}`);
};

const fetchSingers = async (isLoadMore = false) => {
    try {
        const response = await getSingerInfoListByCountryAndGender(
            country.value,
            gender.value,
            offset.value,
            limit.value
        );
        if (response.code === 0) {
            if (isLoadMore) {
                singerList.value = [...singerList.value, ...response.data.singer_info_list];
            } else {
                singerList.value = response.data.singer_info_list;
            }
            hasMore.value = response.data.has_more;
        } else {
            console.error('获取歌手列表失败:', response.msg);
        }
    } catch (error) {
        console.error('获取歌手列表出错:', error);
    }
};

const handleCountryChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    selectCountry(target.value);
};

const handleGenderChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    selectGender(target.value);
};

const selectCountry = (value: string) => {
    country.value = value;
    resetAndFetch();
};

const selectGender = (value: string) => {
    gender.value = value;
    resetAndFetch();
};

const resetAndFetch = () => {
    offset.value = 0;
    singerList.value = [];
    fetchSingers();
};

const loadMore = () => {
    if (hasMore.value) {
        offset.value += limit.value;
        fetchSingers(true);
    }
};

const formatFollowersCount = (count: number): string => {
    if (count >= 10000) {
        return (count / 10000).toFixed(1) + '万';
    }
    return count.toString();
};

const getCountryName = (countryCode: string): string => {
    const country = countryOptions.find(option => option.value === countryCode);
    return country ? country.name : countryCode;
};

onMounted(() => {
    fetchSingers();
});
</script>

<style scoped></style>