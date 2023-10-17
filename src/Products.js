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
  bookmark,
}) => {
  return (
    <div className="productsDiv">
      <h1>Products</h1>
      <div className="productsList">
        {products.map((product) => {
          const cartItem = cartItems.find(
            (lineItem) => lineItem.product_id === product.id
          );
          const bookmark = bookmarks.find(
            (bookmark) => bookmark.product_id === product.id
          );
          return (
            <div className="productCard" key={product.id}>
            
              <h2>{product.name}</h2>
              <p key={product.id}>
                {product.description}
                <br></br>
                ${product.price}
                <br></br>
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
                <br></br>
                {auth.id ? (
                  bookmark ? (
                    <button onClick={() => deleteBookmark(bookmark)}>
                      Remove Bookmark
                    </button>
                  ) : (
                    <button onClick={() => createBookmark(product)}>
                      Bookmark
                    </button>
                  )
                ) : null}
                <br></br>
                {auth.is_admin ? (
                  <Link to={`/products/${product.id}/edit`}>Edit</Link>
                ) : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
