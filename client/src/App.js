import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ImageSearch from "./components/ImageSearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<ImageSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
