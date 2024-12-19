import React, { useState, useEffect } from 'react'

const PanierPage = () => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du panier')
        }
        const data = await response.json()
        setCart(data)
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [])

  const handleCancelCart = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler votre commande ?'))
      return

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error("Erreur lors de l'annulation du panier")
      }
      setCart([])
      setSuccessMessage('Votre panier a été annulé avec succès.')
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de l'annulation du panier."
      )
    }
  }

  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0)

  if (loading) {
    return <p className='text-center'>Chargement du panier...</p>
  }

  if (errorMessage) {
    return <p className='text-center text-danger'>{errorMessage}</p>
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Mon Panier</h2>
      {successMessage && (
        <p className='text-center text-success'>{successMessage}</p>
      )}
      {cart.length === 0 ? (
        <p className='text-center'>Votre panier est vide.</p>
      ) : (
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price} Dt</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className='text-end'>
            Prix Total: <span>{totalPrice} Dt</span>
          </h4>
          <div className='text-center mt-4'>
            <button className='btn btn-danger' onClick={handleCancelCart}>
              Annuler la commande
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PanierPage
