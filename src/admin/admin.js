import { useState } from "react";
import Login from "./login";
import Dashboard from "./dashboard";

export default function App() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setLogStatus] = useState(false);

  const checkCredentials = async (username, password) => {
    fetch(
      `https://gauthierbossuyt-api.herokuapp.com/login?username=${username}&password=${password}`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.ERROR) {
          setError(resp.ERROR);
        } else if (resp.code) {
          setCode(resp.code);
          setLogStatus(true);
        }
      });
  };

  return (
    <div className="admin">
      {isLogged ? (
        <Dashboard code={code} />
      ) : (
        <Login login={checkCredentials} error={error} />
      )}
    </div>
  );
}
