import { auth } from "./api/firebase";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./components/auth/Auth";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { Home } from "./components/Home/Home";
import { Navigation } from "./components/Navigation";
import { ClientPanel } from "./components/ClientPanel";
import { Dog } from "./components/Dog";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { TypesProvider } from "./context/TypesContext";
import { Menu } from "./components/Menu";
import { BallTriangle } from "react-loader-spinner";
import { Box } from "@mui/material";

export const App = () => {
  // const [dogId, setDogId] = useState(null);
  const [user, setUser] = useState(null);
  const isAuth = !!user;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //setIsAuth(true);
        setUser(user);
      } else {
        //setIsAuth(false);
        setUser(null);
      }
    });
  }, []);

  if (isAuth === null) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#c94016"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </Box>
    );
  }

  return (
    <TypesProvider>
      <BrowserRouter>
        <Menu>
          <Navigation isAuth={isAuth} email={user?.email} />
        </Menu>
        <Routes>
          <Route path="/" element={<Home email={user?.email} />} />
          <Route
            path="auth"
            element={isAuth ? <Navigate to="/clientPanel" /> : <Auth />}
          >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route
            path="clientPanel"
            element={
              !isAuth ? (
                <Navigate to="/auth/login" />
              ) : (
                <ClientPanel email={user?.email} />
              )
            }
          ></Route>
          <Route path="home/:id" element={<Dog email={user?.email} />} />
        </Routes>
      </BrowserRouter>
    </TypesProvider>
  );
};
