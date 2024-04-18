import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../styles/PokemonDetailsPage.module.css";
import { Button } from "@mantine/core";

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
      <div className={styles.bigCardContainer}>
        <div className={styles.bigCard}>
          <img
            src={singlePokemon.sprites?.front_default}
            alt=""
            className="detail-img"
          />
          <h2>
            {singlePokemon.name &&
              singlePokemon.name[0].toUpperCase() + singlePokemon.name.slice(1)}
          </h2>
          <p>#{singlePokemon.id}</p>
          <div class={styles.sizeContainer}>
            <Button
              variant="filled"
              color="#2d2c54"
              radius="xl"
              className={styles.blackButton}
            >
              {singlePokemon.height / 10} m
            </Button>
            <Button variant="filled" color="#fd5e5c" radius="xl">
              {singlePokemon.weight / 10} kg
            </Button>
          </div>
          {/* Check if singlePokemon.types exists and is an array */}
          {singlePokemon.types && Array.isArray(singlePokemon.types) && (
            <div class={styles.typesContainer}>
              {/* Loop over the types array and render each type name */}
              {singlePokemon.types.map((type, index) => (
                <Button
                  key={index}
                  variant="filled"
                  color="rgba(158, 158, 158, 1)"
                  radius="xl"
                >
                  {type.type.name.toUpperCase()}
                </Button>
              ))}
            </div>
          )}
          {/* Check if singlePokemon.stats exists and is an array */}
          {singlePokemon.stats && Array.isArray(singlePokemon.stats) && (
            <div class={styles.statsContainer}>
              {/* Loop over the stats array and render each stat */}
              {singlePokemon.stats.map((stat, index) => (
                <p key={index} className={styles.stats}>
                  {stat.stat.name.toUpperCase()}: {stat.base_stat}
                </p>
              ))}
            </div>
          )}

          <Button
            type="button"
            onClick={handleAddToTeam}
            variant="filled"
            color="teal"
            size="md"
            radius="md"
          >
            Add to team
          </Button>
        </div>
      </div>
    </>
  );
};

export default PokemonDetailsPage;
