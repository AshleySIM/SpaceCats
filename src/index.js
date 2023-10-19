import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Link, HashRouter, Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import Orders from "./Orders";
import Cart from "./Cart";
import Login from "./Login";
import api from "./api";
import Bookmarks from "./Bookmarks";
import SignUp from "./SignUp";
import Reviews from "./Reviews";

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [auth, setAuth] = useState({});
  const [reviews, setReviews] = useState([]);

  const attemptLoginWithToken = async () => {
    await api.attemptLoginWithToken(setAuth);
  };

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchReviews(setReviews);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchBookmarks(setBookmarks);
      };
      fetchData();
    }
  }, [auth]);

  const createBookmark = async (product) => {
    await api.createBookmark({ product, bookmarks, setBookmarks });
  };

  const createReview = async (review) => {
    console.log(reviews);
    await api.createReview({ review, setReviews, reviews });
  };

  const createLineItem = async (product) => {
    await api.createLineItem({ product, cart, lineItems, setLineItems });
  };

  const updateLineItem = async (lineItem) => {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const subtractLineItem = async (lineItem) => {
    await api.subtractLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async (order) => {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async (lineItem) => {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const deleteBookmark = async (bookmark) => {
    await api.deleteBookmark({ bookmark, bookmarks, setBookmarks });
  };

  const cart = orders.find((order) => order.is_cart) || {};

  const cartItems = lineItems.filter(
    (lineItem) => lineItem.order_id === cart.id
  );

  const cartCount = cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
  };

  const createUser = async (user) => {
    await api.createUser({ user, setAuth });
  };

  const logout = () => {
    api.logout(setAuth);
  };

  return (
    <div>
      {auth.id ? (
        <>
          <Link to={"/"} className="titleLink"><h1 className="title">Space Cats</h1></Link>
          <nav>
            <span>
              Welcome {auth.username}!<button onClick={logout}>Logout</button>
            </span>
            <Link to="/products" className="navLink">
              Products
            </Link>
            <Link to="/orders" className="navLink">
              Orders
            </Link>

            <Link to="/cart" className="navLink">
              Cart ({lineItems.length})
            </Link>
            <Link to="/bookmarks" className="navLink">
              Bookmarks({bookmarks.length})
            </Link>
            <Link to="/reviews" className="navLink">
              {" "}
              Reviews
            </Link>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route
                path="/products"
                element={
                  <Products
                    auth={auth}
                    products={products}
                    cartItems={cartItems}
                    createLineItem={createLineItem}
                    updateLineItem={updateLineItem}
                    bookmarks={bookmarks}
                    createBookmark={createBookmark}
                    deleteBookmark={deleteBookmark}
                  />
                }
              />
              <Route
                path="/products/:productId"
                element={
                  <ProductDetail
                    auth={auth}
                    products={products}
                    cartItems={cartItems}
                    createLineItem={createLineItem}
                    updateLineItem={updateLineItem}
                    bookmarks={bookmarks}
                    createBookmark={createBookmark}
                    deleteBookmark={deleteBookmark}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    lineItems={lineItems}
                    products={products}
                    updateOrder={updateOrder}
                    removeFromCart={removeFromCart}
                    updateLineItem={updateLineItem}
                    subtractLineItem={subtractLineItem}
                  />
                }
              />
              <Route
                path="/orders"
                element={
                  <Orders
                    orders={orders}
                    products={products}
                    lineItems={lineItems}
                  />
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <Bookmarks
                    bookmarks={bookmarks}
                    products={products}
                    auth={auth}
                  />
                }
              />
              <Route
                path="/reviews"
                element={
                  <Reviews
                    reviews={reviews}
                    products={products}
                    createReview={createReview}
                    setReviews={setReviews}
                  />
                }
              />
            </Routes>
          </main>
        </>
      ) : (
        <div className="frontPage">
          <Login login={login} />
          <SignUp createUser={createUser} />
          <Products
            products={products}
            cartItems={cartItems}
            createLineItem={createLineItem}
            updateLineItem={updateLineItem}
            bookmarks={bookmarks}
            auth={auth}
          />
          <Reviews reviews={reviews} products={products} />
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
