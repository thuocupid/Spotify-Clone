import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState('BQBlOyxpJyUfYuezj7DB5vKfEqROdpgXVE3k6tJ9BLjFp5V9XWCQNS3SCHhpqfLamc0iwoapstBRbtyoEWNfs8deS3ZSUDycsjj5ahMNTAktXRjq7-Vhh_yYkAE9xvDR4SS7r3lsdDpxc4wwbhUF_speQRpm2QIbikewEqfzz6sp3cog');
  const [user,  dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = " ";
    const _token = hash.access_token;

    console.log("This is the hash: ", hash);
    console.log('This is the access Token: ', _token)

    try {
      if (_token) {

        setToken(_token)

        spotify.setAccessToken(_token);

        // dispatch({
        //   type: 'SET_TOKEN',
        //   token: _token,
        // });

        spotify.getMe().then((user) => {
          dispatch({
            type: "SET_USER",
            user: user,
          });
        });

        spotify.getUserPlaylists().then((playlist) => {
          dispatch({
            type: "SET_PLAYLIST",
            playlist: playlist,
          });
        });
      }
    } catch (error) {
      if (error) {
        console.log('Error occured in dispatch: ', error)
      }
    }
  }, [ dispatch]);

  console.log("User: ", user);
  console.log("Token: ", token);

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
