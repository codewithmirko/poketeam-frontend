import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const TeamPage = () => {
  // store info in useState
  const [team, setTeam] = useState([]);
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

  const handleEdit = async (id) => {
    const payload = { nickName: s };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/team/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        navigate(`/team/${projectId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Team Page</h1>
      {team.map((currentTeam) => {
        return (
          <div key={currentTeam.id}>
            <Link to="/">
              <img src={currentTeam.image} alt={currentTeam.name} />
              <h1>{currentTeam.id}</h1>
              <p>{currentTeam.name}</p>
              <p>{currentTeam.height}</p>
              <p>{currentTeam.weight}</p>

              <p>
                Types:{" "}
                {currentTeam.types.map((type, index) => (
                  <span key={index}>{type}</span>
                ))}
              </p>

              {/* Display stats */}
              <div>
                Stats:
                {currentTeam.stats.map((stat, index) => (
                  <p key={index}>
                    {stat.name}: {stat.base_stat}
                  </p>
                ))}
              </div>
            </Link>
            <button type="button" onClick={() => handleDelete(currentTeam.id)}>
              Delete
            </button>
            <button type="button" onClick={() => handleEdit(currentTeam.id)}>
              Edit
            </button>
          </div>
        );
      })}
    </>
  );
};

export default TeamPage;
