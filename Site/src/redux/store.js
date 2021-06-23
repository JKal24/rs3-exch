import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './reducers/items';
import navReducer from './reducers/nav';

export default configureStore({
    reducer: {
        items: itemReducer,
        nav: navReducer
    }
})