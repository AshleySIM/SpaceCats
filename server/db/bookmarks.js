const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchBookmarks = async () => {
  try {
    const SQL = `
          SELECT *
          FROM bookmarks
          INNER JOIN products ON bookmarks.product_id = products.id
          WHERE bookmarks.user_id = $1;
        `;
    const { rows } = await client.query(SQL, [user_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const createBookmark = async (user_id, product_id) => {
    try {
      const SQL = `
        INSERT INTO bookmarks (user_id, product_id)
        VALUES ($1, $2)
        RETURNING *;
      `;
      
      const { rows } = await client.query(SQL, [user_id, product_id]);
      
      return rows[0].id;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
  fetchBookmarks,
  createBookmark
};
