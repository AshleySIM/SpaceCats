const client = require('./client');

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  createUser,
  authenticate,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders,
} = require('./cart');

const {
  fetchBookmarks,
  createBookmark
} = require('./bookmarks')


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS bookmarks;
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false 
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price DECIMAL(10,2),
      description CHAR(2000)
    );

    CREATE TABLE bookmarks (
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL
    );
     

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

  `;
  await client.query(SQL);

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true})
  ]);
  const [foo, bar, quq, bazz] = await Promise.all([
    createProduct({ name: 'foo ', price:'10 ', description:' Welcome to SpaceCats '}),
    createProduct({ name: 'bar ', price: '20 ', description: ' welcome to spaceCats '}),
    createProduct({ name: 'quq ', price: '30 ', description: ' welcome to spacecats '}),
    createProduct({ name: 'bazz ', price: '40 ', description: ' Welcome To Spacecats '}),
  ]);

  const bookmark = await createBookmark(moe.id, foo.id);
  console.log(`Created bookmark with ID: ${bookmark}`);

  const userBookmarks = await fetchBookmarks(moe.id);
  console.log('User Bookmarks:', userBookmarks);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchBookmarks,
  createLineItem,
  createBookmark,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  createUser,
  findUserByToken,
  seed,
  client
};
