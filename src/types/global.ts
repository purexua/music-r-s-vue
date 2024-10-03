export interface UserInfo {
    id: number;
    avatar_url: string;
    cover_url: string;
    age: number;
    gender: string;
    birthday: string;
    email: string;
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

export interface SingerSimpleInfo {
    id: number;
    avatar_url: string;
    name: string;
    main_genre: string;
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