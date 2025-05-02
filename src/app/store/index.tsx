import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import themeConfigSlice from '../../_theme/themeConfigSlice';

export const getState = () => store.getState();

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

setupListeners(store.dispatch);

export type IRootState = ReturnType<typeof rootReducer>;
export type IAppDispatch = typeof store.dispatch;
export default store;
