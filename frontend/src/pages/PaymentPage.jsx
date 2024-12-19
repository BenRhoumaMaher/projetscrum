import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { totalPrice } = location.state || { totalPrice: 0 };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, amount: totalPrice }),
            });

            const data = await response.json();
            if (data.success) {
                navigate('/interface-banque', { state: { invoiceId: data.invoiceId } });
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage('Erreur lors du traitement du paiement.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Paiement</h2>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="p-4 border rounded">
                <div className="mb-3">
                    <label className="form-label">Numéro de Carte</label>
                    <input
                        type="text"
                        name="cardNumber"
                        className="form-control"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date d'Expiration</label>
                    <input
                        type="text"
                        name="expiry"
                        className="form-control"
                        value={formData.expiry}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">CVV</label>
                    <input
                        type="password"
                        name="cvv"
                        className="form-control"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Confirmer le Paiement
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;