import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdminLoginPage.css';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.username === 'admin' && formData.password === 'password') {
            alert('Authentification réussie !');
            navigate('/admin');
        } else {
            setError('Nom d’utilisateur ou mot de passe incorrect.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">LOGIN</h2>
                <p className="signup-text">
                    Ne pas avoir de compte ? <a href="/signup" className="signup-link">Sign up</a>
                </p>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-text">{error}</div>}
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Email"
                            className="form-input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de pass"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group stay-connected">
                        <input type="checkbox" id="stay-connected" />
                        <label htmlFor="stay-connected">Rester Connecter</label>
                    </div>
                    <button type="submit" className="submit-button">
                        Connecter
                    </button>
                </form>
                <p className="forgot-password">
                    <a href="/forgot-password">Mot de passe oublier ?</a>
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
