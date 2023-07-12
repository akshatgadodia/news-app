import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import NavigationBar from "./common/components/NavigationBar";
import RegistrationPage from "./pages/registrationPage/RegistrationPage";
import AppContext from "./context/AppContext";
import HomePage from "./pages/homePage/HomePage";
import LanguageSelector from "./common/components/LanguageSelector";
import AdminPage from "./pages/adminPage/AdminPage";

const Main = () => {
  const { dispatch, loggedInDetails } = useContext(AppContext);
  useEffect(() => {
    const setData = async () => {
      const loginData = JSON.parse(localStorage.getItem("NW_UserDetails"));
      if (loginData) {
        dispatch({
          type: "UserLogin",
          payload: loginData,
        });
      }
    };
    setData();
  }, []);
  return (
    <>
      <NavigationBar />
      {loggedInDetails.isLoggedIn ? (<LanguageSelector/>) : (null)}
      
      <Routes>
        <Route
          path="/sign-in"
          element={loggedInDetails.isLoggedIn ? (<Navigate replace to={"/"} />) : (<LoginPage />)}
        />
        <Route path="/sign-up" element={loggedInDetails.isLoggedIn ? (<Navigate replace to={"/"} />) : (<RegistrationPage />)} />
        <Route path="/" element={!loggedInDetails.isLoggedIn ? (<Navigate replace to={"/sign-in"} />) : (<HomePage />)} />
        <Route path="/admin" element={loggedInDetails.role !== 9878 ? (<Navigate replace to={"/"} />) : (<AdminPage />)} />
      </Routes>
    </>
  );
};

export default Main;
