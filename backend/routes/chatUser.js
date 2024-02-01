const { v4: uuidv4 } = require("uuid");

var express = require("express");
var router = express.Router();
const CryptoJS = require("crypto-js");
const mysql = require("mysql2");
const multer = require("multer");

//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////// Retrieve all chats in which the user participates //////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/", function (req, res) {
  let userID = req.headers.userid;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    let sql = `SELECT * FROM chat WHERE user1 = ${mysql.escape(
      userID
    )} OR user2 = ${mysql.escape(userID)}`;
    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      res.json(result);
      return;
    });
  });
});

module.exports = router;
