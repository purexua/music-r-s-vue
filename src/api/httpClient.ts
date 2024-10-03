import axios from 'axios';

// 创建 Axios 实例
const userClient = axios.create({
    baseURL: '/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器：添加 Authorization 头
userClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // 获取 token
        if (token) {
            // 如果 token 存在，将其放入请求头的 Authorization 中
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器：处理 401 错误并刷新 token
userClient.interceptors.response.use(
    response => {
        return response; // 正常返回响应
    },
    async error => {
        const originalRequest = error.config; // 保存原始请求
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // 如果请求返回 401 Unauthorized 且还未进行重试
            originalRequest._retry = true; // 标记请求为已重试

            // 获取用户 ID 和 refresh_token
            const userId = localStorage.getItem('user_id');
            try {
                const refreshResponse = await refreshToken(Number(userId)); // 调用刷新 token 的方法

                if (refreshResponse.status === 200 && refreshResponse.data.code === 0) {
                    // 如果刷新 token 成功
                    const newToken = refreshResponse.data.data; // 新的 access token
                    localStorage.setItem('token', newToken); // 更新本地存储的 access token
                    originalRequest.headers['Authorization'] = `${newToken}`; // 更新原始请求的 Authorization 头

                    return userClient(originalRequest); // 重新发送原始请求
                }
            } catch (refreshError) {
                // 处理刷新 token 失败的情况
                console.error('刷新 token 失败', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error); // 处理其他错误
    }
);

// 登录响应接口
export interface LoginResponse {
    user_id: number;
    token: string;
    refresh_token: string;
}

// 注册响应接口
export interface RegisterResponse {
    user_id: number;
    token: string;
    refresh_token: string;
}

// 新增函数：保存用户信息到本地存储
function saveUserTokenToLocalStorage(userData: LoginResponse | RegisterResponse) {
    const { user_id, token, refresh_token } = userData;
    localStorage.setItem('user_id', user_id.toString());
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refresh_token);
}

// 登录请求
// export async function login(username: string, password: string, captchaVerifyParam: string) {
export async function login(username: string, password: string) {
    try {
        const response = await userClient.post('/auth', {
            username, password,
            // captcha_verify_param: captchaVerifyParam
        });
        if (response.data.code === 0) {
            saveUserTokenToLocalStorage(response.data.data);
        }
        return response.data;
    } catch (error) {
        console.error('登录失败', error);
        throw error;
    }
}

// 注册请求
export async function register(username: string, password: string) {
    try {
        const response = await userClient.post('/users', { username, password });
        if (response.data.code === 0) {
            saveUserTokenToLocalStorage(response.data.data);
        }
        return response.data;
    } catch (error) {
        console.error('注册失败', error);
        throw error;
    }
}

// 刷新 token 请求
async function refreshToken(userId: number) {
    const refresh_token = localStorage.getItem('refresh_token'); // 从本地存储获取 refresh_token
    try {
        // 调用后端刷新 token 接口，并在请求头中添加 refresh_token
        return await userClient.get(`/auth/refresh/${userId}`, {
            headers: { 'RefreshToken': refresh_token }
        });
    } catch (error) {
        console.error('刷新 token 请求失败', error);
        throw error;
    }
}

// 获取用户信息请求
export async function getUserInfo(id: number) {
    try {
        const response = await userClient.get(`/users/${id}/info`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取用户信息失败');
        }
    } catch (error) {
        console.error('获取用户信息失败', error);
        throw error;
    }
}

// 修改密码请求 传 id 和 新旧密码
export async function changePassword(id: number, oldPassword: string, newPassword: string) {
    try {
        const response = await userClient.put(`/users/${id}/password`, { old_password: oldPassword, new_password: newPassword });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '修改密码失败');
        }
    } catch (error) {
        console.error('修改密码失败', error);
        throw error;
    }
}

// 更新用户信息请求
export async function updateUserInfo(id: number, userInfo: any) {
    try {
        const response = await userClient.put(`/users/${id}/info`, userInfo);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '更新用户信息失败');
        }
    } catch (error) {
        console.error('更新用户信息失败', error);
        throw error;
    }
}


// 上传头像请求
export async function uploadAvatar(id: number, file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await userClient.post(`/users/${id}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '上传头像失败');
        }
    } catch (error) {
        console.error('上传头像失败', error);
        throw error;
    }
}

// 上传封面请求
export async function uploadCover(id: number, file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await userClient.post(`/users/${id}/cover`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '上传封面失败');
        }
    } catch (error) {
        console.error('上传封面失败', error);
        throw error;
    }
}

// 获取歌手列表请求

export async function getSingerSimpleInfoListByCountryAndGender(country: string, gender: string, pageNum: number, pageSize: number) {
    try {
        const response = await userClient.get(`/singers/info`, {
            params: { country, gender, pageNum, pageSize }
        });

        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取歌手列表失败');
        }
    } catch (error) {
        console.error('获取歌手列表失败', error);
        throw error;
    }
}

// 获取歌手详细信息
export async function getSingerInfo(id: number) {
    try {
        const response = await userClient.get(`/singers/${id}/info`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取歌手详细信息失败');
        }
    } catch (error) {
        console.error('获取歌手详细信息失败', error);
        throw error;
    }
}

// 用户是否关注歌手
export async function isFollowingSinger(userId: number, singerId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/follow`, {
            params: {
                singer_id: singerId
            }
        });
        return response.data;
    } catch (error) {
        console.error('检查用户是否关注歌手失败', error);
        throw error;
    }
}

// 关注歌手
export async function followSinger(userId: number, singerId: number) {
    try {
        const response = await userClient.post(`/users/${userId}/follow`, null, { 
            params: {
                singer_id: singerId
            }
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '关注歌手失败');
        }
    } catch (error) {
        console.error('关注歌手失败', error);
        throw error;
    }
}

// 取消关注歌手
export async function unfollowSinger(userId: number, singerId: number) {
    try {
        const response = await userClient.delete(`/users/${userId}/follow`, {
            params: { singer_id: singerId }
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '取消关注歌手失败');
        }
    } catch (error) {
        console.error('取消关注歌手失败', error);
        throw error;
    }
}

// ... 其他接口方法 ...

