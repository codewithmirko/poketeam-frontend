import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PokemonPage = () => {
  // Declare a variable to store dynamic data and setter function to update it
  const [pokemonList, setPokemonList] = useState([]);

  // Declare the getAllPokemon function that gets the data from the API
  const getAllPokemon = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
      if (response.ok) {
        const data = await response.json();
        const pokemonWithDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            if (detailResponse.ok) {
              const detailData = await detailResponse.json();
              return { ...pokemon, details: detailData };
            } else {
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
          })
        );
        setPokemonList(pokemonWithDetails);
        console.log(pokemonWithDetails);
      }
    } catch (error) {
      console.log("Error fetching the API", error);
    }
  };

  // Run useEffect to run a function (the getAllPokemon function) one time at the start
  useEffect(() => {
    getAllPokemon();
  }, []);

  // Return the actual page below

  return (
    <>
      <h1>I am the Pokemon Page</h1>;
      {/* Loop over the array of objects [{}, {}, ..] and create list elements, names etc for each of the objects */}
      {pokemonList.map((currentPokemon) => {
        return (
          <div key={currentPokemon.details.id}>
            <Link to={`/pokemon/${currentPokemon.details.id}`}>
              <img src={currentPokemon.details.sprites.front_default} alt="" />
              <h1>{currentPokemon.name}</h1>
              <p>{currentPokemon.details.id}</p>
              <p>{currentPokemon.details.height}</p>
              <p>{currentPokemon.details.weight}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default PokemonPage;
