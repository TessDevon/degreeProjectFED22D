var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const CryptoJS = require("crypto-js");


router.post('/', function(req,res,next) {
  let newSellingItemcomment = req.body;
  let userId = newSellingItemcomment.userID;
  let token = newSellingItemcomment.token;
  let userToken = CryptoJS.SHA3(userId + process.env.TOKEN).toString();
  let sellingpostitemcommentsUserID = newSellingItemcomment.sellingpostitemcommentsUserID;
  let sellingPostItemID = newSellingItemcomment.sellingPostItemID


  if (userToken != token) {
    res.sendStatus(401);
    return;
  }

  req.app.locals.con.connect(function(err){
      if (err) {
          console.log(err);
          res.send(500);
          return
      }

      let sql = `INSERT INTO sellingpostitemcomments (sellingPostItemCommentsDescription, sellingpostitemcommentsUserID , sellingPostItemID) VALUES (${mysql.escape(newSellingItemcomment.sellingPostItemCommentsDescription)}, ${mysql.escape(newSellingItemcomment.sellingpostitemcommentsUserID)}, ${mysql.escape(newSellingItemcomment.sellingPostItemID)})`

      req.app.locals.con.query(sql, function(err, result) {
          if(err) {
              console.log(err);
              res.send(500);
              return
          }
          console.log('result', result);
          res.json(result);
      })
  })
});


router.get('/', function(req,res,next) {

  let userId = req.headers.userid
  let token = req.headers.token

  let userToken = (CryptoJS.SHA3(userId + process.env.TOKEN).toString())

  if (userToken != token) {
      res.sendStatus(401);
      return
  }

  req.app.locals.con.connect(function(err){
      if (err) {
          console.log(err);
          res.send(500);
          return
      }

      let sql = `SELECT * FROM sellingpostitemcomments`

      req.app.locals.con.query(sql, function(err, result) {
          if(err) {
              console.log(err);
              res.send(500);
              return
          }
          console.log('result', result);
          res.json(result);
      })
  })
});
     
module.exports = router;
