import { useState } from 'react';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const login = (response) => {
    setIsLoggedIn(true);
    setUser(response.profileObj);
    // I guess Ill have to add access token here
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