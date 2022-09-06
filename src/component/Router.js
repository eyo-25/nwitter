import { authService } from "fbase";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function Router() {
  const [init, setInit] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            init ? isLogIn ? <Home /> : <Auth /> : <span>Loading...</span>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
