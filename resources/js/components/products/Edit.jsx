import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const Edit = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [photo, setPhoto] = useState(null)
    const [quantity, setQuantity] = useState('')
    const [avatar, setAvatar] = useState(true)

    

    useEffect(() =>{
        getProduct()
    },[])

    const getProduct = async () => {
        await axios.get(`/api/get_edit_product/${id}`)
        .then(({data})=> {
            const { name, description, photo, type, quantity, price } = data.product
            setName(name)
            setDescription(description)
            setPrice(price)
            setType(type)
            setPhoto(photo)
            setQuantity(quantity)
        })
        .catch(({response:{data}})=>{

        })
        // const data = await response.json()

    }

    const ourImage = () => {
        return '/upload/'+img
    }

    const changeHandler = (e) => {
        let file = e.target.files[0]
        let limit = 1024*1024*2
        if (file['size'] > limit) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'File size should be less than 2MB',
                footer:'Why do I have this issue ?'
            })
        }else{
            let reader = new FileReader()
            reader.onload =e =>{
                setAvatar(false)
                setPhoto(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const updateProduct = async() => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('type', type)
        formData.append('photo', photo)
        formData.append('quantity', quantity)

        await axios.post(`/api/update_product/${id}`, formData)
        .then((data)=>{
            toast.fire({
                icon:'success',
                title:'Product updated successfully'
            })
            navigate('/')
        })
        .catch((error)=>{
            
        })
    }

  return (
    <div className='container'>
        <div className="product_edit">
            <div className="titlebar">
                <div className="titlebar_item">
                    <h1>Edit Product</h1>
                </div>
                <div className="titlebar_item">
                    <button className="btn" onClick={(e)=>updateProduct(e)}>
                        Save
                    </button>
                </div>
            </div>

            <div className="card_wrapper">
                <div className="wrapper_left">
                    <div className="card">
                        <p>Name</p>
                        <input type="text" value={name} onChange={(e)=> {setName(e.target.value)}} />
                        <p>Description (Optional) </p>
                        <textarea  cols="10" rows="5" value={description} onChange={(e)=> {setName(e.target.value)}} ></textarea>
                        <div className="media">
                            <ul className="images_list">
                                <li className="image_item">
                                    <div className="image_item-img">
                                        {
                                            avatar === true
                                            ?<img src={ourImage(photo)} width='117px' height='100px' />
                                            :<img src={photo} width='117px' height='100px' />
                                        }
                                    </div>
                                </li>
                                <li className="image_item">
                                    <form action="" className="image_item-form">
                                        <label htmlFor="" className="image_item-form--label">Add Image</label>
                                        <input type="file" className="image_item-form--input" onChange={changeHandler} />
                                    </form>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="wrapper_right">
                    <div className="card">
                        <p>Product Type</p>
                        <input type="text" value={type}  onChange={(e)=> {setName(e.target.value)}}/>

                        <hr className="hr" />
                        <p>Inventory</p>
                        <input type="text" value={quantity} onChange={(e)=> {setName(e.target.value)}} />

                        <hr className="hr" />
                        <p>Price</p>
                        <input type="text" value={price} onChange={(e)=> {setName(e.target.value)}} />
                        <div className="br" ></div>
                    </div>
                </div>
            </div>

            <div className="titlebar">
                <div className="titlebar_item">
                </div>
                <div className="titlebar_item">
                    <button className="btn" onClick={(e)=>updateProduct(e)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Edit