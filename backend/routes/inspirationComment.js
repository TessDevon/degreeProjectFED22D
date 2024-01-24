var express = require("express");
var router = express.Router();
const mysql = require("mysql2");
const CryptoJS = require("crypto-js");

router.post("/", function (req, res, next) {
  let newInspiraionComment = req.body;
  let userId = newInspiraionComment.userId;
  let token = newInspiraionComment.token;
  let userToken = CryptoJS.SHA3(userId + process.env.TOKEN).toString();
  if (userToken != token) {
    res.sendStatus(401);
    return;
  }

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
      res.send(500);
      return;
    }

    let sql = `INSERT INTO inspirationcomments (inspirationCommentsDescription, inpirationCommentsUserID, inspirationCommentsPostID) VALUES (${mysql.escape(
      newInspiraionComment.inspirationCommentsDescription
    )}, ${mysql.escape(newInspiraionComment.userId)}, ${mysql.escape(
      newInspiraionComment.inspirationCommentsPostID
    )})`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.send(500);
        return;
      }
      console.log("result", result);
      res.send(201);
    });
  });
});

router.get("/", function (req, res, next) {
  let userId = req.headers.userid;
  let token = req.headers.token;

  let userToken = CryptoJS.SHA3(userId + process.env.TOKEN).toString();

  if (userToken != token) {
    res.sendStatus(401);
    return;
  }

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
      res.send(500);
      return;
    }

    let sql = `SELECT * FROM inspirationcomments`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.send(500);
        return;
      }
      console.log("result", result);
      res.json(result);
    });
  });
});

module.exports = router;
