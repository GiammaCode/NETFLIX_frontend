import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Films from "../pages/Films";

const AppRouter = () => (
    <Router>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link> {/* Collegamento alla homepage */}
                </li>
                <li>
                    <Link to="/films">Films</Link> {/* Collegamento alla pagina Films */}
                </li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
        </Routes>
    </Router>
);

export default AppRouter;
