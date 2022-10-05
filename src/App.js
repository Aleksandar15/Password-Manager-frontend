import "./App.css";
import { Fragment } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import NavBar from "./components/NavBar/NavBar";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Manager from "./components/manager/Manager";

const App = () => {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <div className="container">
          {/* Public routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<PersistLogin />}>
              <Route path="/manager" element={<Manager />} />
            </Route>

            {/* Not found route */}
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
};
export default App;
