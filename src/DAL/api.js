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
    getUsersCount(pageSize, page) {
        return instance.get(`users?count=${pageSize}&page=${page}`)
            .then(response => response.data);
    },
    // unfollow(userId) {
    //     return instance.delete(`follow/${userId}`).then(response => response.data)
    // },
    // follow(userId) {
    //     return instance.post(`follow/${userId}`).then(response => response.data)
    // },
}
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
}
export const authAPI = {
    authMe() {
        return instance.get('auth/me').then(response => response.data);
    },
}