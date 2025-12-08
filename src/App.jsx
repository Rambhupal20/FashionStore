import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProductCard from './components/ProductCard/ProductCard';

const App = () => {
    // 1. MASTER STATE
    const [products, setProducts] = useState([
        { id: 1, name: 'USPA', category: 'Shirts', price: '₹599', imageUrl: 'https://via.placeholder.com/250?text=Shirt' },
        { id: 2, name: 'DIESEL', category: 'Pants', price: '₹799', imageUrl: 'https://via.placeholder.com/250?text=Pant' },
        { id: 3, name: 'POLO', category: 'T-Shirts', price: '₹499', imageUrl: 'https://via.placeholder.com/250?text=T-Shirt' },
        { id: 4, name: 'LEVIS', category: 'Pants', price: '₹1200', offerPrice: '₹999', imageUrl: 'https://via.placeholder.com/250?text=Levis' },
    ]);

    const ADMIN_PASSWORD = "12345";

    // ---------------------------------------------------------
    // INSTAGRAM CONFIGURATION
    // ---------------------------------------------------------
    // You must replace these with your actual keys from Facebook Developers
    const INSTAGRAM_ID = "YOUR_INSTAGRAM_BUSINESS_ID"; 
    const ACCESS_TOKEN = "YOUR_LONG_LIVED_ACCESS_TOKEN"; 

    // ---------------------------------------------------------
    // THE ADD PRODUCT FUNCTION (With Instagram Logic)
    // ---------------------------------------------------------
    const handleAddProduct = async (newProduct, postToInstagram) => {
        // A. Update Website State (Immediate)
        setProducts([newProduct, ...products]);

        // B. Check if user selected "Yes" for Instagram
        if (postToInstagram) {
            
            // --- START INSTAGRAM UPLOAD LOGIC ---
            try {
                // NOTE: Instagram API requires a PUBLIC image URL (e.g., from a server/cloud).
                // It cannot read 'blob:http://localhost...' URLs directly from your computer.
                // For this code to work, 'imageUrlToSend' must be a link accessible on the internet.
                const imageUrlToSend = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600"; 
                
                const caption = `${newProduct.name} - Only ${newProduct.price}!\nCategory: ${newProduct.category}\n\n#Fashion #NewArrival`;

                // STEP 1: Create Media Container
                const containerUrl = `https://graph.facebook.com/v18.0/${INSTAGRAM_ID}/media?image_url=${imageUrlToSend}&caption=${caption}&access_token=${ACCESS_TOKEN}`;
                
                const containerRes = await fetch(containerUrl, { method: "POST" });
                const containerData = await containerRes.json();

                if (containerData.id) {
                    const creationId = containerData.id;

                    // STEP 2: Publish the Container
                    const publishUrl = `https://graph.facebook.com/v18.0/${INSTAGRAM_ID}/media_publish?creation_id=${creationId}&access_token=${ACCESS_TOKEN}`;
                    await fetch(publishUrl, { method: "POST" });

                    alert(`✅ Posted to Website & Instagram Successfully!`);
                } else {
                    console.error("IG Error:", containerData);
                    alert("Website updated, but Instagram failed. Check Console (F12) for details.");
                }

            } catch (error) {
                console.error("Network Error:", error);
                alert("Failed to connect to Instagram.");
            }
            // --- END INSTAGRAM UPLOAD LOGIC ---

        } else {
            alert(`✅ Post Created on Website Only.`);
        }
    };

    // ---------------------------------------------------------
    // DELETE FUNCTION
    // ---------------------------------------------------------
    const handleDelete = (id) => {
        const password = window.prompt("Enter Admin Password to delete:");
        if (password === ADMIN_PASSWORD) {
            setProducts(products.filter(p => p.id !== id));
        } else if (password !== null) {
            alert("Wrong Password! Delete cancelled.");
        }
    };

    // Helper to render sections
    const renderSection = (title, categoryId) => {
        const categoryProducts = products.filter(p => p.category === categoryId);
        return (
            <div id={categoryId.toLowerCase()} className='section'>
                <h2 className='section-title'>{title} COLLECTION</h2>
                <div className='grid'>
                    {categoryProducts.length > 0 ? (
                        categoryProducts.map(p => (
                            <ProductCard key={p.id} product={p} onDelete={handleDelete} />
                        ))
                    ) : (
                        <p className='empty-msg'>No items available in {title}.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="app-container">
            <Navbar onAddProduct={handleAddProduct} />
            
            <div className="content">
                {renderSection('SHIRTS', 'Shirts')}
                {renderSection('PANTS', 'Pants')}
                {renderSection('T-SHIRTS', 'T-Shirts')}
            </div>

            {/* --- FOOTER SECTION --- */}
            <footer id="footer" className="footer-section">
                <div className="footer-content">
                    
                    {/* About Founder */}
                    <div className="footer-column">
                        <h3>About Founder</h3>
                        <p>
                            <strong>Prabha Reddy</strong> is a fashion enthusiast dedicated to bringing the best quality clothing to Anantapur. 
                            With a passion for style and comfort, he curated this collection to make premium fashion accessible to everyone.
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div className="footer-column">
                        <h3>Contact Us</h3>
                        <p><i className="fa-solid fa-location-dot"></i> Anantapur, Andhra Pradesh</p>
                        <p><i className="fa-solid fa-phone"></i> +91 0000000000</p>
                        <p><i className="fa-solid fa-envelope"></i> contact@fashionhub.com</p>
                        
                        {/* ICONS CONTAINER */}
                        <div className="social-icons">
                            
                            {/* Instagram */}
                            <a href="" target="_blank" rel="noreferrer" className="icon-box insta">
                                <i className="fa-brands fa-instagram"></i>
                            </a>

                            {/* WhatsApp */}
                            <a href="" target="_blank" rel="noreferrer" className="icon-box whatsapp">
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>

                            {/* Google Maps */}
                            <a href="" target="_blank" rel="noreferrer" className="icon-box maps">
                                <i className="fa-solid fa-map-location-dot"></i>
                            </a>

                        </div>
                    </div>

                </div>
                <div className="footer-bottom">
                    <p>© 2024 FashionHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;