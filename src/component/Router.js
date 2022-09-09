import { authService } from "fbase";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import { Navigation } from "./Navigation";

function Router() {
  const [init, setInit] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLogIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      <BrowserRouter>
        {isLogIn && <Navigation userObj={userObj} />}
        <Routes>
          <Route
            path="/"
            element={
              init ? (
                isLogIn ? (
                  <Home userObj={userObj} />
                ) : (
                  <Auth />
                )
              ) : (
                <span>Loading...</span>
              )
            }
          />
          <Route
            path="/profile"
            element={<Profile userObj={userObj} refreshUser={refreshUser} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
