import * as axios from 'axios';

export const instance = axios.default.create({
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
export enum ResultCodeForCaptchaEnum{
    CaptchaIsRequired = 10
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}