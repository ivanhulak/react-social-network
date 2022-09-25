import reportWebVitals from './reportWebVitals';
import {rerenderEntireTree} from './redux/render';
import {state} from './redux/state';

rerenderEntireTree(state);

reportWebVitals();
