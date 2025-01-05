import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="mb-4">Welcome to Netflix</h1>
                <p className="lead mb-4">Enjoy unlimited films, TV shows, and more.</p>
                <div>
                    <button
                        className="btn btn-danger btn-lg me-3"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </button>
                    <button
                        className="btn btn-outline-danger btn-lg"
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
