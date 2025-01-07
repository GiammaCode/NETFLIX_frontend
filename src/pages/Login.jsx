import React, { useState } from 'react';
import { getUser } from "../services/useService.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("luca@pas");
    const [password, setPassword] = useState("pass");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Per il reindirizzamento

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene il ricaricamento della pagina

        try {
            // Ottieni gli utenti dal database
            const users = await getUser();

            // Variabile per tracciare se l'utente è stato trovato
            let userFound = false;

            // Confronta i dati del form con quelli degli utenti nel database
            users.forEach((user) => {
                if (user.email === email && user.password === password) {
                    userFound = true; // L'utente è stato trovato
                    navigate(`/users/${user.userId}`); // Reindirizza alla homepage

                }
            });

            if (userFound) {
                alert("Login riuscito!");
            } else {
                setError("Credenziali non valide."); // Mostra un messaggio di errore
            }
        } catch (err) {
            console.error("Errore durante il login:", err);
            setError("Si è verificato un errore durante il login.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Sign In</h1>
                {/* Usa onSubmit direttamente nel form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-danger w-100">
                        Sign In
                    </button>
                </form>
                {/* Mostra un messaggio di errore se necessario */}
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
