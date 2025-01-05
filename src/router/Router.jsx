import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Films from "../pages/Films";
import Navbar from "../components/Navbar.jsx";
import FilmDetails from "../pages/FilmsDetails.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Welcome from "../pages/Welcome.jsx";
import '../styles/resister&login.css';


const AppRouter = () => (
    <Router>
        {/* Navbar */}
        <Navbar />

        {/* Rotte */}
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/*<Route path="/" element={<Home />} />*/}
            {/*<Route path="/films" element={<Films />} />*/}
            {/*<Route path="/films/:filmId" element={<FilmDetails />} /> */}
        </Routes>
    </Router>
);

export default AppRouter;
