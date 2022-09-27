export const ADD_POST = 'ADD_POST';
export const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';

const profileReducer = (state, action) => {
    switch(action.type){
        case ADD_POST:
            let newPost = {
                id: 5,
                postText: state.newPostText,
                likes: 20,
                comments: 2,
                photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'
            }
            state.posts.push(newPost);
            return state;
        case UPDATE_POST_TEXT:
            state.newPostText = action.postText;
            return state;
        default: 
            return state;
    }
}

export default profileReducer;

export const addPostAC = () => ({type: ADD_POST});
export const updatePostTextAC = (postText) => ({type: UPDATE_POST_TEXT, postText});