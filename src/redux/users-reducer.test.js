import userReducer, { followSuccess, setUsers, unfollowSuccess } from "./users-reducer";

const state = {
   users: [
      {
        "name": "swomen798",
        "id": 26387,
        "followed": false
      },
      {
        "name": "eziz",
        "id": 26386,
        "followed": false
      },
      {
        "name": "Alena_Kaus",
        "id": 26385,
        "followed": false
      }
    ]
}

test('Field followed should be true after following this user', () => {
   let action = followSuccess(26387);
   let newState = userReducer(state, action);
   expect(newState.users[0].followed).toBe(true);
 });
test('Field followed should be false after unfollowing this user', () => {
   let action = unfollowSuccess(26387);
   let newState = userReducer(state, action);
   expect(newState.users[0].followed).toBe(false);
 });
test('Amount added users should be equal to users located in state', () => {
   let action = setUsers(state.users);
   let newState = userReducer(state, action);
   expect(newState.users.length).toBe(state.users.length);
 });
 