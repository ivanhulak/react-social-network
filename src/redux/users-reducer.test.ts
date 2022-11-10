import userReducer, { actions } from "./users-reducer";

const state = {
   users: [
      {
        name: "swomen798",
        id: 26387,
        photos: {small: '', large: ''},
        status: '',
        followed: false
      },
      {
        name: "swomen798",
        id: 26386,
        photos: {small: '', large: ''},
        status: '',
        followed: false
      },
      {
        name: "swomen798",
        id: 26387,
        photos: {small: '', large: ''},
        status: '',
        followed: false
      }
    ],
    totalItemsCount: 0,
    pageSize: 9,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

test('Field followed should be true after following this user', () => {
   let action = actions.followSuccess(26387);
   let newState = userReducer(state, action);
   expect(newState.users[0].followed).toBe(true);
 });
test('Field followed should be false after unfollowing this user', () => {
   let action = actions.unfollowSuccess(26387);
   let newState = userReducer(state, action);
   expect(newState.users[0].followed).toBe(false);
 });
test('Amount added users should be equal to users located in state', () => {
   let action = actions.setUsers(state.users);
   let newState = userReducer(state, action);
   expect(newState.users.length).toBe(state.users.length);
 });
 