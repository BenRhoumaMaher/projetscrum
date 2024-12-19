import React, { useState, useEffect } from 'react';

const CataloguePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <p className="text-center">Chargement du catalogue...</p>;
    }

    if (errorMessage) {
        return <p className="text-center text-danger">{errorMessage}</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Catalogue des Produits</h2>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">
                                    <strong>Prix: </strong>
                                    {product.price} Dt
                                </p>
                                <p className="card-text">
                                    <strong>Description: </strong>
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CataloguePage;