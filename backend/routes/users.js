var express = require('express');
var router = express.Router();
const CryptoJS = require('crypto-js');
const mysql = require('mysql2');


//
// Registrera ny användare
//

router.post('/', function(req,res) {
  let newUser = req.body; 
  console.log(newUser);

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    let sql = `SELECT userEmail FROM users WHERE userEmail = ${mysql.escape(newUser.newEmail)}`;

    req.app.locals.con.query(sql, function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result", result);
      if (result.length == 0) {
        createNewUser(req, res);
        return;
      }
      res.send(401);
    })
  })
});

function createNewUser (req, res) {
  let newUser = req.body; 
  console.log(newUser);

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let passwordToSave = CryptoJS.SHA3(req.body.newPassword).toString()

    let sql = `INSERT INTO users (userEmail, userPassword, userFirstname, userLastname) VALUES (${mysql.escape(newUser.newEmail)}, ${mysql.escape(passwordToSave)}, ${mysql.escape(newUser.newFirstname)}, ${mysql.escape(newUser.newL)})`;
  
    req.app.locals.con.query(sql, function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result", result) 
      res.send(result);
    })

    // Sparar användaren lokalt för att testas mot sidan när användaren hanterar sidan.
    req.app.locals.con.query(sql, function(err, result) {
      if (err) {
        console.log(err);
      }

      console.log(result);

      let userToken = (CryptoJS.SHA3(result[0].userID + process.env.TOKEN).toString())
      if(passwordToCheck === result[0].userPassword) {
        res.json({userId:result[0].userId, token:userToken})
        return;
      }
      res.status(401).json("Incurrect password or email")
    })
  })
};


//
// Logga in användare 
//


router.post('/login', function(req,res) {
  let { userEmail, userPassword } = req.body ;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let passwordToCheck = CryptoJS.SHA3(userPassword).toString()
    console.log(passwordToCheck);

    let sql = `SELECT userEmail, userPassword, userId FROM users WHERE userEmail = ${mysql.escape(userEmail)}`;
    console.log(sql);

    // Sparar användaren lokalt för att testas mot sidan när användaren hanterar sidan. 
    req.app.locals.con.query(sql, function(err, result) {
      if (err) {
        console.log(err);
      }

      console.log(result);

      let userToken = (CryptoJS.SHA3(result[0].userID + process.env.TOKEN).toString())
      if(passwordToCheck === result[0].userPassword) {
        res.json({userId:result[0].userId, token:userToken})
        return;
      }
      res.status(401).json("Incurrect password or email")
    })
  })
})


module.exports = router;


/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('Välkommen till users');
});*/

