import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BankingInterfacePage = () => {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { invoiceId } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invoiceId, password }),
            });

            const data = await response.json();
            if (data.success) {
                navigate('/facture', { state: { invoice: data.invoice } });
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage('Erreur lors de la vérification du paiement.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Interface Bancaire</h2>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="p-4 border rounded">
                <div className="mb-3">
                    <label className="form-label">Mot de Passe Bancaire</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">
                    Vérifier
                </button>
            </form>
        </div>
    );
};

export default BankingInterfacePage;