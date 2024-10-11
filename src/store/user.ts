import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { DefaultUserInfo, UserInfo } from '../types/global'


export const useUserStore = defineStore('user', () => {
    const userId = ref<number>(-1)

    const userInfo = ref<UserInfo>(DefaultUserInfo)

    const isLoggedIn = computed(() => userId.value !== -1)

    function logout() {
        // 清除 localStorage 中的所有数据
        localStorage.clear();

        // 重置用户状态
        userId.value = -1;
        userInfo.value = DefaultUserInfo;
    }

    function setUserId(id: number) {
        userId.value = id
    }


    function setUserInfo(info: UserInfo) {
        userInfo.value.id = info.id
        userInfo.value.username = info.username
        userInfo.value.avatar_url = info.avatar_url
        userInfo.value.cover_url = info.cover_url
        userInfo.value.age = info.age
        userInfo.value.gender = info.gender
        userInfo.value.birthday = info.birthday
        userInfo.value.email = info.email
        userInfo.value.description = info.description
    }


    function initializeFromStorage() {
        const storedUserId = localStorage.getItem('user_id')
        const storedUserInfo = localStorage.getItem('user_info')

        userId.value = storedUserId ? parseInt(storedUserId, 10) : -1
        userInfo.value = storedUserInfo ? JSON.parse(storedUserInfo) : DefaultUserInfo
    }

    watch(userId, (newUserId) => {
        if (newUserId === null) {
            localStorage.removeItem('user_id')
        } else {
            localStorage.setItem('user_id', newUserId.toString())
        }
    })

    watch(userInfo, (newUserInfo) => {
        if (newUserInfo === null) {
            localStorage.removeItem('user_info')
        } else {
            localStorage.setItem('user_info', JSON.stringify(newUserInfo))
        }
    })

    initializeFromStorage()

    return { userId, userInfo, isLoggedIn, setUserId, setUserInfo, logout, initializeFromStorage }
})