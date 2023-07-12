const { connection } = require("../db/db");

const getNewsByCategories = async (req, res, next) => {
  const { category, page, pageSize, language } = req.query;
  // console.log(category, page, pageSize, language)
  const sql = `SELECT * FROM news JOIN categories on news.category_id = categories.id WHERE categories.name = '${category}' and news.language = '${language}' limit ${pageSize} offset ${
    (page - 1) * pageSize
  };
  SELECT COUNT(*) as total_count FROM news JOIN categories ON news.category_id = categories.id WHERE categories.name = '${category}' AND news.language = '${language}';`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ news: result[0], total_count: result[1] });
  });
};

const searchNews = async (req, res, next) => {
  const { q, page, pageSize, language } = req.query;
  // console.log(q, page, pageSize, language)
  const sql = `
SELECT * FROM news join categories on news.category_id = categories.id WHERE news.language = '${language}' and MATCH (news.title, news.description, news.content) AGAINST ('${q}' IN BOOLEAN MODE) limit ${pageSize} offset ${
    (page - 1) * pageSize
  };
SELECT COUNT(*) as total_count FROM news JOIN categories ON news.category_id = categories.id WHERE news.language = '${language}' and MATCH (news.title, news.description, news.content) AGAINST ('${q}' IN BOOLEAN MODE);`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ news: result[0], total_count: result[1] });
  });
};

const getPreferredNews = async (req, res, next) => {
  const { language } = req.query;
  try {
    const data = [];
    const categoriesQuery = `SELECT * from categories join user_preferences on categories.id = user_preferences.category_id where user_preferences.user_id = '${req.userId}';`;

    const categories = await new Promise((resolve, reject) => {
      connection.query(categoriesQuery, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const newsQuery = `SELECT news.title, news.url FROM news JOIN categories ON news.category_id = categories.id WHERE categories.name = '${category.name}' AND news.language = '${language}' LIMIT 5`;
      const news = await new Promise((resolve, reject) => {
        connection.query(newsQuery, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });

      const resultObject = {
        name: category.name,
        news: news,
      };
      data.push(resultObject);
    }

    res.status(200).json({ news: data });
  } catch (err) {
    next(err);
  }
};

const addNews = async (req, res, next) => {
  const {
    source,
    title,
    description,
    url,
    content,
    language,
    category,
    country,
    imageUrl,
  } = req.body;
  const date = new Date(); // Create a new Date object
  const publishedAt = date.toISOString().slice(0, 19).replace("T", " ");
  const sql = `INSERT INTO news (source, author, title, description, url, imageUrl, publishedAt, content, language, category_id, country)
     VALUES 
    ('${source}', 'ADMIN', '${title}', '${description}', '${url}', '${imageUrl}', '${publishedAt}', '${content}', '${language}', '${category}', '${country}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.status(200).json({ message: "News Added successfully." });
  });
};

const getAllNews = async (req, res, next) => {
  try {
    const { language } = req.query;
    const data = [];
    const categoriesQuery = `SELECT * FROM categories`;

    const categories = await new Promise((resolve, reject) => {
      connection.query(categoriesQuery, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const newsQuery = `SELECT news.title, news.url FROM news JOIN categories ON news.category_id = categories.id WHERE categories.name = '${category.name}' AND news.language = '${language}' LIMIT 5`;
      const news = await new Promise((resolve, reject) => {
        connection.query(newsQuery, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });

      const resultObject = {
        name: category.name,
        news: news,
      };
      data.push(resultObject);
    }

    res.status(200).json({ news: data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNewsByCategories,
  searchNews,
  getPreferredNews,
  addNews,
  getAllNews,
};
