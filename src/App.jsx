import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const Stopwatch = React.lazy(() => import("./stopwatch"));
  const Home = React.lazy(() => import("./home"));
  const ControlTechniques = React.lazy(() => import("./ControlTechniques"));
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading ..... home</div>}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="/stopwatch"
              element={
                <Suspense fallback={<div>laoding ... blyat</div>}>
                  <Stopwatch />
                </Suspense>
              }
            />
            <Route
              path="/control techniques"
              element={
                <Suspense fallback={<div>laoding ... blyat</div>}>
                  <ControlTechniques />
                </Suspense>
              }
            />
            <Route path="*" element={<div>not found blyat</div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
