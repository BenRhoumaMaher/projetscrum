import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Connexion Administrateur</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label className="form-label">Nom d’utilisateur</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-25">
                    Connexion
                </button>
            </form>
        </div>
    );
};

export default AdminLoginPage;