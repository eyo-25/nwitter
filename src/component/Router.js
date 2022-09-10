import { authService } from "fbase";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

function Router() {
  const [init, setInit] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
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
        setUserObj(null);
        setIsLogIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLogIn && <Navigation userObj={userObj} />}
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
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
        </div>
      </BrowserRouter>
    </>
  );
}

export default Router;
