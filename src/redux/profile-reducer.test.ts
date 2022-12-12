import { actions } from "./profile-reducer";
import profileReducer from "./profile-reducer";
import heart from '../assets/posts-icons/heart.jpg'

let state = {
   posts: [
      { id: 1, postText: 'Love saves the world', likes: 107, comments: 27, sendings: 8, photo: '' },
      { id: 2, postText: 'I am learning React', likes: 1227, comments: 227, sendings: 19, photo: '' },
      { id: 3, postText: 'Live is a journey, not a race', likes: 189, comments: 17, sendings: 4, photo: '' },
  ],
  profile: null,
  status: '',
  errorsData: {},
}

test('Length of new posts array should be incremented after adding post', () => {
   let action = actions.addPost('Hello, it is my first unit test');
   let newState = profileReducer(state, action);
   expect(newState.posts.length).toBe(4);
});

test('Length of new posts array should be decremented after deliting post', () => {
   let action = actions.deletePost(1);
   let newState = profileReducer(state, action);
   expect(newState.posts.length).toBe(2);
});
test('Message of added post should be correct', () => {
   let action = actions.addPost('Hello, it is my first unit test');
   let newState = profileReducer(state, action);
   expect(newState.posts[3].postText).toBe('Hello, it is my first unit test');
});

