import { useState, useEffect } from "react";

const TeamPage = () => {
  // store info in useState
  const [info, setInfo] = useState([]);

  //define function to get Data from fake backend localhost4000
  const getInfo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
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

  return <h1>Team Page</h1>;
};

export default TeamPage;
