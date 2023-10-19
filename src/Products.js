import React, { useState, useEffect } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="productsDiv">
      <h1>Products</h1>
      <div className="containerDiv">
        <div className="searchContainer">
          <input
            className="search-bar"
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className="productsList">
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find(
            (lineItem) => lineItem.product_id === product.id
          );
          const bookmark = bookmarks.find(
            (bookmark) => bookmark.product_id === product.id
          );
          return (
            <div className="productCard" key={product.id}>
              <h2>{product.name}</h2>
              <Link to={`/products/${product.id}`}>
                {product.image ? <img src={product.image} /> : null}
              </Link>
              <br></br>
              {product.description}
              <br></br>${product.price}
              <br></br>
              <div className="btnDiv">
                {auth.id ? (
                  cartItem ? (
                    <button
                      onClick={() => updateLineItem(cartItem)}
                      className="btn"
                    >
                      Add Another
                    </button>
                  ) : (
                    <button
                      onClick={() => createLineItem(product)}
                      className="btn"
                    >
                      Add to cart
                    </button>
                  )
                ) : null}
                <br></br>
                {auth.id ? (
                  bookmark ? (
                    <button
                      onClick={() => deleteBookmark(bookmark)}
                      className="btn"
                    >
                      Remove Bookmark
                    </button>
                  ) : (
                    <button
                      onClick={() => createBookmark(product)}
                      className="btn"
                    >
                      Bookmark
                    </button>
                  )
                ) : null}
              </div>
              <br></br>
              {auth.is_admin ? (
                <Link to={`/products/${product.id}/edit`}>Edit</Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
