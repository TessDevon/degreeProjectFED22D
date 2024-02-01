const { v4: uuidv4 } = require("uuid");

var express = require("express");
var router = express.Router();
const CryptoJS = require("crypto-js");
const mysql = require("mysql2");
const multer = require("multer");

//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// Registrera ny användare ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/", function (req, res) {
  let newUser = req.body;
  //console.log(newUser);

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    let sql = `SELECT userEmail FROM users WHERE userEmail = ${mysql.escape(
      newUser.newEmail
    )}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result", result);
      if (result.length == 0) {
        createNewUser(req, res);
        return;
      }
      res.send(401);
    });
  });
});

function createNewUser(req, res) {
  let newUser = req.body;
  //console.log(newUser);

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let passwordToSave = CryptoJS.SHA3(req.body.newPassword).toString();

    let sql = `INSERT INTO users (userEmail, userPassword, userFirstname, userLastname) VALUES (${mysql.escape(
      newUser.newEmail
    )}, ${mysql.escape(passwordToSave)}, ${mysql.escape(
      newUser.newFirstname
    )}, ${mysql.escape(newUser.newLastname)})`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result", result);
      // Saves the user locally to be tested against the page when the user acts on the page.
      let userToken = CryptoJS.SHA3(
        result.insertId + process.env.TOKEN
      ).toString();
      res.json({ userId: result.insertId, token: userToken });
    });
  });

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "." + file.originalname.split(".").pop());
      //The file name is split in two from the dot. Returns everything after that. That is, .jpg or .png.
    },
  });
  const upload = multer({ storage: storage });

  router.post("/:id/userimage", upload.single("image"), function (req, res) {
    console.log(req.file);

    let userId = req.params.id;
    let token = req.headers.token;
    let userImage = req.file.filename;

    let userToken = CryptoJS.SHA3(userId + process.env.TOKEN).toString();

    if (userToken != token) {
      res.sendStatus(401);
      return;
    }

    req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }

      let sql = `UPDATE users SET userImg=${mysql.escape(
        userImage
      )} WHERE userId=${mysql.escape(userId)}`;

      req.app.locals.con.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log("result", result);
        res.sendStatus(200);
      });
    });
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Logga in användare ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/login", function (req, res) {
  let { userEmail, userPassword } = req.body;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let passwordToCheck = CryptoJS.SHA3(userPassword).toString();

    let sql = `SELECT userEmail, userPassword, userId FROM users WHERE userEmail = ${mysql.escape(
      userEmail
    )}`;

    // Saves the user locally to be tested against the page when the user acts on the page.
    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        let userToken = CryptoJS.SHA3(
          result[0].userID + process.env.TOKEN
        ).toString();
        if (passwordToCheck === result[0].userPassword) {
          res.json({ userId: result[0].userId, token: userToken });
          return;
        }
      }
      res.status(401).json("Incurrect password or email");
    });
  });
});

router.get("/", function (req, res, next) {
  let userId = req.headers.userid;
  let token = req.headers.token;

  let userToken = CryptoJS.SHA3(userId + process.env.TOKEN).toString();

  console.log(userToken);
  console.log(token);
  console.log(userId);

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

    let sql = `SELECT userFirstname, userLastname, userImg, userID FROM users`;

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
