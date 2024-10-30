import './rightProducts.css';
import React, { useState, useRef } from 'react';

function RightProducts() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity_available: '',
    });
    
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const hiddenInput = useRef(null);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadCloudinary = () => {
        if (!file) {
            console.error("No file selected");
            return;
        }

        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append("upload_preset", "my_new_preset");
        fileData.append("cloud_name", "dcimswibl");

        fetch("https://api.cloudinary.com/v1_1/dcimswibl/image/upload", {
            method: "POST",
            body: fileData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Cannot upload file");
            }
            return response.json();
        })
        .then((item) => {
            setImageUrl(item.secure_url);
            console.log("This is the image url:", item.secure_url);
        })
        .catch(error => {
            console.error("Error uploading file:", error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const myFormData = { ...formData, image_url: imageUrl };

        fetch('https://bonmaj-backend.onrender.com/adminProducts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myFormData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error in submitting FormData to the server");
            }
            return response.json();
        })
        .then((data) => {
            console.log("This is my formData:", data);
            // Optionally, reset the form
            setFormData({
                name: '',
                description: '',
                price: '',
                quantity_available: '',
            });
            setImageUrl("");
            setFile(null);
        })
        .catch(error => {
            console.error("Error in submitting data:", error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleButtonClick = () => {
        hiddenInput.current.click(); // Programmatically click the hidden input
        uploadCloudinary(); // Call the upload function after clicking
    };

    return (
        <div className="right-products">
            <div className="right-products-form">
                <span>Add A Product</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                    </div>
                    <div>
                        <label htmlFor="quantity_available">Quantity</label>
                        <input type="number" name="quantity_available" value={formData.quantity_available} onChange={handleChange} placeholder="Quantity Available" required />
                    </div>
                    <div>
                        <button type="button" onClick={handleButtonClick}>Upload File</button>
                        <input type='file' className='hidden_field' name='file' onChange={handleFileUpload} style={{ display: 'none' }} ref={hiddenInput} />
                        <button type="submit">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RightProducts;
