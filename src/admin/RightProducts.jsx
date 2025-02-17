import './rightProducts.css';
import React, { useState, useRef } from 'react';
import Alert from '@mui/material/Alert';

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
    const [showAlert, setShowAlert] = useState(false);

    // Handle File Selection
    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        
        setFile(selectedFile);

        // Now that file is set, trigger upload
        uploadCloudinary(selectedFile);
    };

    // Upload Image to Cloudinary
    const uploadCloudinary = (selectedFile) => {
        return new Promise((resolve, reject) => {
            if (!selectedFile) {
                console.error("No file selected");
                reject("No file selected");
                return;
            }

            const fileData = new FormData();
            fileData.append("file", selectedFile);
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
                setShowAlert(true);
                console.log("This is the image URL:", item.secure_url);
                resolve(item.secure_url); // Resolve with image URL
            })
            .catch(error => {
                console.error("Error uploading file:", error);
                reject(error);
            });
        });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select an image before submitting.");
            return;
        }

        try {
            const uploadedImageUrl = await uploadCloudinary(file); // Wait for image to upload
            const myFormData = { ...formData, image_url: uploadedImageUrl };

            const response = await fetch('https://sakasgas-backend.onrender.com/adminProducts', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(myFormData),
            });

            if (!response.ok) {
                throw new Error("Error in submitting FormData to the server");
            }

            const data = await response.json();
            console.log("Form submitted successfully:", data);

            // Reset Form
            setFormData({ name: '', description: '', price: '', quantity_available: '' });
            setImageUrl("");
            setFile(null);
        } catch (error) {
            console.error("Error in submitting data:", error);
        }
    };

    // Open File Selector
    const handleButtonClick = () => {
        hiddenInput.current.click();
    };

    return (
        <div className="right-products">
            <div className="right-products-form">
                <span>Add A Product</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" required />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" required />
                    </div>
                    <div>
                        <label htmlFor="quantity_available">Quantity</label>
                        <input type="number" name="quantity_available" value={formData.quantity_available} onChange={(e) => setFormData({ ...formData, quantity_available: e.target.value })} placeholder="Quantity Available" required />
                    </div>
                    <div>
                        {showAlert ? (
                            <Alert variant="filled" severity="success" className='alert'>Image uploaded successfully.</Alert>
                        ) : (
                            <button type="button" onClick={handleButtonClick}>Upload Image</button>
                        )}
                        <input type="file" className="hidden_field" name="file" onChange={handleFileUpload} style={{ display: 'none' }} ref={hiddenInput} />
                        <button type="submit">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RightProducts;
