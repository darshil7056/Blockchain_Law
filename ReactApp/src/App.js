import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Police } from "./pages/Police";
import Home from "./pages/Home";
import { Lawyer } from "./pages/lawyer";
import { Citizen } from "./pages/Citizen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/police" element={<Police></Police>}></Route>

          <Route path="/citizen" element={<Citizen></Citizen>}></Route>
          <Route path="/lawyer" element={<Lawyer></Lawyer>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
