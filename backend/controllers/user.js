const { connection } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendAccountApprovedMail } = require("../utils/mail")

const registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    res.status(400).json({error:"Please provide all the required fields."});
    return;
  }
  const sql = `SELECT * FROM users WHERE email = '${email}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({error: err});
      return;
    }
    if (result.length > 0) {
      res.status(400).json({error: "The email already exists."});
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = `INSERT INTO users (name, email, password, phone, role) VALUES ('${name}', '${email}', '${hashedPassword}', '${phone}', 1564)`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({error: err});
        return;
      }
      sendAccountApprovedMail({email, name})
      res.status(200).json({ message: "User registered successfully." });
    });
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({error: "Please provide all the required fields"});
    return;
  }
  const sql = `SELECT * FROM users WHERE email = '${email}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result.length === 0) {
      res.status(401).json({error: "The user does not exist."});
      return;
    }
    const hashedPassword = result[0].password;
    if (!bcrypt.compareSync(password, hashedPassword)) {
      res.status(401).json({error: "The password is incorrect."});
      return;
    }
    const jwtToken = jwt.sign(
      {
        email: email,
        user_id: result[0].id,
        role: result[0].role
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res
      .status(200)
      .json({ message: "User registered successfully.", jwtToken, name: result[0].name, role: result[0].role});
  });
};

module.exports = { registerUser, loginUser };
