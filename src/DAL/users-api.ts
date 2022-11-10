import { UsersType } from "../types/types"
import { instance } from "./api"

type GetUsersResponseType = {
   items: Array<UsersType >
   totalCount: number
   error: string | null
}
export const usersAPI = {
   getUsers(currentPage: number = 1, pageSize: number = 9) {
       return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=${currentPage}`).then(response => response.data)
   },
}