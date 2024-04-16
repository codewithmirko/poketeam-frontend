import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const PokemonDetailsPage = () => {
  const [singlePokemon, setSinglePokemon] = useState({});
  const { id } = useParams();

  const getSinglePokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (response.ok) {
        const singlePokemonData = await response.json();
        setSinglePokemon(singlePokemonData);
        console.log(singlePokemonData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePokemon();
  }, []);

  return (
    <>
      <h1> Details Page</h1>
      <p>{singlePokemon.name}</p>
      <img src={singlePokemon.sprites?.front_default} alt="" />
    </>
  );
};

export default PokemonDetailsPage;
