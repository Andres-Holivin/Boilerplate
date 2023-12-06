"use client"

import { useGetPokemonByNameQuery } from "@/redux/services/pokemon.services";
import { addPokemon, getPokemon } from "@/redux/slices/pokemon.slice";
import { useAppDispatch } from "@/redux/store";
import { Box, Button } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function GetPokemon({ id }: { id: number }) {
    const { data, error, isLoading, isFetching, refetch, } = useGetPokemonByNameQuery(id);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error:</p>;

    return (
        <div>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
            <h3>{data.species.name}</h3>
            <button onClick={refetch} disabled={isFetching}>{isFetching ? 'Fetching...' : 'Refetch'}</button>
        </div>
    );
}
export default function Page() {
    const pokemon = useSelector(getPokemon)
    const dispatch = useAppDispatch();
    return (
        <Box>
            <Button onClick={() => dispatch(addPokemon(Math.floor(Math.random() * 10)))}>count+1</Button>
            {
                pokemon.map((v: any, i: number) => {
                    return <GetPokemon key={i} id={v} />
                })
            }
        </Box>
    )
}