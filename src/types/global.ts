export interface UserInfo {
    id: number;
    username: string;
    avatar_url: string;
    cover_url: string;
    age: number;
    gender: string;
    birthday: string;
    email: string;
    description: string;
}

export interface SingerInfo {
    id: number;
    avatar_url: string;
    name: string;
    stage_name: string;
    gender: string;
    birthday: string;
    origin_country: string;
    main_genre: string;
    debut_year: string;
    followers_count: number;
    description: string;
}

export interface SingerSimpleInfo {
    id: number;
    avatar_url: string;
    name: string;
    main_genre: string;
}

export interface MusicInfo {
    id: number;
    cover_url: string;
    title: string;
    singer_id: number;
    singer_name: string;
    album_id: number;
    album_name: string;
    release_date: string;
    music_url: string;
    play_count: number;
    like_count: number;
    comment_count: number;
    lyrics_url: string;
}

export interface MusicSCardInfo {
    id: number;
    cover_url: string;
    title: string;
    singer_name: string;
    album_name: string;
}

export interface MusicPlayerInfo {
    id: number;
    cover_url: string;
    title: string;
    singer_id: number;
    singer_name: string;
    album_id: number;
    album_name: string;
    music_url: string;
    play_count: number;
    like_count: number;
    comment_count: number;
}

export interface AlbumInfo {
    id: number;
    cover_url: string;
    album_name: string;
    singer_id: number;
    singer_name: string;
    release_date: string;
    like_count: number;
    description: string;
}

export interface NavigationItem {
    index: number;
    name: string;
    href: string;
    title: string;
    icon?: any;
}

export const DefaultUserInfo: UserInfo = {
    id: -1,
    username: '',
    avatar_url: '',
    cover_url: '',
    age: 0,
    gender: '',
    birthday: '',
    email: '',
    description: ''
}

export const DefaultSingerInfo: SingerInfo = {
    id: -1,
    avatar_url: '',
    name: '',
    stage_name: '',
    gender: '',
    birthday: '',
    origin_country: '',
    main_genre: '',
    debut_year: '',
    followers_count: 0,
    description: ''
}

export const DefaultMusicInfo: MusicInfo = {
    id: -1,
    cover_url: '',
    title: '',
    singer_id: -1,
    singer_name: '',
    album_id: -1,
    album_name: '',
    release_date: '',
    music_url: '',
    play_count: 0,
    like_count: 0,
    comment_count: 0,
    lyrics_url: ''
}

export const DefaultAlbumInfo: AlbumInfo = {
    id: -1,
    cover_url: '',
    album_name: '',
    singer_id: -1,
    singer_name: '',
    release_date: '',
    like_count: 0,
    description: ''
}
