import React, { useState } from 'react'
import axios from 'axios'
import AddProduct from '../components/AddProduct'

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: ''
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:5000/api/products',
        product
      )
      setSuccessMessage('Produit ajouté avec succès !')
      setErrorMessage('')
      setProduct({
        name: '',
        price: '',
        description: ''
      })
    } catch (error) {
      setErrorMessage('Erreur lors de l’ajout du produit. Veuillez réessayer.')
      setSuccessMessage('')
      console.error('Error:', error)
    }
  }

  return (
    <AddProduct
      product={product}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  )
}

export default AddProductPage
