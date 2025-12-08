import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onDelete }) => (
    <div className='card'>
        <div className='image-box'>
            <img src={product.imageUrl} alt={product.name} className='product-img'/>
            {product.offerPrice && <span className='badge'>OFFER</span>}
        </div>
        
        <div className='details'>
            <h3>{product.name}</h3>
            
            <div className='price-container'>
                {product.offerPrice ? (
                    <>
                        <span className='original-price'>{product.price}</span>
                        <span className='offer-price'>{product.offerPrice}</span>
                    </>
                ) : (
                    <span className='standard-price'>{product.price}</span>
                )}
            </div>

            {/* Delete Button */}
            <button 
                className='delete-btn'
                onClick={() => onDelete(product.id)}
            >
                Delete Post
            </button>
        </div>
    </div>
);

export default ProductCard;