import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './reducers/items';

export default configureStore({
    reducer: {
        items: itemReducer
    }
})