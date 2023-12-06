import { Tuple, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";
import { pokemonApi } from "./services/pokemon.services";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import logger, { createLogger } from "redux-logger";
import ReduxLogger from "redux-logger";

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.APP_NODE !== "PROD",
  middleware: (getDefaultMiddleware) => {
    let middleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(pokemonApi.middleware);
    return middleware;
  },
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

const { dispatch } = store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistor, dispatch, useAppDispatch, useAppSelector };
export type { RootState, AppDispatch };
