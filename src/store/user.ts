import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
    const router = useRouter()

    const userId = ref<number>(-1)
    const isLoggedIn = computed(() => userId.value > 0)

    function getUserId(): number {
        const storedUserId = localStorage.getItem('user_id')
        if (storedUserId !== null) {
            userId.value = parseInt(storedUserId, 10)
        }
        if (userId.value <= 0) {
            router.push('/login')
        }
        return userId.value
    }

    function logout(): void {
        localStorage.clear()
        userId.value = -1
        router.push('/login')
    }

    async function setUserId(id: number): Promise<void> {
        if (id > 0) {
            userId.value = id
            localStorage.setItem('user_id', id.toString())
        } else {
            console.error('无效的用户ID:', id)
        }
    }

    return { 
        userId, 
        isLoggedIn, 
        setUserId,
        logout, 
        getUserId, 
    }
})
