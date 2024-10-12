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
        const token = localStorage.getItem('token');
        if (token) {
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
        return response;
    },
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const userId = localStorage.getItem('user_id');
            try {
                const refreshResponse = await refreshToken(Number(userId));
                if (refreshResponse.status === 200 && refreshResponse.data.code === 0) {
                    const newToken = refreshResponse.data.data;
                    localStorage.setItem('token', newToken);
                    originalRequest.headers['Authorization'] = `${newToken}`;
                    return userClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('刷新 token 失败', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// 接口定义
export interface LoginResponse {
    user_id: number;
    token: string;
    refresh_token: string;
}

export interface RegisterResponse {
    user_id: number;
    token: string;
    refresh_token: string;
}

// 辅助函数
function saveUserTokenToLocalStorage(userData: LoginResponse | RegisterResponse) {
    const { user_id, token, refresh_token } = userData;
    localStorage.setItem('user_id', user_id.toString());
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refresh_token);
}

// API 函数

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 */
export async function login(username: string, password: string) {
    try {
        const response = await userClient.post('/auth', { username, password });
        if (response.data.code === 0) {
            saveUserTokenToLocalStorage(response.data.data);
        }
        return response.data;
    } catch (error) {
        console.error('登录失败', error);
        throw error;
    }
}

/**
 * 用户注册
 * @param username 用户名
 * @param password 密码
 */
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

/**
 * 刷新 token
 * @param userId 用户ID
 */
async function refreshToken(userId: number) {
    const refresh_token = localStorage.getItem('refresh_token');
    try {
        return await userClient.get(`/auth/refresh/${userId}`, {
            headers: { 'RefreshToken': refresh_token }
        });
    } catch (error) {
        console.error('刷新 token 请求失败', error);
        throw error;
    }
}

/**
 * 获取用户信息
 * @param id 用户ID
 */
export async function getUserInfo(id: number) {
    try {
        const response = await userClient.get(`/users/${id}`);
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

/**
 * 修改用户密码
 * @param id 用户ID
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 */
export async function changeUserPassword(id: number, oldPassword: string, newPassword: string) {
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

/**
 * 更新用户信息
 * @param id 用户ID
 * @param userInfo 用户信息
 */
export async function updateUserInfo(id: number, userInfo: any) {
    try {
        const response = await userClient.put(`/users/${id}`, userInfo);
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

/**
 * 上传用户头像
 * @param id 用户ID
 * @param file 头像文件
 */
export async function uploadUserAvatar(id: number, file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await userClient.post(`/users/${id}/avatar`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
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

/**
 * 上传用户封面
 * @param id 用户ID
 * @param file 封面文件
 */
export async function uploadUserCover(id: number, file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await userClient.post(`/users/${id}/cover`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
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

/**
 * 获取歌手简单信息列表
 * @param country 国家
 * @param gender 性别
 * @param offset 偏移量
 * @param limit 每页数量
 */
export async function getSingerInfoListByCountryAndGender(country: string, gender: string, offset: number, limit: number) {
    try {
        const response = await userClient.get(`/singers`, {
            params: { country, gender, offset, limit }
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

/**
 * 根据ID列表获取歌手简单信息
 * @param idList 歌手ID列表
 */
export async function getSingerInfoByIdList(idList: number[]) {
    try {
        const response = await userClient.post(`/singers`, { ids: idList });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取歌手简单信息列表失败');
        }
    } catch (error) {
        console.error('获取歌手简单信息列表失败', error);
        throw error;
    }
}

/**
 * 根据ID列表获取音乐卡片信息
 * @param idList 音乐ID列表
 */
export async function getMusicCardInfoByIdList(idList: number[]) {
    try {
        const response = await userClient.post(`/music-card`, { ids: idList });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取音乐卡片信息列表失败');
        }
    } catch (error) {
        console.error('获取音乐卡片信息列表失败', error);
        throw error;
    }
}

/**
 * 根据ID列表获取专辑信息
 * @param idList 专辑ID列表
 */
export async function getAlbumInfoByIdList(idList: number[]) {
    try {
        const response = await userClient.post(`/albums`, { ids: idList });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取专辑信息列表失败');
        }
    } catch (error) {
        console.error('获取专辑信息列表失败', error);
        throw error;
    }
}

/**
 * 获取歌手详细信息
 * @param id 歌手ID
 */
export async function getSingerInfo(id: number) {
    try {
        const response = await userClient.get(`/singers/${id}`);
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

/**
 * 检查用户是否关注歌手
 * @param userId 用户ID
 * @param singerId 歌手ID
 */
export async function checkUserFollowingSinger(userId: number, singerId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/singers/${singerId}`);
        return response.data;
    } catch (error) {
        console.error('检查用户是否关注歌手失败', error);
        throw error;
    }
}

/**
 * 关注歌手
 * @param userId 用户ID
 * @param singerId 歌手ID
 */
export async function followSinger(userId: number, singerId: number) {
    try {
        const response = await userClient.post(`/users/${userId}/singers/${singerId}`);
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

/**
 * 取消关注歌手
 * @param userId 用户ID
 * @param singerId 歌手ID
 */
export async function unfollowSinger(userId: number, singerId: number) {
    try {
        const response = await userClient.delete(`/users/${userId}/singers/${singerId}`);
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

/**
 * 获取音乐信息
 * @param id 音乐ID
 */
export async function getMusicById(id: number) {
    try {
        const response = await userClient.get(`/musics/${id}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取音乐信息失败');
        }
    } catch (error) {
        console.error('获取音乐信息失败', error);
        throw error;
    }
}

/**
 * 获取专辑信息
 * @param id 专辑ID
 */
export async function getAlbumById(id: number) {
    try {
        const response = await userClient.get(`/albums/${id}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取专辑信息失败');
        }
    } catch (error) {
        console.error('获取专辑信息失败', error);
        throw error;
    }
}

/**
 * 获取歌手的音乐卡片信息
 * @param id 歌手ID
 * @param limit 限制数量
 * @param offset 偏移量
 */
export async function getSingerMusicCardInfoById(id: number, limit: number, offset: number) {
    try {
        const response = await userClient.get(`/singers/${id}/music-card`, {
            params: { limit, offset }
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取歌手音乐卡片信息失败');
        }
    } catch (error) {
        console.error('获取歌手音乐卡片信息失败', error);
        throw error;
    }
}

/**
 * 获取歌手的专辑信息
 * @param id 歌手ID
 * @param limit 限制数量
 * @param offset 偏移量
 */
export async function getSingerAlbumInfoById(id: number, limit: number, offset: number) {
    try {
        const response = await userClient.get(`/singers/${id}/albums`, {
            params: { limit, offset }
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取歌手专辑信息失败');
        }
    } catch (error) {
        console.error('获取歌手专辑信息失败', error);
        throw error;
    }
}

/**
 * 获取专辑的音乐卡片信息
 * @param id 专辑ID
 * @param limit 限制数量
 * @param offset 偏移量
 */
export async function getAlbumMusicCardInfoById(id: number, limit: number, offset: number) {
    try {
        const response = await userClient.get(`/albums/${id}/music-card`, {
            params: { limit, offset }
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取专辑音乐卡片信息失败');
        }
    } catch (error) {
        console.error('获取专辑音乐卡片信息失败', error);
        throw error;
    }
}

/**
 * 检查用户是否收藏音乐
 * @param userId 用户ID
 * @param musicId 音乐ID
 */
export async function checkUserLikingMusic(userId: number, musicId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/musics/${musicId}`);
        return response.data;
    } catch (error) {
        console.error('检查用户是否收藏音乐失败', error);
        throw error;
    }
}

/**
 * 收藏音乐
 * @param userId 用户ID
 * @param musicId 音乐ID
 */
export async function likeMusic(userId: number, musicId: number) {
    try {
        const response = await userClient.post(`/users/${userId}/musics/${musicId}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '收藏音乐失败');
        }
    } catch (error) {
        console.error('收藏音乐失败', error);
        throw error;
    }
}

/**
 * 取消收藏音乐
 * @param userId 用户ID
 * @param musicId 音乐ID
 */
export async function unlikeMusic(userId: number, musicId: number) {
    try {
        const response = await userClient.delete(`/users/${userId}/musics/${musicId}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '取消收藏音乐失败');
        }
    } catch (error) {
        console.error('取消收藏音乐失败', error);
        throw error;
    }
}

/**
 * 检查用户是否收藏专辑
 * @param userId 用户ID
 * @param albumId 专辑ID
 */
export async function checkUserLikingAlbum(userId: number, albumId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/albums/${albumId}`);
        return response.data;
    } catch (error) {
        console.error('检查用户是否收藏专辑失败', error);
        throw error;
    }
}

/**
 * 音乐播放量增加
 * @param id 音乐ID
 */
export async function increaseMusicPlayCount(id: number) {
    try {
        const response = await userClient.post(`/musics/${id}/play`);
        return response.data;
    } catch (error) {
        console.error('音乐播放量增加失败', error);
        throw error;
    }
}

/**
 * 收藏专辑
 * @param userId 用户ID
 * @param albumId 专辑ID
 */
export async function likeAlbum(userId: number, albumId: number) {
    try {
        const response = await userClient.post(`/users/${userId}/albums/${albumId}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '收藏专辑失败');
        }
    } catch (error) {
        console.error('收藏专辑失败', error);
        throw error;
    }
}

/**
 * 取消收藏专辑
 * @param userId 用户ID
 * @param albumId 专辑ID
 */
export async function unlikeAlbum(userId: number, albumId: number) {
    try {
        const response = await userClient.delete(`/users/${userId}/albums/${albumId}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '取消收藏专辑失败');
        }
    } catch (error) {
        console.error('取消收藏专辑失败', error);
        throw error;
    }
}

/**
 * 获取用户关注歌手ID列表
 * @param userId 用户ID
 */
export async function getUserFollowedSingerIdList(userId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/singers-id`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取用户关注歌手ID列表失败');
        }
    } catch (error) {
        console.error('获取用户关注歌手ID列表失败', error);
        throw error;
    }
}

/**
 * 获取用户收藏的音乐ID列表
 * @param userId 用户ID
 */
export async function getUserLikedMusicIdList(userId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/musics-id`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取用户收藏的音乐ID列表失败');
        }
    } catch (error) {
        console.error('获取用户收藏的音乐ID列表失败', error);
        throw error;
    }
}

/**
 * 获取用户收藏的专辑ID列表
 * @param userId 用户ID
 */
export async function getUserLikedAlbumIdList(userId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/albums-id`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取用户收藏的专辑ID列表失败');
        }
    } catch (error) {
        console.error('获取用户收藏的专辑ID列表失败', error);
        throw error;
    }
}

/**
 * 获取用户收藏的歌单ID列表
 * @param userId 用户ID
 */
export async function getUserLikedPlaylistIdList(userId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/playlists-id`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取用户收藏的歌单ID列表失败');
        }
    } catch (error) {
        console.error('获取用户收藏的歌单ID列表失败', error);
        throw error;
    }
}

/**
 * 获取用户创建过的歌单列表
 * @param userId 用户ID
 */
export async function getUserCreatedPlaylistList(userId: number) {
    try {
        const response = await userClient.get(`/playlists/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('获取用户创建过的歌单列表失败', error);
        throw error;
    }
}

/**
 * 用户收藏歌单
 * @param userId 用户ID
 * @param playlistId 歌单ID
 */
export async function likePlaylist(userId: number, playlistId: number) {
    try {
        const response = await userClient.post(`/users/${userId}/playlists/${playlistId}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '用户收藏歌单失败');
        }
    } catch (error) {
        console.error('用户收藏歌单失败', error);
        throw error;
    }
}

/**
 * 取消收藏歌单
 * @param userId 用户ID
 * @param playlistId 歌单ID
 */
export async function unlikePlaylist(userId: number, playlistId: number) {
    try {
        const response = await userClient.delete(`/users/${userId}/playlists/${playlistId}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '取消收藏歌单失败');
        }
    } catch (error) {
        console.error('取消收藏歌单失败', error);
        throw error;
    }
}

/**
 * 用户是否收藏歌单
 * @param userId 用户ID
 * @param playlistId 歌单ID
 */
export async function checkUserLikedPlaylist(userId: number, playlistId: number) {
    try {
        const response = await userClient.get(`/users/${userId}/playlists/${playlistId}`);
        return response.data;
    } catch (error) {
        console.error('检查用户是否收藏歌单失败', error);
        throw error;
    }
}

/**
 * 获取歌单详细信息
 * @param id 歌单ID
 */
export async function getPlaylistDetail(id: number) {
    try {
        const response = await userClient.get(`/playlists/${id}`);
        return response.data;
    } catch (error) {
        console.error('获取歌单详细信息失败', error);
        throw error;
    }
}

/**
 * 获取歌单音乐列表
 * @param id 歌单ID
 * @param offset 偏移量
 * @param limit 每页数量
 */
export async function getPlaylistMusicCardList(id: number, offset: number, limit: number) {
    try {
        const response = await userClient.get(`/playlists/${id}/music-card`, {
            params: { offset, limit }
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取歌单音乐列表失败');
        }
    } catch (error) {
        console.error('获取歌单音乐列表失败', error);
        throw error;
    }
}

/**
 * 获取歌单音乐ID列表
 * @param id 歌单ID
 */
export async function getPlaylistMusicIdList(id: number) {
    try {
        const response = await userClient.get(`/playlists/${id}/musics-id`);
        return response.data;
    } catch (error) {
        console.error('获取歌单音乐ID列表失败', error);
        throw error;
    }
}


/**
 * 获取歌单信息列表
 * @param idList 歌单ID列表
 */
export async function getPlaylistInfoListByIdList(idList: number[]) {
    try {
        const response = await userClient.post('/playlists', { ids: idList });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取歌单信息列表失败');
        }
    } catch (error) {
        console.error('获取歌单信息列表失败', error);
        throw error;
    }
}

/**
 * 创建歌单
 * @param playlistName 歌单名称
 * @param tags 标签
 * @param description 描述
 * @param userId 用户ID
 */
export async function createPlaylist(playlistName: string, tags: string, description: string, userId: number) {
    try {
        const response = await userClient.post('/playlists/add', {
            playlist_name: playlistName,
            tags,
            description,
            user_id: userId
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '创建歌单失败');
        }
    } catch (error) {
        console.error('创建歌单失败', error);
        throw error;
    }
}

/**
 * 更新歌单信息
 * @param id 歌单ID
 * @param playlistName 歌单名称
 * @param tags 标签
 * @param description 描述
 */
export async function updatePlaylist(id: number, playlistName: string, tags: string, description: string) {
    try {
        const response = await userClient.put(`/playlists/${id}`, {
            playlist_name: playlistName,
            tags,
            description
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '更新歌单失败');
        }
    } catch (error) {
        console.error('更新歌单失败', error);
        throw error;
    }
}

/**
 * 删除歌单
 * @param id 歌单ID
 */
export async function deletePlaylist(id: number) {
    try {
        const response = await userClient.delete(`/playlists/${id}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '删除歌单失败');
        }
    } catch (error) {
        console.error('删除歌单失败', error);
        throw error;
    }
}

/**
 * 添加音乐到歌单
 * @param playlistId 歌单ID
 * @param musicId 音乐ID
 */
export async function addMusicToPlaylist(playlistId: number, musicId: number) {
    try {
        const response = await userClient.post(`/playlists/${playlistId}/musics`, {
            music_id: musicId
        });
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '添加音乐到歌单失败');
        }
    } catch (error) {
        console.error('添加音乐到歌单失败', error);
        throw error;
    }
}

/**
 * 从歌单中移除音乐
 * @param playlistId 歌单ID
 * @param musicId 音乐ID
 */
export async function removeMusicFromPlaylist(playlistId: number, musicId: number) {
    try {
        const response = await userClient.delete(`/playlists/${playlistId}/musics/${musicId}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '从歌单中移除音乐失败');
        }
    } catch (error) {
        console.error('从歌单中移除音乐失败', error);
        throw error;
    }
}

/**
 * 获取用户创建的歌单名称和音乐是否添加
 * @param userId 用户ID
 * @param musicId 音乐ID
 */
export async function GetUserCreatedPlaylistNameAndMusicIsAdded(userId: number, musicId: number) {
    try {
        const response = await userClient.get(`/playlists/user/${userId}/music-is-added/${musicId}`);
        if (response.data.code === 0) {
            return response.data;
        } else {
            throw new Error(response.data.message || '获取用户创建的歌单名称和音乐是否添加失败');
        }
    } catch (error) {
        console.error('获取用户创建的歌单名称和音乐是否添加失败', error);
        throw error;
    }
}