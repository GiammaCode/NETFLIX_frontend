import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Films from "../pages/Films";
import Navbar from "../components/Navbar.jsx";
import FilmDetails from "../pages/FilmsDetails.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Welcome from "../pages/Welcome.jsx";
import ActorDetails from "../pages/ActorDetails.jsx";
import CreateProfile from "../pages/CreateProfile.jsx";
import ChooseProfile from "../pages/ChooseProfile.jsx";
import ProfileSettings from "../pages/ProfileSettings.jsx";


const AppRouter = () => (
    <Router>
        {/* Routes */}
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/:userId/" element={<ChooseProfile />} />
            <Route path="/users/:userId/profiles/:profileId/createProfiles" element={<CreateProfile />} />
            <Route path="/users/:userId/profiles/:profileId/Home" element={<Home />} />
            <Route path="/users/:userId/profiles/:profileId/films" element={<Films />} />
            <Route path="/users/:userId/profiles/:profileId/films/:filmId" element={<FilmDetails />} />
            <Route path="/users/:userId/profiles/:profileId/films/:filmId/actors/:actorId" element={<ActorDetails />} />
            <Route path="/users/:userId/profiles/:profileId/profileSettings" element={<ProfileSettings />} />
        </Routes>
    </Router>
);

export default AppRouter;
