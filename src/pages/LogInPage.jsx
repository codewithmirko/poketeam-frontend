import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LogInPage.module.css";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      if (response.ok) {
        const usersData = await response.json();
        const user = usersData.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          // Successful login, navigate to team page
          navigate(`/team`);
        } else {
          // Incorrect credentials, display an error alert
          alert("Invalid email or password. Please try again.");
        }
      } else {
        // Handle HTTP error responses
        alert("Failed to fetch user data. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      // Handle other errors
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h1 className={styles.test}>Login</h1>
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default LogInPage;
