import { useState } from 'react';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const login = async response => {
    setIsLoggedIn(true);
    setUser(response.profileObj);
    const token = response.getAuthResponse().id_token;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const res = await ((await fetch(`${process.env.ENDPOINT}/get-userdata`, options)).json());
    setUser({...response.profileObj, username: res.data.username, token});
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser({});
    // and remove access token here
  }

  return {isLoggedIn, user, login, logout};
}

export {
  useAuth
}