<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">创建新账户</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="handleSubmit">
                <div>
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div class="mt-2">
                        <input id="username" v-model="username" name="username" type="text" autocomplete="username"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input id="password" v-model="password" name="password" type="password"
                            autocomplete="new-password" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <label for="confirm-password" class="block text-sm font-medium leading-6 text-gray-900">Confirm
                        Password</label>
                    <div class="mt-2">
                        <input id="confirm-password" v-model="confirmPassword" name="confirm-password" type="password"
                            autocomplete="new-password" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">注册</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                已经有账户？
                {{ ' ' }}
                <router-link to="/login"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">登录</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAlert } from '../utils/alert'
import { useRouter } from 'vue-router'
import { register } from '../api/httpClient'
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const { showAlert } = useAlert()
const router = useRouter()

const handleSubmit = async () => {
    if (password.value !== confirmPassword.value) {
        showAlert({
            title: '密码不匹配',
            type: 'error',
            closable: true,
            closeText: '关闭',
            duration: 3000
        })
        return
    }

    try {
        const response = await register(username.value, password.value)

        if (response.data.code === 0) {
            showAlert({
                title: '注册成功',
                type: 'success',
                closable: true,
                closeText: '关闭',
                duration: 3000
            })
            router.push('/')
        } else {
            throw new Error(response.data.data.msg)
        }
    } catch (error) {
        showAlert({
            title: '注册失败：' + (error instanceof Error ? error.message : '未知错误'),
            type: 'error',
            closable: true,
            closeText: '关闭',
            duration: 3000
        })
    }
}
</script>

<style scoped></style>