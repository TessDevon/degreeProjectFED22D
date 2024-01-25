const { v4: uuidv4 } = require("uuid");

var express = require("express");
var router = express.Router();
const mysql = require("mysql2");
const CryptoJS = require("crypto-js");

const multer = require("multer");

router.post("/", function (req, res, next) {
  let newSellingpostitem = req.body;
  let userId = newSellingpostitem.userID;
  let token = newSellingpostitem.token;
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

    let sql = `INSERT INTO sellingpostitems (sellingItemDescription, sellingItemUnserID, sellingItemPostID) VALUES (${mysql.escape(
      newSellingpostitem.sellingItemDescription
    )}, ${mysql.escape(newSellingpostitem.userID)}, ${mysql.escape(
      newSellingpostitem.sellingItemPostID
    )})`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log("result", result);
      res.json({ postID: result.insertId });
    });
  });
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/selling");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "." + file.originalname.split(".").pop());
  },
});
const upload = multer({ storage: storage });

router.post(
  "/:sellingItemPostID/itemimage",
  upload.single("image"),
  function (req, res) {
    console.log(req.file);
    let userId = req.headers.userid;
    let sellingItemPostID = req.params.sellingItemPostID;
    let token = req.headers.token;
    let sellingItemPostImage = req.file.filename;

    let userToken = CryptoJS.SHA3(userId + process.env.TOKEN).toString();

    if (userToken != token) {
      res.sendStatus(401);
      return;
    }

    req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }

      let sql = `UPDATE sellingpostitems SET sellingItemImg=${mysql.escape(
        sellingItemPostImage
      )} WHERE sellingItemUnserID=${mysql.escape(
        userId
      )} AND sellingItemID=${mysql.escape(sellingItemPostID)} `;

      req.app.locals.con.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log("result", result);
        res.sendStatus(200);
      });
    });
  }
);

router.get("/", function (req, res, next) {

  let userId = req.headers.userid
  let token = req.headers.token

  let userToken = (CryptoJS.SHA3(userId + process.env.TOKEN).toString())

  if (userToken != token) {
      res.sendStatus(401);
      return
  }

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
      res.send(500);
      return;
    }

    let sql = `SELECT * FROM sellingpostitems`;

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

router.delete('/:deleteItemId', function(req,res,next) {
  let deletedItemId = req.params.deleteItemId
  let userId = req.body.userId
  let token = req.body.token

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

      let sql = `DELETE FROM sellingpostitems WHERE sellingItemUnserID = ${mysql.escape(userId)} AND sellingItemID = ${mysql.escape(deletedItemId)}`

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
})

module.exports = router;
