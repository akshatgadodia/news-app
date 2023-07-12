const axios = require("axios");
const { connection } = require("../db/db");

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
  //   const categoryIDs = {
  //     business: 3,
  //     entertainment: 4,
  //     environment: 5,
  //     food: 6,
  //     health: 7,
  //     politics: 8,
  //     science: 9,
  //     sports: 10,
  //     technology: 11,
  //     top: 12,
  //     tourism: 13,
  //     world: 14,
  //   };

  //   return categoryIDs[category] || null;
};

const storeNewsInDatabase = async (newsData) => {
  try {
    for (const news of newsData) {
      const categoryId = await getCategoryID(news.category[0]);
      const sql = `
        INSERT INTO news
        (source, author, title, description, url, imageURL, publishedAt, content, language, category_id, country)
        VALUES ("${newsData[0].source_id}", "${newsData[0].creator}", "${newsData[0].title?.replace(/"/g,'\\"')}", 
        "${newsData[0].description?.replace(/"/g, '\\"').substring(0, 255)}", "${newsData[0].link}", "${newsData[0].image_url}", 
        "${newsData[0].pubDate}", "${newsData[0].content?.replace(/"/g, '\\"').substring(0, 65000)}", 
        "${newsData[0].language}", ${categoryId}, "${newsData[0].country[0]}")`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("News Saved Successfully");
      });
    }
  } catch (error) {
    console.error("Error storing news data:", error);
    throw error;
  }
};

const fetchAndStoreNews = async (loopCount) => {
  try {
    let nextPage = null;
    for (let i = 0; i < loopCount; i++) {
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATAIO_KEY}&country=au,jp,us,in&page=${nextPage}`
      );
      //   console.log(response.data);
      const newsData = response.data.results;
      await storeNewsInDatabase(newsData);
      nextPage = response.data.nextPage;
      if (!nextPage) {
        break;
      }
    }
    console.log("All news data fetched and stored.");
  } catch (error) {
    console.error("Error fetching or storing news data:", error);
  }
};

module.exports = { fetchAndStoreNews };
