import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { UserInfo } from '../types/global'


export const useUserStore = defineStore('user', () => {
    const userId = ref<number >(-1)
    const username = ref<string >('')

    const defaultUserInfo: UserInfo = {
        id: -1,
        avatar_url: '',
        cover_url: '',
        age: 0,
        gender: '',
        birthday: '',
        email: '',
        description: ''
    }
    
    const userInfo = ref<UserInfo>(defaultUserInfo)


    const isLoggedIn = computed(() => userId.value !== -1)

    function logout() {
        // 清除 localStorage 中的所有数据
        localStorage.clear();

        // 重置用户状态
        userId.value = -1;
        username.value = '';
        userInfo.value = defaultUserInfo;
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
        const storedUserInfo = localStorage.getItem('user_info')

        userId.value = storedUserId ? parseInt(storedUserId, 10) : -1
        username.value = storedUserName ? storedUserName : ''
        userInfo.value = storedUserInfo ? JSON.parse(storedUserInfo) : defaultUserInfo
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

    watch(userInfo, (newUserInfo) => {
        if (newUserInfo === null) {
            localStorage.removeItem('user_info')
        } else {
            localStorage.setItem('user_info', JSON.stringify(newUserInfo))
        }
    })

    initializeFromStorage()

    return { userId, username, userInfo, isLoggedIn, setUserId, setUserName, setUserInfo, logout, initializeFromStorage }
})