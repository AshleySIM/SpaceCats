import React from "react";
import { Link } from "react-router-dom";

const Products = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  auth,
  bookmarks,
  createBookmark,
  deleteBookmark,
  bookmark
}) => {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => {
          const cartItem = cartItems.find(
            (lineItem) => lineItem.product_id === product.id
          );
          const bookmark = bookmarks.find(
            (bookmark) => bookmark.product_id === product.id
          );
          return (
            <li key={product.id}>
            
              {product.name}${product.price}
              {product.description}
              {
                product.image ? <img src={ product.image } /> : null
              }
              {auth.id ? (
                cartItem ? (
                  <button onClick={() => updateLineItem(cartItem)}>
                    Add Another
                  </button>
                ) : (
                  <button onClick={() => createLineItem(product)}>Add</button>
                )
              ) : null}
              {auth.id ? (
                bookmark ? (
                  <button onClick={() => deleteBookmark(bookmark)}>Remove Bookmark</button>
                ) : (
                  <button onClick={() => createBookmark(product)}>Bookmark</button>
                )
              ) : null}
              {auth.is_admin ? (
                <Link to={`/products/${product.id}/edit`}>Edit</Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
