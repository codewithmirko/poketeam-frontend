import { useEffect } from "react";
import { useState } from "react";

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);

  const getAllPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
      if (response.ok) {
        const pokemonData = await response.json();
        console.log(pokemonData);
        setPokemon(pokemonData.results);
      }
    } catch (error) {
      console.log("Error fetching the API", error);
    }
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  // Array = [{}, {}]

  // axios, fetch

  // useState

  // useEffect  (function() , [])

  // As soon as the page loads, do the function that request the information from the API. And then store it in a variable. (and then later display it)

  return (
    <>
      <h1>I am the Pokemon Page</h1>;
      {pokemon.map((currentPokemon) => {
        return <h1>hello</h1>;
      })}
    </>
  );
};

export default PokemonPage;
