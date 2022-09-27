import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/state';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (importedStateFromRedux) => {
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <App state={importedStateFromRedux} dispatch={store.dispatch.bind(store)} />
      </React.StrictMode>
    </BrowserRouter>
  );
}

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);

reportWebVitals();
