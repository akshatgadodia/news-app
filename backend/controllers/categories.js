const { connection } = require("../db/db");

const getCategories = async (req, res, next) => {
  const sql = `Select name from categories`;
  connection.query(sql, (err, result) => {
    if (err) {
    console.log(err)

      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ categories: result });
  });
};

module.exports = { getCategories };
