import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import styles from "../styles/PokemonPage.module.css";

import { Button } from "@mantine/core";

const PokemonPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 20; // Number of Pokemon to display per page

  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
        );
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
        }
      } catch (error) {
        console.log("Error fetching the API", error);
      }
    };
    getAllPokemon();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const currentPageData = pokemonList.slice(offset, offset + perPage);

  return (
    <>
      <h1>I am the Pokemon Page</h1>{" "}
      <p>Click on the Pokemon Cards if you want to see more details!</p>
      <div className={styles.cardContainer}>
        {currentPageData.map((currentPokemon) => {
          return (
            <div key={currentPokemon.details.id} className={styles.card}>
              <Link to={`/pokemon/${currentPokemon.details.id}`}>
                <img
                  src={currentPokemon.details.sprites.front_default}
                  alt=""
                />
                <h1>
                  {currentPokemon.name[0].toUpperCase() +
                    currentPokemon.name.slice(1)}
                </h1>
                <p>#{currentPokemon.details.id}</p>
                <div className={styles.pokemonDetails}>
                  <Button
                    variant="filled"
                    color="#000000ff"
                    radius="xl"
                    className={styles.blackButton}
                  >
                    {currentPokemon.details.height / 10} m
                  </Button>

                  <Button variant="filled" color="red" radius="xl">
                    {currentPokemon.details.weight / 10} kg
                  </Button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* Pagination component */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(pokemonList.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default PokemonPage;
