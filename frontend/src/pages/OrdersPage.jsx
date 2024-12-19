import React, { useEffect, useState } from 'react'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders')
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        setErrorMessage('Erreur lors du chargement des commandes.')
      }
    }

    fetchOrders()
  }, [])

  const handleAction = async (orderId, action) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/${action}`,
        {
          method: 'PATCH'
        }
      )

      const data = await response.json()
      if (data.success) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: data.newStatus } : order
          )
        )
      } else {
        setErrorMessage('Impossible de mettre à jour la commande.')
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la mise à jour de la commande.')
    }
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Gestion des Commandes</h2>
      {errorMessage && (
        <p className='text-danger text-center'>{errorMessage}</p>
      )}
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.clientName}</td>
              <td>{order.totalAmount} Dt</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'en attente' && (
                  <>
                    <button
                      className='btn btn-success btn-sm me-2'
                      onClick={() => handleAction(order._id, 'validate')}
                    >
                      Valider
                    </button>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handleAction(order._id, 'cancel')}
                    >
                      Annuler
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage
