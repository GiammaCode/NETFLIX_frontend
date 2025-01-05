import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/Router"; // Importa il router
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/resister&login.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);
