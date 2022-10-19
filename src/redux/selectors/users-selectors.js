import { createSelector } from 'reselect'

// Primitive selector to help install dependencies to main difficult selector created with Reselect library
const getUsersPrimitiveSelector = (state) => {
   return state.usersPage.users;
}
// Example how to create selectors with Reselect library from redux
export const getUsers = createSelector(getUsersPrimitiveSelector,
   (users) => {
      return users.filter(u => u);
   })

   
export const getTotalUsersCount = (state) => {
   return state.usersPage.totalUsersCount;
}
export const getPageSize = (state) => {
   return state.usersPage.pageSize;
}
export const getCurrentPage = (state) => {
   return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
   return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state) => {
   return state.usersPage.followingInProgress;
}