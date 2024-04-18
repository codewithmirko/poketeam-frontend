import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/TeamPage.module.css";
import { Button } from "@mantine/core";

const TeamPage = () => {
  // store info in useState
  const [team, setTeam] = useState([]);
  const [nickname, setNickname] = useState("");
  const [editingPokemonId, setEditingPokemonId] = useState(null); // Initialize editingPokemonId state
  const navigate = useNavigate();

  //define function to get Data from fake backend localhost4000
  const getTeam = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/team`);
      if (response.ok) {
        const teamData = await response.json();
        setTeam(teamData);
        console.log(teamData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // run useEffect to run function at mounting time

  useEffect(() => {
    getTeam();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/team/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if (response.ok) {
        setTeam((prevTeam) => prevTeam.filter((pokemon) => pokemon.id !== id));
        navigate("/team");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    // Set the editingPokemonId state to the ID of the Pokemon being edited
    setEditingPokemonId(id);
  };

  const handleEditSubmit = async () => {
    const editedPokemon = team.find(
      (pokemon) => pokemon.id === editingPokemonId
    );
    if (!editedPokemon) return;

    // Add other Stuff here
    const payload = {
      nickname,
      id: editedPokemon.id,
      name: editedPokemon.name,
      height: editedPokemon.height,
      weight: editedPokemon.weight,
      image: editedPokemon.image,
      types: editedPokemon.types,
      stats: editedPokemon.stats,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/team/${editingPokemonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        // Update the nickname for the edited pokemon in the team state
        setTeam((prevTeam) =>
          prevTeam.map((pokemon) =>
            pokemon.id === editingPokemonId ? { ...pokemon, nickname } : pokemon
          )
        );

        // Clear the nickname input field
        setNickname("");

        // Clear the editingPokemonId state
        setEditingPokemonId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <h1>Team Page</h1>
      <div className={styles.bigCardContainer}>
        {team.map((currentTeam) => {
          return (
            <div key={currentTeam.id}>
              <div className={styles.bigCard}>
                <img src={currentTeam.image} alt={currentTeam.name} />
                <h1>
                  {currentTeam.name[0].toUpperCase() +
                    currentTeam.name.slice(1)}
                </h1>
                <div className={styles.sizeContainer}>
                  <Button
                    variant="filled"
                    color="#2d2c54"
                    radius="xl"
                    className={styles.blackButton}
                  >
                    {currentTeam.height / 10} m
                  </Button>
                  <Button variant="filled" color="#fd5e5c" radius="xl">
                    {currentTeam.weight / 10} kg
                  </Button>
                </div>
                <div className={styles.sizeContainer}>
                  <p>
                    {" "}
                    {currentTeam.types.map((type, index) => (
                      <Button
                        key={index}
                        variant="filled"
                        color="rgba(158, 158, 158, 1)"
                        radius="xl"
                      >
                        {" "}
                        {type}
                      </Button>
                    ))}
                  </p>
                </div>
                <div className={styles.statsContainer}>
                  {currentTeam.stats.map((stat, index) => (
                    <p key={index} className={styles.stats}>
                      {stat.name.toUpperCase()}: {stat.base_stat}
                    </p>
                  ))}
                </div>
                {/* Display nickname if it exists */}
                {currentTeam.nickname && (
                  <p>Nickname: {currentTeam.nickname}</p>
                )}

                <Button
                  variant="filled"
                  color="red"
                  size="md"
                  radius="md"
                  type="button"
                  onClick={() => handleDelete(currentTeam.id)}
                >
                  Delete
                </Button>

                <Button
                  type="button"
                  onClick={() => handleEdit(currentTeam.id)}
                  variant="filled"
                  color="yellow"
                  size="md"
                  radius="lg"
                >
                  Edit
                </Button>

                {currentTeam.id === editingPokemonId && (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter nickname"
                      value={nickname}
                      onChange={handleChange}
                    />
                    <button onClick={handleEditSubmit}>Submit</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeamPage;
