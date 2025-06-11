import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage, ProductsList, ProductsDetails, Login, Register, CartPage, OrderPage, DashboardPage, PageNotFound } from '../pages'
import { ProtectedRoute } from './ProtectedRoute'



export const AllRoutes = () => {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductsDetails />} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/order" element={<OrderPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </>
  )
}


