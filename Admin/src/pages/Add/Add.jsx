import React, { useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {

    // const url = "http://localhost:4000" ;

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "North-Indian" 
        // default category is salad here
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // to prevent the webpage from being reloaded

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price)); // we have stored price as string but in backend DB we have stored it as number therefore we have externally convertecd it into number
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData); 
        // we have used 'axios' to send our data to endpoint that we created in our backend folder , which will then push it to our DB , hence we placed our http://localhost:4000/api/food/add 

        if (response.data.success) {
            toast.success(response.data.message)
            // if it is success we have reset the field values 
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category
            })
            // if it is success we have reset the image value 
            setImage(false);
        }
        else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    //we made this on change handler function to manage the changes occured during the event 

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>

                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>

                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />

                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>

                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} 
                    type="text" placeholder='Type here' required />
                </div>

                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>

                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product Category</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="North-Indian">North-Indian</option>
                            <option value="South-Indian">South-Indian</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Continental">Continental</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Deserts">Deserts</option>
                        </select>
                    </div>

                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>

                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
