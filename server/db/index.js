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
      is_admin BOOLEAN DEFAULT false,
      is_vip BOOLEAN DEFAULT false
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
      user_id UUID REFERENCES users(id) NOT NULL,
      is_vip BOOLEAN DEFAULT false
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
  const [Poster, Hat, Shirt, Hoodie] = await Promise.all([
    createProduct({ name: 'Poster ', price:'10 ', description:' Want to join the SpaceCats club? Now you can with our premium one of a kind SpaceCat poster! Let your friends know you are a SpaceCat. '}),
    createProduct({ name: 'Hat ', price: '20 ', description: ' Walk around in style with our premium SpaceCat trucker hat! Bill to the front or back, it does not matter if you are a SPACECAT! '}),
    createProduct({ name: 'Shirt ', price: '30 ', description: ' SpaceCats run the world. Our Elite one of a kind tri-blend tees are so soft, you will feel like your floating in space! '}),
    createProduct({ name: 'Hoodie ', price: '55 ', description: ' A SpaceCat on a hoodie???? Our super comfortable SpaceCats hoodie, has a 99.9% chance of being abducted by your girlfriend! '}),
   ]);

  const userBookmarks = await fetchBookmarks(moe.id);
  console.log('User Bookmarks:', userBookmarks);

  const bookmark = await Promise.all ([
    createBookmark(moe.id, Poster.id),
    createBookmark(lucy.id, Shirt.id),
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: Poster.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: Hat.id});
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
