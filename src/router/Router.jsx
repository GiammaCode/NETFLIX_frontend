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
import ActorDetails from "../pages/ActorDetails.jsx";
import Profile from "../pages/ChooseProfile.jsx";
import CreateProfile from "../pages/CreateProfile.jsx";


const AppRouter = () => (
    <Router>
        {/* Routes */}
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/:userId/" element={<Profile />} />
            <Route path="/users/:userId/profiles/:profileId/createProfiles" element={<CreateProfile />} />
            <Route path="/users/:userId/profiles/:profileId/Home" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/films/:filmId" element={<FilmDetails />} />
            <Route path="/actors/:actorId" element={<ActorDetails />} />
        </Routes>
    </Router>
);

export default AppRouter;
