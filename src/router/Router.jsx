import React from "react"; // Import React library
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import necessary components from react-router-dom
import Home from "../pages/Home"; // Import Home page component
import Films from "../pages/Films"; // Import Films page component
import Navbar from "../components/Navbar.jsx"; // Import Navbar component
import FilmDetails from "../pages/FilmsDetails.jsx"; // Import FilmDetails page component
import Register from "../pages/Register.jsx"; // Import Register page component
import Login from "../pages/Login.jsx"; // Import Login page component
import Welcome from "../pages/Welcome.jsx"; // Import Welcome page component
import ActorDetails from "../pages/ActorDetails.jsx"; // Import ActorDetails page component
import CreateProfile from "../pages/CreateProfile.jsx"; // Import CreateProfile page component
import ChooseProfile from "../pages/ChooseProfile.jsx"; // Import ChooseProfile page component
import ProfileSettings from "../pages/ProfileSettings.jsx";
import RecommendedDetails from "../pages/RecommendedDetails.jsx";
import ViewDetails from "../pages/ViewDetails.jsx"; // Import ProfileSettings page component
/**
 * AppRouter component handles routing for the entire application.
 * It defines various routes and maps them to specific page components.
 * The Router component manages navigation between different pages, based on the path.
 *
 * @component
 */
const AppRouter = () => (
    <Router>
        {/* Define Routes for the application */}
        <Routes>
            {/* The Welcome page */}
            <Route path="/" element={<Welcome />} />
            {/* The Login page */}
            <Route path="/login" element={<Login />} />
            {/* The Register page */}
            <Route path="/register" element={<Register />} />
            {/* The ChooseProfile page, with a dynamic userId parameter */}
            <Route path="/users/:userId/" element={<ChooseProfile />} />
            {/* The CreateProfile page, with dynamic userId and profileId parameters */}
            <Route path="/users/:userId/profiles/:profileId/createProfiles" element={<CreateProfile />} />
            {/* The Home page, with dynamic userId and profileId parameters */}
            <Route path="/users/:userId/profiles/:profileId/Home" element={<Home />} />
            {/* The Films page, with dynamic userId and profileId parameters */}
            <Route path="/users/:userId/profiles/:profileId/films" element={<Films />} />
            {/* The FilmDetails page, with dynamic userId, profileId, and filmId parameters */}
            <Route path="/users/:userId/profiles/:profileId/films/:filmId" element={<FilmDetails />} />
            {/* The ActorDetails page, with dynamic userId, profileId, filmId, and actorId parameters */}
            <Route path="/users/:userId/profiles/:profileId/films/:filmId/actors/:actorId" element={<ActorDetails />} />
            {/* The ProfileSettings page, with dynamic userId and profileId parameters */}
            <Route path="/users/:userId/profiles/:profileId/profileSettings" element={<ProfileSettings />} />
            <Route path="/users/:userId/profiles/:profileId/views/:filmId" element={<ViewDetails />} />
            <Route path="/users/:userId/profiles/:profileId/recommendeds/:filmId" element={<RecommendedDetails />} />

        </Routes>
    </Router>
);

export default AppRouter;
