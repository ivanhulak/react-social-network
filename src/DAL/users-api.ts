import { UsersType } from "../types/types"
import { instance } from "./api"

export type GetUsersResponseType = {
   items: Array<UsersType >
   totalCount: number
   error: string | null
}
export const usersAPI = {
   getUsers(currentPage: number = 1, pageSize: number = 9, term: string = '', friend: null | boolean = null) {
       return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
         .then(response => response.data);
   },
   getFriends(){
      return instance.get(`users?friend=${true}`).then(response => response.data);
   },
}