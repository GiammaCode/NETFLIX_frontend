import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Films from "../pages/Films";
import Navbar from "../components/Navbar.jsx";

const AppRouter = () => (
    <Router>
        {/* Navbar */}
        <Navbar />

        {/* Rotte */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
        </Routes>
    </Router>
);

export default AppRouter;
