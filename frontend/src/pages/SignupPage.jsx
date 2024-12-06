import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nom) newErrors.nom = 'Nom est requis.';
        if (!formData.prenom) newErrors.prenom = 'Prénom est requis.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide.';
        if (!formData.tel || !/^\d{10}$/.test(formData.tel)) newErrors.tel = 'Numéro de téléphone invalide.';
        if (!formData.password) newErrors.password = 'Mot de passe est requis.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        if (!acceptedTerms) newErrors.terms = 'Vous devez accepter les termes et conditions.';

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
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2 className="text-center mb-4">Sign up</h2>
                <p className="text-start">
                    Vous avez déjà un compte ?{' '}
                    <a href="/login" className="login-link">
                        Login
                    </a>
                </p>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder='Nom'
                            name="nom"
                            className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                            value={formData.nom}
                            onChange={handleChange}
                        />
                        {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder='Prenom'
                            name="prenom"
                            className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                        {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="email"
                            placeholder='Email'
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder='Telehone'
                            name="tel"
                            className={`form-control ${errors.tel ? 'is-invalid' : ''}`}
                            value={formData.tel}
                            onChange={handleChange}
                        />
                        {errors.tel && <div className="invalid-feedback">{errors.tel}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="password"
                            placeholder='Mot de passe'
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="col-md-6">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder='Confirmer le mot de passe'
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                </div>

                <div className="mb-3">
                    <div className="form-check">
                        <input
                            className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                            type="checkbox"
                            id="terms"
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="terms">
                            J’accepte les termes et conditions du site web et la politique de confidentialité
                        </label>
                        {errors.terms && <div className="invalid-feedback d-block">{errors.terms}</div>}
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-50">
                        Créer un compte
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;