import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './Slices'; // ✅ your auth/user slice
import dataReducer from './DataSlice'; // ✅ your data slice (categories/salons)
import cartReducer from './CartSlice';
// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Wrap only the reducers you want persisted
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedDataReducer = persistReducer(
  { key: 'data', storage: AsyncStorage },
  dataReducer,
);
const persistedCartReducer = persistReducer(
  { key: 'cart', storage: AsyncStorage },
  cartReducer,
);

// Create Redux store
export const store = configureStore({
  reducer: {
    user: persistedAuthReducer,
    data: persistedDataReducer,
    cart: persistedCartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);
