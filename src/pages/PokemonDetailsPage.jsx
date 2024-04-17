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

  const navigate = useNavigate();

  const handleAddToTeam = async (event) => {
    event.preventDefault();
    const payload = {
      id: singlePokemon.id,
      image: singlePokemon.sprites?.front_default,
      name: singlePokemon.name,
      height: singlePokemon.height,
      weight: singlePokemon.weight,
      types: singlePokemon.types.map((type) => type.type.name),
      stats: singlePokemon.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
      })),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        navigate(`/team`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1> Details Page</h1>
      <h2>{singlePokemon.name}</h2>
      <img
        src={singlePokemon.sprites?.front_default}
        alt=""
        className="detail-img"
      />
      <p>#{singlePokemon.id}</p>
      <p>{singlePokemon.height / 10} m</p>
      <p>{singlePokemon.weight / 10} kg</p>
      {/* Check if singlePokemon.types exists and is an array */}
      {singlePokemon.types && Array.isArray(singlePokemon.types) && (
        <div>
          {/* Loop over the types array and render each type name */}
          {singlePokemon.types.map((type, index) => (
            <p key={index}>{type.type.name}</p>
          ))}

          {/* Check if singlePokemon.stats exists and is an array */}
          {singlePokemon.stats && Array.isArray(singlePokemon.stats) && (
            <div>
              {/* Loop over the stats array and render each stat */}
              {singlePokemon.stats.map((stat, index) => (
                <p key={index}>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
      <button type="button" onClick={handleAddToTeam}>
        Add to team
      </button>
    </>
  );
};

export default PokemonDetailsPage;
