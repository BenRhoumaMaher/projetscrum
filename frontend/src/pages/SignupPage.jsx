import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        fullName: '',
        phone: '',
        address: '',
        city: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Nom d’utilisateur est requis.';
        if (!formData.password) newErrors.password = 'Mot de passe est requis.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide.';
        if (!formData.fullName) newErrors.fullName = 'Nom complet est requis.';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Numéro de téléphone invalide.';
        if (!formData.address) newErrors.address = 'Adresse est requise.';
        if (!formData.city) newErrors.city = 'Ville est requise.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post('http://localhost:5000/api/signup', formData);
            alert('Compte créé avec succès !');
            navigate('/client');
        } catch (error) {
            console.error('Erreur lors de l’inscription :', error);
            alert('Échec de l’inscription. Veuillez réessayer.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Inscription</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded">
                <div className="row mb-3">
                    {/* Nom d'utilisateur */}
                    <div className="col-md-6">
                        <label className="form-label">Nom d’utilisateur</label>
                        <input
                            type="text"
                            name="username"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    {/* Mot de passe */}
                    <div className="col-md-6">
                        <label className="form-label">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Confirmation de mot de passe */}
                    <div className="col-md-6">
                        <label className="form-label">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                    {/* Email */}
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Nom complet */}
                    <div className="col-md-6">
                        <label className="form-label">Nom complet</label>
                        <input
                            type="text"
                            name="fullName"
                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>
                    {/* Téléphone */}
                    <div className="col-md-6">
                        <label className="form-label">Téléphone</label>
                        <input
                            type="text"
                            name="phone"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Adresse */}
                    <div className="col-md-6">
                        <label className="form-label">Adresse</label>
                        <input
                            type="text"
                            name="address"
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                    {/* Ville */}
                    <div className="col-md-6">
                        <label className="form-label">Ville</label>
                        <input
                            type="text"
                            name="city"
                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-25">
                    S’inscrire
                </button>
            </form>
        </div>
    );
};

export default SignupPage;