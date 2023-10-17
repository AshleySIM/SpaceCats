import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Link, HashRouter, Routes, Route } from "react-router-dom";
import Products from "./Products";
import Orders from "./Orders";
import Cart from "./Cart";
import Login from "./Login";
import api from "./api";
import Bookmarks from "./Bookmarks";
import SignUp from './api/SignUp';
import Reviews from './Reviews';
import ProductDetail from './ProductDetail'

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
    await api.createBookmark({ product, bookmarks, setBookmarks});
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
    await api.deleteBookmark({ bookmark, bookmarks, setBookmarks});
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

  const createUser = async ( user) => {
    await api.createUser({ user, setAuth });
  };

  const logout = () => {
    api.logout(setAuth);
  };

  return (
    <div>
      {auth.id ? (
        <>
          <nav>
            <span>
              Welcome {auth.username}!<button onClick={logout}>Logout</button>
             </span>
            <Link to="/products">Products ({products.length})</Link>
            <Link to="/orders">
              Orders ({orders.filter((order) => !order.is_cart).length})
            </Link>

            <Link to="/cart">Cart ({cartCount})</Link>
            <Link to="/bookmarks">Bookmarks ({bookmarks.length})</Link>
            <Link to='/reviews'> Reviews ({reviews.length}) </Link>
            <span>
              Welcome {auth.username}!<button onClick={logout}>Logout</button>
            </span>
          </nav>
          <main>
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
            <Cart
              cart={cart}
              lineItems={lineItems}
              products={products}
              updateOrder={updateOrder}
              removeFromCart={removeFromCart}
              updateLineItem={updateLineItem}
              subtractLineItem={subtractLineItem}
            />
            <Orders orders={orders} products={products} lineItems={lineItems} />
            <Bookmarks bookmarks={bookmarks} products={products} auth={auth} />
            <Reviews 
              reviews = {reviews}
              products= {products} />
          </main>
        </>
      ) : (
        <div>
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
          <Reviews 
            reviews = {reviews}
            products= {products} />
          
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
