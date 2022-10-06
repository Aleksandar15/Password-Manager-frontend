import "./App.css";
import { Fragment, Suspense, lazy } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import NavBar from "./components/NavBar/NavBar";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const App = () => {
  const FallbackManager = lazy(() => import("./components/manager/Manager"));
  const FallbackLogin = lazy(() => import("./components/Login"));
  const FallbackRegister = lazy(() => import("./components/Register"));
  const FallbackHomepage = lazy(() => import("./components/HomePage"));

  return (
    <Fragment>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense
                  fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}
                >
                  <FallbackHomepage />
                </Suspense>
              }
            />

            <Route
              path="/login"
              element={
                <Suspense
                  fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}
                >
                  <FallbackLogin />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense
                  fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}
                >
                  <FallbackRegister />
                </Suspense>
              }
            />
            <Route
              path="/manager"
              element={
                <Suspense
                  fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}
                >
                  <FallbackManager />
                </Suspense>
              }
            />
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
};
export default App;
