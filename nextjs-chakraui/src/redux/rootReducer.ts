import { combineReducers } from "redux";

import { pokemonApi } from "./services/pokemon.services";
import pokemonReducer from "./slices/pokemon.slice";
import storage from "./reduxStorage";
import { persistReducer } from "redux-persist";

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["pokemon"],
};
const rootReducer = combineReducers({
  pokemon:  pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export default persistReducer(rootPersistConfig,rootReducer);
