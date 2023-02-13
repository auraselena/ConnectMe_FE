import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import { Footer } from "./components/Footer";
import { Landing } from "./pages/Landing";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Confirmation from "./pages/Confirmation";
import InputPassword from "./pages/InputPassword";
import Detail from "./pages/Detail";
import DisplayInfo from "./pages/DisplayInfo";
import CreatePost from "./pages/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./actions/usersAction";
import { API_url } from "./helper";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Verification } from "./pages/Verification";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";

function App(props) {
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);

  const { username } = useSelector((state) => {
    return {
      username: state.usersReducer.username,
    };
  });

  const [loading, setLoading] = React.useState(true);

  const keepLogin = () => {
    let getLocalStorage = localStorage.getItem("socmed_login");
    console.log(getLocalStorage);
    if (getLocalStorage) {
      Axios.get(API_url + `/users/keepLogin`, {
        headers: {
          Authorization: `Bearer ${getLocalStorage}`,
        },
      })
        .then((response) => {
          dispatch(loginAction(response.data));
          setLoading(false);
          localStorage.setItem("socmed_login", response.data.token);
        })
        .catch((error) => {
          alert("Terjadi kesalahan di server");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [show]);

  return (
    <div className="App">
      <Navbar loading={loading} />
      <Routes>
        { !show ? null : username ? (
          <>
            <Route path="/landing" element=<Landing /> />
            <Route path="/profile" element=<Profile /> />
            <Route path="/detail" element=<Detail /> />
            <Route path="/displayinfo" element=<DisplayInfo /> />
            <Route path="/createpost" element=<CreatePost /> />
          </>
        ) : (
          <>
            <Route path="/register" element=<Register /> />
            <Route path="/login" element=<Login /> />
          </>
        )}
        <Route path="/inputpassword" element=<InputPassword /> />
        <Route path="/confirmation" element=<Confirmation /> />
        <Route path="/" element=<Dashboard /> />
        <Route path="/verification" element=<Verification /> />
        <Route path="*" element=<NotFound /> />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
