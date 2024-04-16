import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const TeamPage = () => {
  // store info in useState
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  //define function to get Data from fake backend localhost4000
  const getInfo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/team`);
      if (response.ok) {
        const infoData = await response.json();
        setInfo(infoData);
        console.log(infoData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // run useEffect to run function at mounting time

  useEffect(() => {
    getInfo();
  }, []);

  // const handleDelete = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/team/${id}`, {
  //       method: "DELETE",
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       navigate("/team");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <h1>Team Page</h1>
      {info.map((currentInfo) => {
        return (
          <div key={currentInfo.id}>
            <Link to="/">
              <h1>{currentInfo.id}</h1>
            </Link>
            {/* <button onClick={handleDelete}>Delete</button> */}
          </div>
        );
      })}
    </>
  );
};

export default TeamPage;
