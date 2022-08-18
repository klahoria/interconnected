var mongoose = require("mongoose");

const db_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/interconnected";

let db = mongoose.connect(db_URL, {
  useNewUrlParser: true,
  // useUndefinedTopology: true,
});

module.exports = db;
