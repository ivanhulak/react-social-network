let rerenderEntireTree = () => {
    console.log('State changed');
}

const state = {
    profilePage: {
        posts: [
            { id: 1, postText: 'Hello! It is Ivan Hulak!', likes: 20, comments: 2, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
            { id: 2, postText: 'New Post', likes: 12, comments: 1, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
            { id: 3, postText: 'React app', likes: 1, comments: 5, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        ],
        newPostText: 'Ivan',
    },
    dialogsPageData: {
        dialogs: [
            { id: 1, name: 'Kristina', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
            { id: 2, name: 'Kevin', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
            { id: 3, name: 'Travis', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
            { id: 4, name: 'Andrew', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
            { id: 5, name: 'Sveta', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        ],
        messages: [
            { id: 1, message: 'Hello!' },
            { id: 2, message: 'How are you doing?' },
            { id: 3, message: 'magic?' },
            { id: 4, message: 'Hello!' },
            { id: 5, message: 'Yo' },
        ],
    }
}

export default state;

export const addPost = (post) => {
    let newPost = {
        id: 5,
        postText: post,
        likes: 20,
        comments: 2,
        photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'
    }
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export const updatePostText = (postText) => {
    state.profilePage.newPostText = postText;
    rerenderEntireTree(state);
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
}

window.state = state;
