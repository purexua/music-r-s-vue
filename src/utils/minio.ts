import * as Minio from 'minio'

// 常量
export const BUCKET_NAME = 'music-r-s'
export const VITE_MINIO_ENDPOINT = 'http://127.0.0.1:8000'
export const AVATAR_DEFAULT_URL = 'http://127.0.0.1:8000/avatars/avatar-default.png'
export const COVER_DEFAULT_URL = 'http://127.0.0.1:8000/covers/cover-default.png'

// 创建 MinIO 客户端实例
export const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 8000,
    useSSL: false,
    accessKey: 'purexua',
    secretKey: 'password',
  })

// 可选：添加一个类型安全的函数来获取 MinIO 客户端
export function getMinioClient(): Minio.Client {
  return minioClient
}

