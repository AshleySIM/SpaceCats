const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;


const fetchBookmarks = async (user_id) => {
  try {
    const SQL = `
          SELECT *
          FROM bookmarks
          WHERE bookmarks.user_id = $1
        `;

    const { rows } = await client.query(SQL, [user_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};


const createBookmark = async (user_id, product_id) => {
  try {
    const bookmarkId = uuidv4();

    const SQL = `
      INSERT INTO bookmarks (id, user_id, product_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    console.log(bookmarkId, user_id, product_id)
    const { rows } = await client.query(SQL, [ bookmarkId, user_id, product_id ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchBookmarks,
  createBookmark
}
