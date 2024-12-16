import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProductPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [product, setProduct] = useState(state.product);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                setSuccessMessage('Produit modifié avec succès.');
                setTimeout(() => navigate('/products'), 2000);
            } else {
                setErrorMessage('Erreur lors de la modification du produit.');
            }
        } catch (error) {
            setErrorMessage('Une erreur s\'est produite.');
            console.error('Erreur lors de la modification:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Modifier le Produit</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nom du Produit</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Modifier le Produit
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;