import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { UserInfo } from '../types/global'


export const useUserStore = defineStore('user', () => {
    const userId = ref<number | null>(null)
    const username = ref<string | null>(null)
    const userInfo = ref<UserInfo | null>(null)

    const isLoggedIn = computed(() => userId.value !== null)

    function logout() {
        // 清除 localStorage 中的所有数据
        localStorage.clear();

        // 重置用户状态
        userId.value = null;
        username.value = '';
        userInfo.value = null;
    }

    function setUserId(id: number) {
        userId.value = id
    }

    function setUserName(name: string) {
        username.value = name
    }

    function setUserInfo(info: UserInfo) {
        userInfo.value = info
    }

    function initializeFromStorage() {
        const storedUserId = localStorage.getItem('user_id')
        const storedUserName = localStorage.getItem('user_name')
        userId.value = storedUserId ? parseInt(storedUserId, 10) : null
        username.value = storedUserName ? storedUserName : null
    }

    watch(userId, (newUserId) => {
        if (newUserId === null) {
            localStorage.removeItem('user_id')
        } else {
            localStorage.setItem('user_id', newUserId.toString())
        }
    })

    watch(username, (newUserName) => {
        if (newUserName === null) {
            localStorage.removeItem('user_name')
        } else {
            localStorage.setItem('user_name', newUserName)
        }
    })

    initializeFromStorage()

    return { userId, username, userInfo, isLoggedIn, setUserId, setUserName, setUserInfo, logout, initializeFromStorage }
})