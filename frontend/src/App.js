import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminHome from './pages/AdminHome'
import AdminAccountsPage from './pages/AdminAccountsPage'
import SignupPage from './pages/SignupPage'
import ClientPage from './pages/ClientPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AddProductPage from './pages/AddProductPage'
import ProductList from './components/ProductListComponent'
import EditProductPage from './pages/EditProductPage'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/login' element={<AdminLoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/client' element={<ClientPage />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/admin/add-product' element={<AddProductPage />} />
        <Route path='/admin/accounts' element={<AdminAccountsPage />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/edit-product' element={<EditProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
