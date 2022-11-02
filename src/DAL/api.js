import * as axios from 'axios';

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '0f7ca0a1-1142-4ef6-a871-38727982b107'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 9) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data);
    },
}
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },
    updateStatus(status) {
        return instance.put('profile/status', { status: status });
    },
    uploadPhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    upgradeProfile(profileData) {
        return instance.put('profile', profileData);
    },

}
export const authAPI = {
    authMe() {
        return instance.get('auth/me').then(response => response.data);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login', { email, password, rememberMe, captcha });
    },
    logout() {
        return instance.delete('auth/login');
    },
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url');
    }
}