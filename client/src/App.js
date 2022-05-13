import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(
    "BQB3erNzMVf-rU_TkFALowGTN-ZaagQ6N_6UnP-h3iKutijeDGIezV23PsFWgPmgEP-hzWIUdTuhGJ80PcnnxJLITGQMEUi9_y9NlJhZd4b57310d81XQ4sQ5G-OW4aLR4klI0bcWNgT78tpplT1gLPgW4HfX7_yiMr3LZPU7rivayKB"
  );
  const [user, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = " ";
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
    }
  }, [dispatch]);

  console.log("User: ", user);
  console.log("Token: ", token);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
