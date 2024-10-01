<template>
    <form>
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">设置</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">这些设置将影响您的使用体验或涉及敏感操作，请谨慎修改。</p>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="username" class="block text-sm font-semibold leading-6 text-gray-900">用户名</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input type="text" name="username" id="username" autocomplete="username"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="请输入用户名" />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-semibold leading-6 text-gray-900">描述</label>
                        <div class="mt-2">
                            <textarea id="about" name="about" rows="3"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                    </div>

                    <div class="col-span-full">
                        <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                        <div class="mt-2 flex items-center gap-x-3">
                            <UserCircleIcon class="h-12 w-12 text-gray-300" aria-hidden="true" />
                            <button type="button"
                                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">更改</button>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover
                            photo</label>
                        <div
                            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div class="text-center">
                                <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div class="mt-4 flex flex-col items-center">
                                    <label for="file-upload"
                                        class="mb-2 cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
                                        <span>点击上传文件</span>
                                        <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                    </label>
                                    <p class="text-xs leading-5 text-gray-600">支持 PNG、JPG、GIF 格式，最大 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end  gap-x-6">
                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">取消</button>
                    <button type="submit"
                        class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                        保存
                    </button>
                </div>
            </div>

            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">个人信息</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">请填写您的基本信息，以便我们更好地为您服务。</p>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div class="sm:col-span-3">
                        <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">性别</label>
                        <div class="mt-2">
                            <select id="gender" name="gender" autocomplete="sex"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>男</option>
                                <option>女</option>
                                <option>其他</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="birthday" class="block text-sm font-medium leading-6 text-gray-900">生日</label>
                        <div class="mt-2">
                            <input type="date" name="birthday" id="birthday"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">邮箱</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                </div>

                <div class="mt-6 flex items-center justify-end  gap-x-6">
                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">取消</button>
                    <button type="submit"
                        class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                        保存
                    </button>
                </div>


            </div>

            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">修改密码</h2>
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="old-password" class="sr-only">旧密码</label>
                        <input v-model="oldPassword" type="password" name="old-password" id="old-password"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="请输入旧密码" />
                    </div>
                    <div class="sm:col-span-3">
                        <label for="new-password" class="sr-only">新密码</label>
                        <input v-model="newPassword" type="password" name="new-password" id="new-password"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="请输入新密码" />
                    </div>
                    <div class="sm:col-span-3">
                        <label for="confirm-password" class="sr-only">确认密码</label>
                        <input v-model="confirmPassword" type="password" name="confirm-password" id="confirm-password"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="请再次输入新密码" />
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" @click="resetPasswordForm"
                        class="text-sm font-semibold leading-6 text-gray-900">取消</button>
                    <button type="button" @click="handleChangePassword"
                        class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                        保存
                    </button>
                </div>
            </div>
        </div>

    </form>
</template>

<script setup lang="ts" name="Settings">
import { ref } from 'vue'
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { changePassword } from '@/api/httpClient'

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const resetPasswordForm = () => {
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
}

const handleChangePassword = async () => {
    if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
        alert('请填写所有密码字段')
        return
    }

    if (newPassword.value !== confirmPassword.value) {
        alert('新密码和确认密码不匹配')
        return
    }

    try {
        const userId = Number(localStorage.getItem('user_id'))
        const response = await changePassword(userId, oldPassword.value, newPassword.value)
        if (response.code === 0) {
            alert('密码修改成功')
            resetPasswordForm()
        } else {
            alert(response.message || '密码修改失败')
        }
    } catch (error) {
        console.error('修改密码时发生错误', error)
        alert('修改密码失败，请稍后重试')
    }
}
</script>


<style scoped></style>