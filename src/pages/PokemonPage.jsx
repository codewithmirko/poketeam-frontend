import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import styles from "../styles/PokemonPage.module.css";
import Search from "../components/Search";

import { Button } from "@mantine/core";

const PokemonPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
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

  const searchHandler = (string) => {
    setQuery(string.toLowerCase());
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(query)
  );

  const offset = currentPage * perPage;
  const currentPageData = filteredPokemonList.slice(offset, offset + perPage);

  return (
    <>
      <h1>Discover all pokemon</h1>{" "}
      <p>Click on the cards to see more details.</p>
      <div className={styles.searchBar}>
        <Search searchHandler={searchHandler} />
      </div>
      <div className={styles.cardContainer}>
        {currentPageData.map((currentPokemon) => {
          return (
            <div key={currentPokemon.details.id} className={styles.card}>
              <Link to={`/pokemon/${currentPokemon.details.id}`}>
                <img
                  src={currentPokemon.details.sprites.front_default}
                  alt=""
                  className={styles.smallImage}
                />
                <h1>
                  {currentPokemon.name[0].toUpperCase() +
                    currentPokemon.name.slice(1)}
                </h1>
                <p>#{currentPokemon.details.id}</p>
                <div className={styles.pokemonDetails}>
                  <Button
                    variant="filled"
                    color="#2d2c54"
                    radius="xl"
                    className={styles.blackButton}
                  >
                    {currentPokemon.details.height / 10} m
                  </Button>

                  <Button variant="filled" color="#fd5e5c" radius="xl">
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
        pageCount={Math.ceil(filteredPokemonList.length / perPage)}
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
