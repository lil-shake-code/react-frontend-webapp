import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard/:uid" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
