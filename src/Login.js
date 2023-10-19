import React, { useState } from "react";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const _login = async (ev) => {
    ev.preventDefault();
    try {
      await login({ username, password });
    } catch (ex) {
      window.alert("incorrect username and/or password");
    }
  };
  return (
    <form onSubmit={_login}>
      <input
        className="commentBox"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        className="commentBox"
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button disabled={!username || !password}>Login</button>
    </form>
  );
};

export default Login;
