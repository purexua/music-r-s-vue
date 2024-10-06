<template>
    <div class="bg-white py-12 sm:py-8">
        <div class="mx-auto  px-6 lg:px-8">
            <!-- 歌手列表 -->
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">遇见你喜欢的歌手</h2>
                <p class="mt-4 text-lg leading-8 text-gray-600">用音符编织梦想，用歌声传递情感。每位歌手都是一个独特的音乐宇宙。</p>
            </div>

            <!-- 筛选条件 -->
            <div class="my-4  mx-16">
                <div class="sm:hidden">
                    <label for="country" class="sr-only">选择国家/地区</label>
                    <select id="country" v-model="country" @change="fetchSingers"
                        class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mb-4">
                        <option v-for="option in countryOptions" :key="option.value" :value="option.value">{{
                            option.name }}</option>
                    </select>
                    <label for="gender" class="sr-only">选择性别</label>
                    <select id="gender" v-model="gender" @change="fetchSingers"
                        class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                        <option v-for="option in genderOptions" :key="option.value" :value="option.value">{{ option.name
                            }}</option>
                    </select>
                </div>
                <div class="hidden sm:block">
                    <nav class="flex space-x-4 mb-4" aria-label="国家/地区">
                        <a v-for="option in countryOptions" :key="option.value"
                            @click.prevent="selectCountry(option.value)" href="#"
                            :class="[country === option.value ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']">
                            {{ option.name }}
                        </a>
                    </nav>
                    <nav class="flex space-x-4" aria-label="性别">
                        <a v-for="option in genderOptions" :key="option.value"
                            @click.prevent="selectGender(option.value)" href="#"
                            :class="[gender === option.value ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']">
                            {{ option.name }}
                        </a>
                    </nav>
                </div>
            </div>
            <template v-if="totalCount > 0">
                <ul role="list"
                    class="mx-auto my-8 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
                    <li v-for="singer in singerList" :key="singer.id"
                        class="rounded-2xl bg-gray-100 px-6 py-8 cursor-pointer"
                        @click="navigateToSingerDetail(singer.id)">
                        <img class="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" :src="singer.avatar_url"
                            :alt="singer.name" />
                        <h3 class="mt-6 text-xl font-bold leading-tight tracking-tight text-gray-900 text-center">
                            {{ singer.name }}
                        </h3>
                        <p class="mt-2 text-base leading-relaxed text-gray-600 text-center">
                            {{ singer.main_genre }}
                        </p>
                    </li>
                </ul>

                <!-- 修改分页控件 -->
                <div class="mt-12 mx-12">
                    <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                        <div class="-mt-px flex w-0 flex-1">
                            <a href="#" @click.prevent="prevPage" :class="{'pointer-events-none opacity-50': currentPage === 1}"
                                class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                                <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                上一页
                            </a>
                        </div>
                        <div class="hidden md:-mt-px md:flex">
                            <span
                                class="inline-flex items-center border-t-2 border-gray-500 px-4 pt-4 text-sm font-medium text-gray-500">
                                {{ currentPage }}
                            </span>
                        </div>
                        <div class="-mt-px flex w-0 flex-1 justify-end">
                            <a href="#" @click.prevent="nextPage" :class="{'pointer-events-none opacity-50': !hasNextPage}"
                                class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                                下一页
                                <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </a>
                        </div>
                    </nav>
                </div>
            </template>
            <template v-else>
                <div class="flex flex-col items-center justify-center h-64 bg-white rounded-lg my-8">
                    <UserGroupIcon class="w-16 h-16 text-gray-400 mb-4" />
                    <p class="text-xl font-semibold text-gray-700">暂无符合条件的歌手</p>
                    <p class="text-sm text-gray-500 mt-2">换个条件试试吧</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';
import { getSingerSimpleInfoListByCountryAndGender } from '../api/httpClient';
import { SingerSimpleInfo } from '../types/global';
import { useRouter } from 'vue-router';
import { UserGroupIcon } from '@heroicons/vue/24/outline'

const router = useRouter();

const singerList = ref<SingerSimpleInfo[]>([]);
const currentPage = ref(1);
const pageSize = ref(8);
const country = ref('');
const gender = ref('');
const totalCount = ref(0);
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

// 添加计算属性
const hasNextPage = computed(() => {
    return totalCount.value > currentPage.value * pageSize.value;
});

const navigateToSingerDetail = (singerId: number) => {
    router.push(`/singer-detail/${singerId}`);
};

const fetchSingers = async () => {
    try {
        const response = await getSingerSimpleInfoListByCountryAndGender(
            country.value,
            gender.value,
            currentPage.value,
            pageSize.value
        );
        if (response.code === 0) {
            if (response.data.count > 0) {
                singerList.value = response.data.singer_simple_info_list;
            }
            totalCount.value = response.data.count;
        } else {
            console.error('获取歌手列表失败:', response.msg);
        }
    } catch (error) {
        console.error('获取歌手列表出错:', error);
    }
};

const selectCountry = (value: string) => {
    country.value = value;
    currentPage.value = 1;
    fetchSingers();
};

const selectGender = (value: string) => {
    gender.value = value;
    currentPage.value = 1;
    fetchSingers();
};

// 修改 prevPage 和 nextPage 函数
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchSingers();
    }
};

const nextPage = () => {
    if (hasNextPage.value) {
        currentPage.value++;
        fetchSingers();
    }
};

onMounted(() => {
    fetchSingers();
});
</script>

<style scoped></style>