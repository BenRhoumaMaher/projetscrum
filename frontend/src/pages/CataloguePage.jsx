import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CataloguePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(loggedIn);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    if (loading) {
        return <p className="text-center">Chargement du catalogue...</p>;
    }

    if (errorMessage) {
        return <p className="text-center text-danger">{errorMessage}</p>;
    }

    if (!isAuthenticated) {
        return (
            <div className="container mt-5 text-center">
                <p>Vous devez vous connecter pour consulter le catalogue.</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/login')}
                >
                    Connexion
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Catalogue des Produits</h2>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher un produit par nom..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
                    ))
                ) : (
                    <p className="text-center">Aucun produit trouvé</p>
                )}
            </div>
        </div>
    );
};

export default CataloguePage;