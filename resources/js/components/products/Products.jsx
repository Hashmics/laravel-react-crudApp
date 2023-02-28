import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Products = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const newProduct = () => {
    navigate('/product/newproduct')
  }

  useEffect(() => {
    getProducts()
  },[])



  const getProducts = async () => {
    await axios.get('/api/get_all_product')
      .then(({data}) => {
        setProducts(data.products)
      })
  }

  const editProduct = (id) => {
    navigate('/product/edit/'+id)

  }

  const deleteProduct = async(id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
        if(result.isConfirmed){
          axios.get('/api/delete_product/'+id)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
            'success'
            )
            getProducts()
          })
          .catch(()=>{

          })
          
        }
      })
  }

  return (
    <div className='container'>
      <div className="products_list">
        <div className="titlebar">
          <div className="titlebar_item">
            <h1>Products</h1>
          </div>
          <div className="titlebar_item">
            <div className="btn" onClick={() => newProduct()}>
              Add Products
            </div>
          </div>
        </div>
        <div className="table">
          <div className="list_header">
            <p>Image</p>
            <p>Product</p>
            <p>Type</p>
            <p>Inventory</p>
            <p>Actions</p>
          </div>
          {
            products.length > 0 && (
              products.map((item, key) => (
                <div className="list_items" key={key}>
                  <img src={`/upload/${item.photo}`} height='40px' />
                  <a>{item.name}</a>
                  <p>{item.type}</p>
                  <p>{item.quantity}</p>
                  <div>
                    <button className='btn-icon success' onClick={()=>editProduct(item.id)}>
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className='btn-icon danger'  onClick={()=>deleteProduct(item.id)} >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Products