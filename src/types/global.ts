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
    emotions: string;
    genres: string;
    instruments: string;
}

export interface MusicSCardInfo {
    id: number;
    cover_url: string;
    title: string;
    singer_name: string;
    album_name: string;
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

export interface PlaylistInfo {
    id: number;
    cover_url: string;
    playlist_name: string;
    tags: string;
    like_count: number;
    description: string;
    user_id: number;
    creation_date: string;
}
