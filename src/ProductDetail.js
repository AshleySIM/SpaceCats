import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  auth,
  bookmarks,
  createBookmark,
  deleteBookmark,
}) => {
  const { productId } = useParams();

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const cartItem = cartItems.find(
    (lineItem) => lineItem.product_id === productId
  );
  const bookmark = bookmarks.find(
    (bookmark) => bookmark.product_id === productId
  );

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product.name}</h2>
      {product.image && <img src={product.image} alt={product.name} />}
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="btnDiv">
        {auth.id ? (
          cartItem ? (
            <button onClick={() => updateLineItem(cartItem)} className="btn">
              Add Another
            </button>
          ) : (
            <button onClick={() => createLineItem(product)} className="btn">
              Add to cart
            </button>
          )
        ) : null}
        <br></br>
        {auth.id ? (
          bookmark ? (
            <button onClick={() => deleteBookmark(bookmark)} className="btn">
              Remove Bookmark
            </button>
          ) : (
            <button onClick={() => createBookmark(product)} className="btn">
              Bookmark
            </button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetail;
