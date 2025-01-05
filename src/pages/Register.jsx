import React, { useState } from 'react';
import { postUser } from "../services/useService.js";

const Register = () => {
    const [formData, setFormData] = useState({
        userId: 5,
        name: 'giammo', // Deve corrispondere a "name" nel form
        surname: 'gianmarini', // Deve corrispondere a "surname" nel form
        password: 'mare',
        email: 'mare@pascara',
        date_of_birth: '', // Deve corrispondere a "date_of_birth" nel form
        paymentMethod: '', // Deve corrispondere a "paymentMethod" nel form
        profiles: '1'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value })); // Aggiorna dinamicamente lo stato
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Previene il ricaricamento della pagina
        console.log('Registration:', formData);

        try {
            await postUser(formData); // Invia i dati al backend
            alert('Registration successful!');
        } catch (error) {
            //console.error("Error during registration:", error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Sign Up</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name" // Deve corrispondere a "name" in formData
                            className="form-control"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname" // Deve corrispondere a "surname" in formData
                            className="form-control"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email" // Deve corrispondere a "email" in formData
                            className="form-control"
                            value={formData.email}
                            onChange={handleInputChange}
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
                            name="password" // Deve corrispondere a "password" in formData
                            className="form-control"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date_of_birth" className="form-label">
                            Birth Date
                        </label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth" // Deve corrispondere a "date_of_birth" in formData
                            className="form-control"
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paymentMethod" className="form-label">
                            Payment Method
                        </label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod" // Deve corrispondere a "paymentMethod" in formData
                            className="form-select"
                            value={formData.paymentMethod}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-danger w-100">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
