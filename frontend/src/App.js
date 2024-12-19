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
import CataloguePage from './pages/CataloguePage'
import ClientLoginPage from './pages/ClientLoginPage'
import PanierPage from './pages/PanierPage'
import BankingInterfacePage from './pages/BankingInterfacePage'
import FacturePage from './pages/facture'
import OrdersPage from './pages/OrdersPage'

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
        <Route path='/' element={<CataloguePage />} />
        <Route path='/client/login' element={<ClientLoginPage />} />
        <Route path='/panier' element={<PanierPage />} />
        <Route path='/interface-banque' element={<BankingInterfacePage />} />
        <Route path='/facture' element={<FacturePage />} />
        <Route path='/admin/orders' element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
