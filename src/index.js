import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import StoreContext from './StoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (importedStateFromRedux) => {
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <StoreContext.Provider value={store}>
          <App />
        </StoreContext.Provider>
      </React.StrictMode>
    </BrowserRouter>
  );
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});

reportWebVitals();
