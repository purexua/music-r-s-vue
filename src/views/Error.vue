<template>
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
            <p class="text-base font-semibold text-indigo-600">{{ errorCode }}</p>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{{ errorMessage }}</h1>
            <p class="mt-6 text-base leading-7 text-gray-600">{{ errorDescription }}</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <router-link to="/"
                    class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Go back home
                </router-link>
                <router-link to="/contact" class="text-sm font-semibold text-gray-900">
                    Contact support <span aria-hidden="true">&rarr;</span>
                </router-link>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const errorCode = ref('404');
const errorMessage = ref('页面未找到');
const errorDescription = ref('Sorry, we couldn\'t find the page you\'re looking for.');

onMounted(() => {
    // 根据路由参数设置错误信息
    if (route.params.errorCode) {
        errorCode.value = route.params.errorCode;
        switch (errorCode.value) {
            case '403':
                errorMessage.value = 'Access Denied';
                errorDescription.value = 'You do not have permission to access this page.';
                break;
            case '500':
                errorMessage.value = 'Server Error';
                errorDescription.value = 'Sorry, there was a problem with the server. Please try again later.';
                break;
            case '404':
                errorMessage.value = 'Page Not Found';
                errorDescription.value = 'Sorry, we couldn\'t find the page you\'re looking for.';
                break;
        }
    }
});
</script>