import React, { useState } from 'react'; 
import './Navbar.css';

const Navbar = ({ onAddProduct }) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [showForm, setShowForm] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        brand: '',
        category: 'Shirts',
        price: '',
        offerPrice: '',
        image: null
    });

    // New State for Instagram Option
    const [postToInstagram, setPostToInstagram] = useState(false);

    const ADMIN_PASSWORD = "302010"; 

    const handleNewPostClick = () => {
        setIsOpen(false); 
        const password = window.prompt("Enter Admin Password:");
        if (password === ADMIN_PASSWORD) {
            setShowForm(true); 
        } else if (password !== null) {
            alert("Incorrect Password!");
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: imageUrl });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newProduct = {
            id: Date.now(),
            name: formData.brand,
            category: formData.category,
            price: `₹${formData.price}`,
            offerPrice: formData.offerPrice ? `₹${formData.offerPrice}` : null,
            imageUrl: formData.image
        };

        // Pass product AND the Instagram choice to App.jsx
        onAddProduct(newProduct, postToInstagram);

        // Reset Form
        setFormData({ brand: '', category: 'Shirts', price: '', offerPrice: '', image: null });
        setPostToInstagram(false); // Reset checkbox
        setShowForm(false);
    };

    return (
        <>
            <nav className='navbar'>
                <div className='logo'>Prabha Fashion</div>
                
                <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <a href='#shirts' onClick={() => setIsOpen(false)}>Shirts</a>
                    <a href='#pants' onClick={() => setIsOpen(false)}>Pants</a>
                    
                    {/* --- FIXED LINK HERE (lowercase) --- */}
                    <a href='#t-shirts' onClick={() => setIsOpen(false)}>T-Shirts</a>
                    
                    {/* New Link for Footer Section */}
                    <a href='#footer' onClick={() => setIsOpen(false)}>Contact</a>
                    
                    <button className='add-post-btn' onClick={handleNewPostClick}>
                        + NEW POST
                    </button>
                </div>

                <div className='menu-toggle' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? '✕' : '☰'}
                </div>
            </nav>

            {/* Modal Form */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Product</h3>
                        <form onSubmit={handleSubmit}>
                            
                            <label>Brand Name</label>
                            <input type="text" required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="e.g. Zara"/>

                            <label>Category</label>
                            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="Shirts">Shirts</option>
                                <option value="Pants">Pants</option>
                                <option value="T-Shirts">T-Shirts</option>
                            </select>

                            <label>Original Price (₹)</label>
                            <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="1000"/>

                            <label>Offer Price (Optional)</label>
                            <input type="number" value={formData.offerPrice} onChange={e => setFormData({...formData, offerPrice: e.target.value})} placeholder="800"/>

                            <label>Product Image</label>
                            <input type="file" accept="image/*" required onChange={handleImageChange} className="file-input"/>

                            {/* --- INSTAGRAM OPTION --- */}
                            <div className="insta-option">
                                <input 
                                    type="checkbox" 
                                    id="instaCheck"
                                    checked={postToInstagram}
                                    onChange={(e) => setPostToInstagram(e.target.checked)}
                                />
                                <label htmlFor="instaCheck" style={{cursor: 'pointer', color: '#E1306C'}}>
                                    Update on Instagram also? 📸
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-btn">Publish</button>
                                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;