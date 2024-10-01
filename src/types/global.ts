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