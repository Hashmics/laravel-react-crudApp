import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from '../components/NotFound'
import EditProduct from '../components/products/Edit';
import Products from '../components/products/Products'
import NewProduct from './../components/products/NewProduct';

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Products/>}/>
            <Route path='/product/newproduct' element={<NewProduct/>}/>
            <Route path='/product/edit/:id' element={<EditProduct/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  )
}

export default Router