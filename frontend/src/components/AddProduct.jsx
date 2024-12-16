import React from 'react';

const AddProduct = ({
    product,
    handleChange,
    handleSubmit,
    successMessage,
    errorMessage,
}) => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h2>Ajouter un Produit</h2>
                        </div>
                        <div className="card-body">
                            {successMessage && (
                                <div className="alert alert-success">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger">{errorMessage}</div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Nom du Produit
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={product.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">
                                        Prix
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        value={product.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        rows="4"
                                        value={product.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary w-50">
                                        Ajouter le Produit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
