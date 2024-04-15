const LogInPage = () => {
  return (
    <>
      <h1>Login</h1>
      <h2>Login Form</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default LogInPage;
