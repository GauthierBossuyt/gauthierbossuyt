import { useState } from "react";

export default function Login(props) {
  const [username, setUsername] = useState({ value: "" });
  const [password, setPassword] = useState({ value: "" });

  const login = (e) => {
    e.preventDefault();
    props.login(username.value, password.value);
  };

  const handleChange = (e) => {
    if (e.target.id === "username") {
      setUsername({ value: e.target.value });
    } else if (e.target.id === "password") {
      console.log(e.target.value);
      setPassword({ value: e.target.value });
    }
  };

  return (
    <div className="admin_form">
      <form className="admin_login" onSubmit={login}>
        <h1>ADMIN LOGIN</h1>
        <h1 id="error">{props.error}</h1>
        <input
          type="text"
          id="username"
          name="username"
          placeholder={username.value}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder={password.value}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
