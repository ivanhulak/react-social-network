import { addPost, deletePost } from "./profile-reducer";
import profileReducer from "./profile-reducer";

let state = {
   posts: [
      { id: 1, postText: 'Hello! It is Ivan Hulak!', likes: 20, comments: 2, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 2, postText: 'New Post', likes: 12, comments: 1, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 3, postText: 'React app', likes: 1, comments: 5, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
   ]
}

test('Length of new posts array should be incremented after adding post', () => {
   let action = addPost('Hello, it is my first unit test');
   let newState = profileReducer(state, action);
   expect(newState.posts.length).toBe(4);
});

test('Length of new posts array should be decremented after deliting post', () => {
   let action = deletePost(1);
   let newState = profileReducer(state, action);
   expect(newState.posts.length).toBe(2);
});
test('Message of added post should be correct', () => {
   let action = addPost('Hello, it is my first unit test');
   let newState = profileReducer(state, action);
   expect(newState.posts[3].postText).toBe('Hello, it is my first unit test');
});

