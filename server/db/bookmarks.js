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

module.exports = {
  fetchBookmarks,
};
