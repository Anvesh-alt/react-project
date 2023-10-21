
import './ProductDetails.css'
import React from 'react';

function ProductDetails({ product, onClose }) {
  return (
    <div className="product-details">
        <div className='prodt'> 
          <h1>{product.title}</h1>
          <button onClick={onClose} className='btn btn-dark'>X</button>
        </div>
      <div className="image-carousel">
        {product.images.map((image, index) => (
          <img className='image' key={index} src={image} alt={`Product ${index}`} />
        ))}
      </div>
      <p className='priceContt'>Price: ${product.price}</p>
      <p className='priceContt'>Rating: {product.rating}</p>
      <p className='discripp'>{product.description}</p>
    </div>
  );
}

export default ProductDetails;
