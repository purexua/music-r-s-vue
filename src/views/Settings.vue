<template>
    <div class="bg-white">
        <form>
            <div class="space-y-12">
                <div class="border-b border-gray-200 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-800">设置</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-500">这些设置将影响您的使用体验或涉及敏感操作，请谨慎修改。</p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="username"
                                class="block text-sm font-semibold leading-6 text-gray-800">用户名</label>
                            <div class="mt-2">
                                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                    <input :value="`${userInfo?.username} #${userInfo?.id}`" type="text" name="username" id="username"
                                        disabled
                                        class="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-800 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" />
                                </div>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="description"
                                class="block text-sm font-semibold leading-6 text-gray-800">描述</label>
                            <div class="mt-2">
                                <textarea v-model="newUserInfo.description" id="description" name="description" rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                    :placeholder="newUserInfo.description || ''" />
                            </div>
                            <p class="mt-3 text-sm leading-6 text-gray-500">通过描述，让其他用户更好地了解你。</p>
                        </div>
                        
                        <div class="col-span-full">
                            <label for="avatar" class="block text-sm font-medium leading-6 text-gray-800">头像</label>
                            <div class="mt-2 flex items-center gap-x-3">
                                <img v-if="userInfo?.avatar_url !== '' && userInfo?.avatar_url !== null && userInfo?.avatar_url !== undefined" :src="userInfo?.avatar_url" alt="用户头像"
                                    class="h-12 w-12 rounded-full object-cover" />
                                <UserCircleIcon v-else class="h-12 w-12 text-gray-300" aria-hidden="true" />
                                <label for="avatar-upload"
                                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-emerald-700 cursor-pointer transition-colors duration-200">
                                    更改
                                    <input id="avatar-upload" type="file" class="sr-only" @change="handleAvatarChange"
                                        accept="image/*" />
                                </label>
                            </div>
                            <p class="mt-3 text-sm leading-6 text-gray-500 flex items-center">
                                <ExclamationTriangleIcon class="w-5 h-5 mr-1 text-yellow-500" aria-hidden="true" />
                                <span>支持 PNG、JPG、GIF 格式，最大 5MB</span>
                            </p>
                        </div>

                        <div class="col-span-full">
                            <label for="cover-photo"
                                class="block text-sm font-medium leading-6 text-gray-800">封面照片</label>
                            <div
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                                <div class="text-center">
                                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div class="mt-4 flex flex-col items-center">
                                        <label for="file-upload"
                                            class="mb-2 cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 hover:text-emerald-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 transition-colors duration-200">
                                            <span>点击上传文件</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                                @change="handleCoverPhotoUpload" accept="image/*" />
                                        </label>
                                        <p class="text-xs leading-5 text-gray-500">支持 PNG、JPG、GIF 格式，最大 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-200 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-800">个人信息</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-500">请填写您的基本信息，以便我们更好地为您服务。</p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div class="sm:col-span-2">
                            <label for="gender" class="block text-sm font-medium leading-6 text-gray-800">性别</label>
                            <div class="mt-2">
                                <select v-model="newUserInfo.gender" id="gender" name="gender" autocomplete="sex"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="">请选择</option>
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                </select>
                            </div>
                        </div>

                        <div class="sm:col-span-1"></div>

                        <div class="sm:col-span-2">
                            <label for="birthday" class="block text-sm font-medium leading-6 text-gray-800">生日</label>
                            <div class="mt-2">  
                                <input v-model="newUserInfo.birthday" type="date" name="birthday" id="birthday" 
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="age" class="block text-sm font-medium leading-6 text-gray-800">年龄</label>
                            <div class="mt-2">
                                <input v-model.number="newUserInfo.age" id="age" name="age" type="number" autocomplete="age"        
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                    :placeholder="newUserInfo.age ? newUserInfo.age.toString() : '请输入年龄'" />
                            </div>
                        </div>

                        <div class="sm:col-span-1"></div>

                        <div class="sm:col-span-3">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-800">邮箱</label>
                            <div class="mt-2">
                                <input v-model="newUserInfo.email" id="email" name="email" type="email" autocomplete="email"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                    :placeholder="newUserInfo.email || '请输入邮箱地址'" />
                            </div>
                        </div>

                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" @click="handleCancelUserInfo"
                            class="text-sm font-semibold leading-6 text-gray-600 hover:text-emerald-700 transition-colors duration-200">取消</button>
                        <button type="button" @click="handleSaveUserInfo"
                            class="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors duration-200">
                            保存
                        </button>
                    </div>
                </div>

                <div class="border-b border-gray-200 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-800">修改密码</h2>
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="old-password" class="sr-only">旧密码</label>
                            <input v-model="passwordForm.oldPassword" type="password" name="old-password" id="old-password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                placeholder="请输入旧密码" />
                        </div>

                        <div class="sm:col-span-1"></div>
                        
                        <div class="sm:col-span-3">
                            <label for="new-password" class="sr-only">新密码</label>
                            <input v-model="passwordForm.newPassword" type="password" name="new-password" id="new-password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                placeholder="请输入新密码" />
                        </div>
                        <div class="sm:col-span-3">
                            <label for="confirm-password" class="sr-only">确认密码</label>
                            <input v-model="passwordForm.confirmPassword" type="password" name="confirm-password"
                                id="confirm-password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                placeholder="请再次输入新密码" />
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" @click="resetPasswordForm"
                            class="text-sm font-semibold leading-6 text-gray-600 hover:text-emerald-700 transition-colors duration-200">取消</button>
                        <button type="button" @click="handleChangePassword"
                            class="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors duration-200">
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts" name="Settings">
import { ref, onMounted, computed } from 'vue'
import { PhotoIcon, UserCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid'
import { changeUserPassword, updateUserInfo, uploadUserAvatar, uploadUserCover, getUserInfo } from '../api/httpClient'
import { useUserStore } from '../store/user'
import { UserInfo } from '../types/global'

const userStore = useUserStore()
const userInfo = ref<UserInfo>({} as UserInfo)
const newUserInfo = ref<UserInfo>({} as UserInfo)
const userId = computed(() => userStore.getUserId())

// 密码相关字段
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const res = await getUserInfo(userId.value)
    if (res.code === 0) {
      userInfo.value = res.data.user_info
      newUserInfo.value = { ...res.data.user_info }
    } else {
      throw new Error(res.message || '获取用户信息失败')
    }
  } catch (error) {
    console.error('获取用户信息时发生错误', error)
    alert('获取用户信息失败，请稍后重试')
  }
}

onMounted(fetchUserInfo)

// 处理头像上传
const handleAvatarChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    alert('头像大小不能超过 5MB')
    return
  }

  try {
    const uploadResult = await uploadUserAvatar(userId.value, file)
    if (uploadResult.code === 0) {
      await updateUserInfoWithNewData({ avatar_url: uploadResult.data as string })
      alert('头像上传成功')
    } else {
      throw new Error(uploadResult.message || '头像上传失败')
    }
  } catch (error) {
    console.error('上传头像时发生错误', error)
    alert('头像上传失败，请稍后重试')
  }
}

// 处理封面上传
const handleCoverPhotoUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 10 * 1024 * 1024) {
    alert('封面大小不能超过 10MB')
    return
  }

  try {
    const uploadResult = await uploadUserCover(userId.value, file)
    if (uploadResult.code === 0) {
      await updateUserInfoWithNewData({ cover_url: uploadResult.data as string })
      alert('封面上传成功')
    } else {
      throw new Error(uploadResult.message || '封面上传失败')
    }
  } catch (error) {
    console.error('上传封面时发生错误', error)
    alert('封面上传失败，请稍后重试')
  }
}

// 更新用户信息
const updateUserInfoWithNewData = async (newData: Partial<UserInfo>) => {
  if (!userId.value) throw new Error('用户ID不能为空')
  
  const updatedUserInfo = { ...userInfo.value, ...newData }
  const response = await updateUserInfo(userId.value, updatedUserInfo)
  
  if (response.code === 0) {
    userInfo.value = updatedUserInfo as UserInfo
    newUserInfo.value = { ...updatedUserInfo } as UserInfo
  } else {
    throw new Error(response.message || '更新失败')
  }
}

// 保存用户信息
const handleSaveUserInfo = async () => {
  try {
    await updateUserInfoWithNewData(newUserInfo.value || {})
    alert('用户信息更新成功')
  } catch (error) {
    console.error('更新用户信息时发生错误', error)
    alert('更新失败，请稍后重试')
  }
}

// 取消用户信息修改
const handleCancelUserInfo = () => {
  newUserInfo.value = { ...userInfo.value } as UserInfo
  alert('已取消用户信息的修改')
}

// 重置密码表单
const resetPasswordForm = () => {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

// 修改密码
const handleChangePassword = async () => {
  const { oldPassword, newPassword, confirmPassword } = passwordForm.value

  if (!oldPassword || !newPassword || !confirmPassword) {
    alert('请填写所有密码字段')
    return
  }

  if (newPassword !== confirmPassword) {
    alert('新密码和确认密码不匹配')
    return
  }

  try {
    const response = await changeUserPassword(userId.value, oldPassword, newPassword)
    if (response.code === 0) {
      alert('密码修改成功')
      resetPasswordForm()
    } else {
      throw new Error(response.message || '密码修改失败')
    }
  } catch (error) {
    console.error('修改密码时发生错误', error)
    alert('修改密码失败，请稍后重试')
  }
}
</script>

<style scoped></style>
