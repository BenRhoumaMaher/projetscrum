import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CataloguePage = ({ loggedInUser }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
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

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        Catalogue
                    </a>
                    <div className="collapse navbar-collapse">
                        <form className="d-flex ms-auto me-auto">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Rechercher un produit..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>
                        <button
                            className="btn btn-primary me-3"
                            onClick={() => navigate('/panier')}
                        >
                            Voir Panier
                        </button>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {loggedInUser?.name || 'Utilisateur'}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => navigate('/client')}
                                    >
                                        Mon Profil
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <h2 className="text-center mb-4">Catalogue des Produits</h2>
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
        </div>
    );
};

export default CataloguePage;
