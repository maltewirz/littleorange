const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/littleorange";

var db = spicedPg(dbUrl);

module.exports.addUser = function addUser(first, last, email, password) {
  return db.query(
    `
    INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `,
    [first, last, email, password]
  );
};

module.exports.getUserByEmail = function getUserByEmail(email) {
  return db.query(
    `
    SELECT *
    FROM users
    WHERE email=$1;
    `,
    [email]
  );
};

module.exports.addResults = function addResults(userId, finalResultPoints, finalResultTopics) {
  return db.query(
    `
    INSERT INTO clients (user_id, final_result_points, final_result_topics)
    VALUES ($1, $2, $3)
    `,
    [userId, finalResultPoints, finalResultTopics]
  );
};
