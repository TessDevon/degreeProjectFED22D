const { v4: uuidv4 } = require("uuid");

var express = require("express");
var router = express.Router();
const mysql = require("mysql2");
const CryptoJS = require("crypto-js");
const multer = require("multer");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Save new inspiration post /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/", function (req, res, next) {
  let newInspiraionPost = req.body;

  let userId = req.body.userID;
  let token = req.body.token;

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

    let sql = `INSERT INTO inspirationposts (inspirationPostHeader, inspirationPostDescription, inspirationPostUserID ) VALUES (${mysql.escape(
      newInspiraionPost.newInspirationPostHeader
    )}, ${mysql.escape(
      newInspiraionPost.newInspirationPostDescription
    )}, ${mysql.escape(newInspiraionPost.userID)})`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.send(500);
        return;
      }
      console.log("result", result);
      res.json({ postID: result.insertId });
    });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// Save image with multer to a folder in backendmap. And save the link in the database. ///////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/inspiration");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "." + file.originalname.split(".").pop());
  },
});
const upload = multer({ storage: storage });

router.post(
  "/:inspirationPostID/postimage",
  upload.single("image"),
  function (req, res) {
    let userId = req.headers.userid;
    let inspirationPostID = req.params.inspirationPostID;
    let token = req.headers.token;
    let inspirationPostImage = req.file.filename;

    let userToken = CryptoJS.SHA3(userId + process.env.TOKEN).toString();

    if (userToken != token) {
      res.sendStatus(401);
      return;
    }

    req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }

      let sql = `UPDATE inspirationposts SET inspirationPostImg=${mysql.escape(
        inspirationPostImage
      )} WHERE inspirationPostUserID=${mysql.escape(
        userId
      )} AND inspirationPostID=${mysql.escape(inspirationPostID)} `;

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// Fetch all posts //////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    let sql = `SELECT * FROM inspirationposts`;

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Delete a selected post based on  ID ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.delete("/:deleteInspirationPostId", function (req, res, next) {
  let deleteInspirationPostId = req.params.deleteInspirationPostId;
  let userId = req.body.userId;
  let token = req.body.token;

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

    let sql = `DELETE FROM inspirationposts WHERE inspirationPostUserID = ${mysql.escape(
      userId
    )} AND inspirationPostID = ${mysql.escape(deleteInspirationPostId)}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log("result", result);
      res.json(result);
    });
  });
});

module.exports = router;
