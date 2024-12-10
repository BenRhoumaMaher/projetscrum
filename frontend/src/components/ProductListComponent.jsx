import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        navigate('/edit-product', { state: { product } });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setProducts(products.filter((product) => product._id !== id));
                } else {
                    setErrorMessage('Erreur lors de la suppression du produit.');
                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                setErrorMessage('Une erreur est produite.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Liste des Produits</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price} Dt</td>
                            <td>{product.description}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleEdit(product)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;