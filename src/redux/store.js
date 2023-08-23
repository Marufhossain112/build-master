import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './api/api';
import productReducer from './product/productReducer';
// Persist configuration for the regular Redux store
const reduxPersistConfig = {
    key: 'root', // Change this key if needed
    storage,
};
const rootReducer = productReducer;
// Create the persisted reducer for the regular Redux store
const persistedReducer = persistReducer(reduxPersistConfig, rootReducer);
const store = configureStore({
    reducer: { persistedReducer, [api.reducerPath]: api.reducer, },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
// Persist the store
const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export { store, persistor };
