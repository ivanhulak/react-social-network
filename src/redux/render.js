import React from 'react';
import ReactDOM from 'react-dom/client';
import './../index.css';
import App from './../App';
import { addPost, updatePostText } from './state';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderEntireTree = (importedFromReduxState) => {
    root.render(
        <React.StrictMode>
            <App state={importedFromReduxState} addPost={addPost} updatePostText={updatePostText} />
        </React.StrictMode>
    );
}