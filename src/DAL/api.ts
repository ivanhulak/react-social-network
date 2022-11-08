import * as axios from 'axios';
import { PhotosType, ProfileType, UsersType } from '../types/types';

let instance = axios.default.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '0f7ca0a1-1142-4ef6-a871-38727982b107'
    }
})
export enum ResponseResultCodes{
    Success = 0,
    Error = 1
}
export enum GetCaptchaResultCode{
    GetCaptchaUrl = 10
}

// ******************  Users API  ******************
type GetUsersType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 9) {
        return instance.get<GetUsersType>(`users?count=${pageSize}&page=${currentPage}`).then(response => response.data)
    },
}

// ******************  Profile API  ******************
type UpdateProfileStatusType = {
    resultCode: number
    messages: Array<string>
    data: any
}
type UpdateProfileType = {
    resultCode: number
    messages: Array<string>
    data: any
}
type UpgradePhotoType = {
    resultCode: number
    messages: Array<string>
    data: {photos: PhotosType}
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateProfileStatusType>('profile/status', { status: status })
            .then(response => response.data);
    },
    uploadPhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<UpgradePhotoType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    upgradeProfile(profileData: ProfileType) {
        return instance.put<UpdateProfileType>('profile', profileData).then(response => response.data)
    },

}

// ******************  Auth API  ******************
type GetAuthMeType = {
    data: {
        id: number,
        email: string,
        login: string
    }
    resultCode: number
    messages: Array<string> 
}
type LoginType = {
    data: any
    resultCode: number
    messages: Array<string> 
}
type LogoutType = {
    data: any
    resultCode: number
    messages: Array<string> 
}
type GetCaptchaType = {
    url: string
}
export const authAPI = {
    authMe() {
        return instance.get<GetAuthMeType>('auth/me').then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginType>('auth/login', { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutType>('auth/login').then(response => response.data)
    },
    getCaptchaUrl() {
        return instance.get<GetCaptchaType>('security/get-captcha-url').then(response => response.data)
    }
}