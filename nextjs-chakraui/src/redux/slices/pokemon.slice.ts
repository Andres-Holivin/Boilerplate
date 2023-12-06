import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

let initState: { data: any[] } = {
  data: [],
};
export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initState,
  reducers: {
    addPokemon: (state, action) => {
      let data = [...state.data, action.payload];
      state.data = data;
    },
  },
});

export const { addPokemon } = pokemonSlice.actions;
export const getPokemon = (state: RootState) => state.pokemon.data;
export default pokemonSlice.reducer;
