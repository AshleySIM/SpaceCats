import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const { productId } = useParams();

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product.name}</h2>
      {product.image && <img src={product.image} alt={product.name} />}
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductDetail;
