import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './reducers/items';
import navReducer from './reducers/nav';
import searchReducer from './reducers/search';

export default configureStore({
    reducer: {
        items: itemReducer,
        nav: navReducer,
        search: searchReducer
    }
});