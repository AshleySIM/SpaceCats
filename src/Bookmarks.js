import React from "react";

const Bookmarks = ({ bookmarks, products, auth }) => {
  return (
    <div className="bookDiv">
      <h1>Bookmarks</h1>
      <ul>
        {bookmarks
          .filter((bookmark) => bookmark.user_id === auth.id)
          .map((bookmark) => {
            const product =
              products.find((product) => product.id === bookmark.product_id) ||
              {};
            return <li key={bookmark.id}>{product.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default Bookmarks;
