<template>
  <section class="isolate overflow-hidden bg-white px-6 lg:px-8" v-if="singerInfo">
    <div class="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
      <div
        class="absolute left-1/2 top-0 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,theme(colors.emerald.100),white)] opacity-20 lg:left-36" />
      <div
        class="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-emerald-600/10 ring-1 ring-emerald-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />
      <figure class="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
        <div class="col-end-1 w-16 lg:row-span-4 lg:w-72">
          <img class="rounded-xl bg-emerald-50 lg:rounded-3xl" :src="singerInfo.avatar_url" :alt="singerInfo.name" />
        </div>
        <figcaption class="text-base lg:col-start-1 lg:row-start-3">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-800 text-3xl">{{ singerInfo.name }}</h2>
            <div class="flex items-center">
              <span class="mr-2 text-sm text-gray-600">{{ isFollowing ? '已关注' : '关注' }}</span>
              <Switch v-model="isFollowing" :class="[
                isFollowing ? 'bg-emerald-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                'hover:ring-2 hover:ring-emerald-600 hover:ring-offset-2 hover:shadow-md hover:scale-105 transform transition-all'
              ]" @update:modelValue="toggleFollow">
                <span class="sr-only">关注歌手</span>
                <span :class="[
                  isFollowing ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                ]">
                  <span :class="[
                    isFollowing ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                    'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                  ]" aria-hidden="true">
                    <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                      <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  <span :class="[
                    isFollowing ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                    'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                  ]" aria-hidden="true">
                    <svg class="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 12 12">
                      <path
                        d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                  </span>
                </span>
              </Switch>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div v-if="singerInfo.stage_name" class="text-gray-600">
              <span class="font-medium">艺名：</span>{{ singerInfo.stage_name }}
            </div>
            <div class="text-gray-600">
              <span class="font-medium">主要流派：</span>{{ singerInfo.main_genre }}
            </div>
            <div class="text-gray-600">
              <span class="font-medium">性别：</span>{{ singerInfo.gender === 'male' ? '男' : '女' }}
            </div>
            <div class="text-gray-600">
              <span class="font-medium">国籍：</span>{{ singerInfo.origin_country }}
            </div>
            <div class="text-gray-600">
              <span class="font-medium">出道年份：</span>{{ singerInfo.debut_year }}
            </div>
            <div class="text-gray-600">
              <span class="font-medium">生日：</span>{{ formatDate(singerInfo.birthday) }}
            </div>
          </div>

          <div class="mt-4 p-3 bg-gray-100 rounded-lg">
            <div class="text-gray-700 font-medium">粉丝数</div>
            <div class="text-2xl font-bold text-gray-800">{{ formatNumber(singerInfo.followers_count) }}</div>
          </div>
        </figcaption>
        <div class="relative col-span-2 lg:col-start-1 lg:row-start-2">
          <blockquote class="text-xl font-semibold leading-8 text-gray-800 sm:text-2xl sm:leading-9">
            <p>{{ singerInfo.description }}</p>
          </blockquote>
        </div>
      </figure>
    </div>
  </section>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">选择标签</label>
      <select id="tabs" name="tabs" v-model="currentTab"
        class="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
        @change="(event) => changeTab(Number((event.target as HTMLSelectElement).value))">
        <option v-for="tab in tabs" :key="tab.name" :value="tab.index">{{ tab.name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" :href="tab.href"
            :class="[currentTab === tab.index ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-emerald-700', 'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium transition-colors duration-200']"
            :aria-current="currentTab === tab.index ? 'page' : undefined" @click.prevent="changeTab(tab.index)">
            <component :is="tab.icon"
              :class="[currentTab === tab.index ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500', '-ml-0.5 mr-2 h-5 w-5']"
              aria-hidden="true" />
            <span>{{ tab.name }}</span>
          </a>
        </nav>
      </div>
    </div>
  </div>

  <div class="sm:mx-auto min-[1024px]:mx-32">
    <RouterView />
  </div>
</template>

<script setup lang="ts" name="SingerDetail">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HeartIcon, MusicalNoteIcon, RectangleStackIcon, VideoCameraIcon } from '@heroicons/vue/20/solid';
import { Switch } from '@headlessui/vue';
import { NavigationItem, SingerInfo, DefaultSingerInfo } from '../types/global';
import { getSingerInfo, checkUserFollowingSinger, followSinger, unfollowSinger } from '../api/httpClient';
import { useUserStore } from '../store/user';

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();
const singerInfo = ref<SingerInfo>(DefaultSingerInfo);
const isFollowing = ref(false);
const currentTab = ref(0);

const tabs: NavigationItem[] = [
  { index: 0, name: '精选', href: 'for-you', icon: HeartIcon, title: 'For You' },
  { index: 1, name: '歌曲', href: 'music', icon: MusicalNoteIcon, title: 'Songs' },
  { index: 2, name: '专辑', href: 'albums', icon: RectangleStackIcon, title: 'Albums' },
  { index: 3, name: 'MV', href: 'mv', icon: VideoCameraIcon, title: 'MV' },
];

const fetchData = async (id: number) => {
  await fetchSingerInfo(id);
  await checkFollowStatus(id);
};

const updateCurrentTab = () => {
  const path = route.path;
  const tab = tabs.find(t => path.includes(t.href));
  currentTab.value = tab ? tab.index : 0;
};

onMounted(() => {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    fetchData(id);
    updateCurrentTab();
  } else {
    router.push({ path: '/error/404' });
  }
});

watch(() => route.fullPath, () => {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    fetchData(id);
    updateCurrentTab();
  }
});

const changeTab = (index: number) => {
  currentTab.value = index;
  const singerId = route.params.id;
  router.push(`/singer-detail/${singerId}/${tabs[index].href}`);
};

const toggleFollow = async (newValue: boolean) => {
  const userId = userStore.userId;
  const singerId = Number(route.params.id);

  try {
    if (newValue) {
      await followSinger(userId, singerId);
      singerInfo.value.followers_count++;
      console.log('关注歌手成功');
    } else {
      await unfollowSinger(userId, singerId);
      singerInfo.value.followers_count--;
      console.log('取消关注歌手成功');
    }
    isFollowing.value = newValue;
  } catch (error) {
    console.error(`${newValue ? '关注' : '取消关注'}歌手失败:`, error);
    isFollowing.value = !newValue;
  }
};

const fetchSingerInfo = async (id: number) => {
  try {
    const getSingerInfoResult = await getSingerInfo(id);
    if (getSingerInfoResult.code === 0) {
      singerInfo.value = getSingerInfoResult.data.singer_info;
    } else {
      console.error('获取歌手信息失败:', getSingerInfoResult.msg);
    }
  } catch (error) {
    console.error('获取歌手信息出错:', error);
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN');
};

const formatNumber = (num: number | undefined) => {
  if (num === undefined) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const checkFollowStatus = async (id: number) => {
  const userId = userStore.userId;
  try {
    const response = await checkUserFollowingSinger(userId, id);
    if (response.code === 0) {
      isFollowing.value = response.data;
    } else {
      console.error('检查关注状态失败:', response.msg);
    }
  } catch (error) {
    console.error('检查关注状态出错:', error);
  }
};
</script>