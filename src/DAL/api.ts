import * as axios from 'axios';
import { PhotosType, ProfileType, UsersType } from '../types/types';

let instance = axios.default.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '0f7ca0a1-1142-4ef6-a871-38727982b107'
    }
})
export enum ResultCodesEnum{
    Success = 0,
    Error = 1
}
export enum CaptchaResultCodeEnum{
    CaptchaIsRequired = 10
}

// ******************  Users API  ******************
type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 9) {
        return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=${currentPage}`).then(response => response.data)
    },
}

// ******************  Profile API  ******************
type ProfileStatusResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: any
}
type UpdateProfileResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: any
}
type UpgradePhotoResponseType = {
    resultCode: ResultCodesEnum
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
        return instance.put<ProfileStatusResponseType>('profile/status', { status: status })
            .then(response => response.data);
    },
    uploadPhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<UpgradePhotoResponseType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    upgradeProfile(profileData: ProfileType) {
        return instance.put<UpdateProfileResponseType>('profile', profileData).then(response => response.data)
    },

}

// ******************  Auth API  ******************
type AuthMeResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    }
    resultCode: ResultCodesEnum | CaptchaResultCodeEnum
    messages: Array<string> 
}
type LoginResponseType = {
    data: any
    resultCode: ResultCodesEnum | CaptchaResultCodeEnum
    messages: Array<string> 
}
type LogoutResponseType = {
    data: any
    resultCode: ResultCodesEnum | CaptchaResultCodeEnum
    messages: Array<string> 
}
type GetCaptchaResponseType = {
    url: string
}
export const authAPI = {
    authMe() {
        return instance.get<AuthMeResponseType>('auth/me').then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login').then(response => response.data)
    },
    CaptchaIsRequired() {
        return instance.get<GetCaptchaResponseType>('security/get-captcha-url').then(response => response.data)
    }
}