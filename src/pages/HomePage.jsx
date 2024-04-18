import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";
import { Button } from "@mantine/core";

const HomePage = () => {
  return (
    <>
      <div className={styles.heroContainer}>
        <h1 className={styles.headline}>Welcome to PokéTeam</h1>
        <div>
          <Link to="/pokemon">
            <Button
              variant="filled"
              color="red"
              size="xl"
              radius="lg"
              className="startButton"
            >
              Discover all Pokémon
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
