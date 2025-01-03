import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Recommended from "../pages/Recommended";
import Navbar from "../components/Navbar";

const AppRouter = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recommended" element={<Recommended />} />
        </Routes>
    </Router>
);

export default AppRouter;
