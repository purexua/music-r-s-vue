<template>
    <div>
        <form>
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">设置</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">这些设置将影响您的使用体验或涉及敏感操作，请谨慎修改。</p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="username"
                                class="block text-sm font-semibold leading-6 text-gray-900">用户名</label>
                            <div class="mt-2">
                                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                    <input :value="`${username} #${id}`" type="text" name="username" id="username"
                                        disabled
                                        class="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" />
                                </div>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="description"
                                class="block text-sm font-semibold leading-6 text-gray-900">描述</label>
                            <div class="mt-2">
                                <textarea v-model="description" id="description" name="description" rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    :placeholder="description || ''" />
                            </div>
                            <p class="mt-3 text-sm leading-6 text-gray-600">通过描述，让其他用户更好地了解你。</p>
                        </div>
                        
                        <div class="col-span-full">
                            <label for="avatar" class="block text-sm font-medium leading-6 text-gray-900">头像</label>
                            <div class="mt-2 flex items-center gap-x-3">
                                <img v-if="userStore.userInfo.avatar_url !== '' && userStore.userInfo.avatar_url !== null && userStore.userInfo.avatar_url !== undefined" :src="userStore.userInfo.avatar_url" alt="用户头像"
                                    class="h-12 w-12 rounded-full object-cover" />
                                <UserCircleIcon v-else class="h-12 w-12 text-gray-300" aria-hidden="true" />
                                <label for="avatar-upload"
                                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">
                                    更改
                                    <input id="avatar-upload" type="file" class="sr-only" @change="handleAvatarChange"
                                        accept="image/*" />
                                </label>
                            </div>
                            <p class="mt-3 text-sm leading-6 text-gray-600 flex items-center">
                                <ExclamationTriangleIcon class="w-5 h-5 mr-1 text-yellow-500" aria-hidden="true" />
                                <span>注意：仅支持 PNG 格式</span>
                            </p>
                        </div>

                        <div class="col-span-full">
                            <label for="cover-photo"
                                class="block text-sm font-medium leading-6 text-gray-900">封面照片</label>
                            <div
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div class="text-center">
                                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div class="mt-4 flex flex-col items-center">
                                        <label for="file-upload"
                                            class="mb-2 cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
                                            <span>点击上传文件</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                                @change="handleCoverPhotoUpload" accept="image/*" />
                                        </label>
                                        <p class="text-xs leading-5 text-gray-600">支持 PNG、JPG、GIF 格式，最大 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">个人信息</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">请填写您的基本信息，以便我们更好地为您服务。</p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div class="sm:col-span-2">
                            <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">性别</label>
                            <div class="mt-2">
                                <select v-model="gender" id="gender" name="gender" autocomplete="sex"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="">请选择</option>
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                </select>
                            </div>
                        </div>

                        <div class="sm:col-span-1"></div>

                        <div class="sm:col-span-2">
                            <label for="birthday" class="block text-sm font-medium leading-6 text-gray-900">生日</label>
                            <div class="mt-2">
                                <input v-model="birthday" type="date" name="birthday" id="birthday"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="age" class="block text-sm font-medium leading-6 text-gray-900">年龄</label>
                            <div class="mt-2">
                                <input v-model.number="age" id="age" name="age" type="number" autocomplete="age"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    :placeholder="age > 0 ? age.toString() : '请输入年龄'" />
                            </div>
                        </div>

                        <div class="sm:col-span-1"></div>

                        <div class="sm:col-span-3">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">邮箱</label>
                            <div class="mt-2">
                                <input v-model="email" id="email" name="email" type="email" autocomplete="email"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    :placeholder="email || '请输入邮箱地址'" />
                            </div>
                        </div>



                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" @click="handleCancelUserInfo"
                            class="text-sm font-semibold leading-6 text-gray-900">取消</button>
                        <button type="button" @click="handleSaveUserInfo"
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
                            <input v-model="confirmPassword" type="password" name="confirm-password"
                                id="confirm-password"
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
    </div>
</template>

<script setup lang="ts" name="Settings">
import { ref, onMounted } from 'vue'
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { changePassword, updateUserInfo, uploadAvatar, uploadCover } from '../api/httpClient'
import { useUserStore } from '../store/user'
import { UserInfo } from '../types/global'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const userStore = useUserStore()

// 按 UserInfo 字段顺序重新排序
const id = ref(0)
const avatarPhotoUrl = ref('')
const coverPhotoUrl = ref('')
const age = ref(0)
const gender = ref('')
const birthday = ref('')
const email = ref('')
const description = ref('')

// 其他非 UserInfo 字段
const username = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

onMounted(() => {
    // 从 localStorage 获取用户信息并设置默认值
    const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}')
    id.value = userInfo.id || -1
    avatarPhotoUrl.value = userInfo.avatar_url || ''
    coverPhotoUrl.value = userInfo.cover_url || ''
    age.value = userInfo.age || 0
    gender.value = userInfo.gender || ''
    birthday.value = userInfo.birthday || ''
    email.value = userInfo.email || ''
    description.value = userInfo.description || ''

    // 非 UserInfo 字段
    username.value = userStore.username || ''

    console.log(avatarPhotoUrl.value)
})

const handleAvatarChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];

        // 头像不能超过 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert('头像大小不能超过 5MB');
            return;
        }

        try {
            const uploadAvatarResult = await uploadAvatar(userStore.userId!, file);
            if (uploadAvatarResult.code === 0) {
                // 后端请求更新用户信息
                const updatedUserInfo: UserInfo = {
                    id: userStore.userId,
                    avatar_url: uploadAvatarResult.data,
                    cover_url: userStore.userInfo.cover_url,
                    age:    userStore.userInfo.age,
                    gender: userStore.userInfo.gender,
                    birthday: userStore.userInfo.birthday,
                    email: userStore.userInfo.email,
                    description: userStore.userInfo.description
                }
 
                const updateUserInfoResult = await updateUserInfo(userStore.userId!, updatedUserInfo)
                if (updateUserInfoResult.code === 0) {
                    userStore.setUserInfo(updatedUserInfo)
                    alert('头像上传成功');
                } else {
                    alert(updateUserInfoResult.message || '更新失败，请稍后重试')     
                }
            } else {
                alert(uploadAvatarResult.message || '头像上传失败');
            }
        } catch (error) {
            console.error('上传头像时发生错误', error);
            alert('头像上传失败，请稍后重试');
        }
    }
}

const handleCoverPhotoUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];

        // 封面不能超过 10MB
        if (file.size > 10 * 1024 * 1024) {
            alert('封面大小不能超过 10MB');
            return;
        }

        try {
            const uploadCoverResult = await uploadCover(userStore.userId!, file);
            if (uploadCoverResult.code === 0) {
                // 更新用户信息
                const updatedUserInfo: UserInfo = {
                    id: userStore.userId,
                    avatar_url: userStore.userInfo.avatar_url,
                    cover_url: uploadCoverResult.data,
                    age: userStore.userInfo.age,
                    gender: userStore.userInfo.gender,
                    birthday: userStore.userInfo.birthday,
                    email: userStore.userInfo.email,
                    description: userStore.userInfo.description
                }
                const updateUserInfoResult = await updateUserInfo(userStore.userId!, updatedUserInfo)
                if (updateUserInfoResult.code === 0) {
                    userStore.setUserInfo(updatedUserInfo)
                    alert('封面上传成功');
                } else {
                    alert(updateUserInfoResult.message || '更新失败，请稍后重试')   
                }
            } else {
                alert(uploadCoverResult.message || '封面上传失败');
            }
        } catch (error) {
            console.error('上传封面时发生错误', error);
            alert('封面上传失败，请稍后重试');
        }
    }
}

const handleSaveUserInfo = async () => {
    const updatedUserInfo: UserInfo = {
        id: userStore.userId || -1,
        avatar_url: avatarPhotoUrl.value,
        cover_url: coverPhotoUrl.value,
        age: Number(age.value) || 0,
        gender: gender.value,
        birthday: birthday.value,
        email: email.value,
        description: description.value
    }

    try {
        if (userStore.userId === null) {
            throw new Error('用户ID不能为空');
        }
        const response = await updateUserInfo(userStore.userId, updatedUserInfo)
        if (response.code === 0) {
            userStore.setUserInfo(updatedUserInfo)
            alert('用户信息更新成功')
        } else {
            alert(response.message || '更新失败，请稍后重试')
        }
    } catch (error) {
        console.error('更新用户信息时发生错误', error)
        alert('更新失败，请稍后重试')
    }
}

const handleCancelUserInfo = () => {
    id.value = userStore.userId || 0
    age.value = userStore.userInfo?.age || 0
    gender.value = userStore.userInfo?.gender || ''
    birthday.value = userStore.userInfo?.birthday || ''
    email.value = userStore.userInfo?.email || ''
    description.value = userStore.userInfo?.description || ''
    username.value = userStore.username || ''
    alert('已取消用户信息的修改')
}

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