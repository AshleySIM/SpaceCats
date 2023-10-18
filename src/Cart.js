import React from "react";

const Cart = ({
  updateOrder,
  removeFromCart,
  lineItems,
  cart,
  products,
  updateLineItem,
  subtractLineItem,
}) => {
  const cartItems = lineItems.filter(
    (lineItem) => lineItem.order_id === cart.id
  );
  const totalQuantity = cartItems.reduce(
    (total, lineItem) => total + lineItem.quantity,
    0
  );
  const totalPrice = cartItems.reduce((total, lineItem) => {
    const product = products.find(
      (product) => product.id === lineItem.product_id
    );
    if (product) {
      return total + product.price * lineItem.quantity;
    }
    return total;
  }, 0);

  const fixedPrice = totalPrice.toFixed(2);

  return (
    <div className="cartDiv">
      <h1>Cart</h1>
      <h2>Total: ${fixedPrice}</h2>
      <div>
        {lineItems
          .filter((lineItem) => lineItem.order_id === cart.id)
          .map((lineItem) => {
            const product =
              products.find((product) => product.id === lineItem.product_id) ||
              {};
            return (
              <div key={lineItem.id} className="cartList">
                <h2>{product.name}</h2>
                <p>Quantity: {lineItem.quantity}</p>
                <p>(${((product.price * lineItem.quantity) / 1).toFixed(2)})</p>
                <br></br>
                <button
                  onClick={() => updateLineItem(lineItem)}
                  className="btn"
                >
                  {" "}
                  + 1 {product.name}{" "}
                </button>
                <br></br>
                <button
                  onClick={() => {
                    lineItem.quantity > 1
                      ? subtractLineItem(lineItem)
                      : removeFromCart(lineItem);
                  }}
                  className="btn"
                >
                  {" "}
                  - 1 {product.name}{" "}
                </button>
                <br></br>
                <button
                  onClick={() => removeFromCart(lineItem)}
                  className="btn"
                >
                  Remove All {product.name} From Cart
                </button>
              </div>
            );
          })}
      </div>
      <hr></hr>
      {lineItems.filter((lineItem) => lineItem.order_id === cart.id).length ? (
        <button
          onClick={() => {
            updateOrder({ ...cart, is_cart: false });
          }}
          className="btn"
        >
          Create Order
        </button>
      ) : null}
    </div>
  );
};

export default Cart;
