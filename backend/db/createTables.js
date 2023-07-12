const { connection } = require("./db");

const createUsersTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("User Table created!");
    }
  });
};

const createCategoryTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS categories (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Category Table created!");
    }
  });
};

const createUserPreferencesTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS user_preferences (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("User Preference Table created!");
    }
  });
};

const createNewsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS news (
        id INT NOT NULL AUTO_INCREMENT,
        source VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        imageURL VARCHAR(255) NOT NULL,
        publishedAt DATETIME NOT NULL,
        content TEXT NOT NULL,
        language ENUM('english', 'hindi') NOT NULL,
        category_id INT NOT NULL,
        country ENUM('india', 'united states of america', 'united kingdom', 'australia', 'japan') NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("News Table created!");
    }
  });
};

const createArticleTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS articles (
        id INT NOT NULL AUTO_INCREMENT,
        source VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        imageURL VARCHAR(255) NOT NULL,
        publishedAt DATETIME NOT NULL,
        content TEXT NOT NULL,
        language ENUM('en', 'hi') NOT NULL,
        category_id INT NOT NULL,
        country ENUM('US', 'AU', 'UK', 'IN', 'JP') NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Article Table created!");
    }
  });
};

const createPlansTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS plans (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        duration INT NOT NULL,
        parameter VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        PRIMARY KEY (id)
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Plans Table created!");
    }
  });
};

const createSubscriptionsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS subscriptions (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        plan_id INT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (plan_id) REFERENCES plans(id)
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Subscription Table created!");
    }
  });
};

const createEmailLogsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS email_logs (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        subject VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL,
        status VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email Logs Table created!");
    }
  });
};

const insertValuesIntoCategories = async () => {
  const sql = ` INSERT INTO categories (name) VALUES
      ('business'),
      ('entertainment'),
      ('environment'),
      ('food'),
      ('health'),
      ('politics'),
      ('science'),
      ('sports'),
      ('technology'),
      ('top'),
      ('tourism'),
      ('world');
      );`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Values inserted into categories!");
    }
  });
};

const databaseSetup = async () => {
  try {
    await createUsersTable();
    await createCategoryTable();
    await createUserPreferencesTable();
    await createNewsTable();
    await createArticleTable();
    await createPlansTable();
    await createSubscriptionsTable();
    await createEmailLogsTable();
    await insertValuesIntoCategories();
    console.log("Tables Created Successfully");
  } catch (err) {
    console.log("Error creating database");
    process.exit(0);
  }
};

module.exports = { databaseSetup };
