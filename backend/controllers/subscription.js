const { connection } = require("../db/db");
const moment = require("moment");

const addSubscription = async (req, res, next) => {
  const { plan_id } = req.body;
  const sql = `SELECT * FROM plans WHERE id = '${plan_id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result.length == 0) {
      res.status(401).send("Invalid Plan Id");
      return;
    }
    const startDate = moment(new Date()).format("YYYY-MM-DD");
    let endDate = new Date(
      new Date().getTime() + result[0].duration * 24 * 60 * 60 * 1000
    );
    endDate = moment(endDate).format("YYYY-MM-DD");
    const sql = `INSERT INTO subscriptions (user_id, plan_id, start_date, end_date) VALUES ('${req.userId}', '${plan_id}', '${startDate}', '${endDate}')`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).json({ message: "User subscribed successfully." });
    });
  });
};

const userSubscriptionStatus = async (req, res, next) => {
    const now = moment().format("YYYY-MM-DD");
    const sql = `SELECT * FROM subscriptions WHERE user_id = '${req.userId}' AND end_date > '${now}'`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (result.length > 0) {
        res.status(200).json({ status: "active" });
      } else {
        res.status(200).json({ status: "inactive" });
      }
    });
};

module.exports = { addSubscription, userSubscriptionStatus };
