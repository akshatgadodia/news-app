const { connection } = require("../db/db");

const addSinglePreferences = async (req, res, next) => {
  const { category_id } = req.body;
  const sql = `SELECT * FROM user_preferences WHERE user_id = '${req.userId}' and category_id = '${category_id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result.length != 0) {
      res
        .status(401)
        .json({error: "This category is already added to the user preferences"});
      return;
    }
    const sql = `INSERT INTO user_preferences (user_id, category_id) VALUES ('${req.userId}', '${category_id}')`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({error: err});
        return;
      }
      res.status(200).json({ message: "User preference added successfully." });
    });
  });
};

const getCategoryID = async (category) => {
  const promise = new Promise((resolve, reject) => {
    const sql = `SELECT id FROM categories WHERE name = "${category}";`;
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject(
          new Error(`Category "${category}" not found in the categories table.`)
        );
      } else {
        resolve(result[0].id);
      }
    });
  });
  return promise;
};

const addPreferences = async (req, res, next) => {
  const { categories } = req.body;
  console.log(categories);
  const sql = `delete FROM user_preferences WHERE user_id = '${req.userId}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({error: err});
      return;
    }
  });
  for(let i = 0; i<categories.length; i++){
    const categoryId = await getCategoryID(categories[i]);
    const query = `INSERT INTO user_preferences (user_id, category_id) VALUES ('${req.userId}', '${categoryId}')`;
    connection.query(query, (err, result) => {
      if (err) {
        res.status(500).json({error: err});
        return;
      }
    });
  }
  res.status(200).json({ message: "User preference updated successfully." });
};

const getUserPreferences = async (req, res, next) => {
  const sql = `SELECT name FROM categories INNER JOIN user_preferences ON category_id = categories.id WHERE user_id = '${req.userId}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({error: err});
      return;
    }
    const categoryNames = [];
    for (const row of result) {
      categoryNames.push(row.name);
    }
    res.status(200).json({ categories: categoryNames });
  });
};

module.exports = { addPreferences, getUserPreferences };
