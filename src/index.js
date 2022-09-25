import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import state, { addPost, updatePostText, subscribe } from './redux/state';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (importedStateFromRedux) => {
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <App state={importedStateFromRedux} addPost={addPost} updatePostText={updatePostText} />
      </React.StrictMode>
    </BrowserRouter>
  );
}

rerenderEntireTree(state);

subscribe(rerenderEntireTree);

reportWebVitals();
