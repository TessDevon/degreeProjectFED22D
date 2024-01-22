const { v4: uuidv4 } = require('uuid');

var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const CryptoJS = require('crypto-js');
const multer = require("multer");


router.post('/', function(req,res,next) {
    let newInspiraionPost = req.body;
    console.log(req.body)

    let userId = req.body.userID
    let token = req.body.token

    let userToken = (CryptoJS.SHA3(userId + process.env.TOKEN).toString())

    console.log(userToken)
    console.log(token)
    console.log(userId)

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

        let sql = `INSERT INTO inspirationposts (inspirationPostHeader, inspirationPostDescription, inspirationPostUserID ) VALUES (${mysql.escape(newInspiraionPost.newInspirationPostHeader)}, ${mysql.escape(newInspiraionPost.newInspirationPostDescription)}, ${mysql.escape(newInspiraionPost.userID)})`

        req.app.locals.con.query(sql, function(err, result) {
            if(err) {
                console.log(err);
                res.send(500);
                return
            }
            console.log('result', result);
            res.json({postID:result.insertId})
        })
    })
});

let storage = multer.diskStorage({
    destination:function(req,file, cb) {
        cb(null, "public/upload/inspiration")
    }, 
    filename: function(req, file, cb) {
        cb(null, uuidv4()+"."+file.originalname.split('.').pop())
    },
})
const upload = multer({storage: storage});

router.post("/:inspirationPostID/postimage", upload.single("image"), function(req,res){
    console.log(req.file);
    let userId = req.headers.userid
    let inspirationPostID = req.params.inspirationPostID
    let token = req.headers.token
    let inspirationPostImage = req.file.filename

    let userToken = (CryptoJS.SHA3(userId + process.env.TOKEN).toString())

    console.log(userToken)
    console.log(token)
    console.log(userId)

    if (userToken != token) {
        res.sendStatus(401);
        return
    }

    req.app.locals.con.connect(function (err) {
        if (err) {
          console.log(err);
        }

        let sql = `UPDATE inspirationposts SET inspirationPostImg=${mysql.escape(inspirationPostImage)} WHERE inspirationPostUserID=${mysql.escape(userId)} AND inspirationPostID=${mysql.escape(inspirationPostID)} `
    
        req.app.locals.con.query(sql, function(err, result) {
            if(err) {
                console.log(err);
            }
            console.log("result", result)
            res.sendStatus(200)
        })
    })
})


router.get('/', function(req,res,next) {
    let userId = req.headers.userid
    let token = req.headers.token

    let userToken = (CryptoJS.SHA3(userId + process.env.TOKEN).toString())

    console.log(userToken)
    console.log(token)
    console.log(userId)

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

        let sql = `SELECT * FROM inspirationposts`

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


/* Codeexample to post new post:
    let saveInspirationPostHeader = 'Julhuset';
    let saveInspirationPostDescription = 'Jag har börjat med att ta bort all löstsittande tapet. Sedan använde jag mig av crapbookingpapper som träreglar. Satte fast dessa med limstift.';
    let saveInspirationPostImg = '../public/images/exempelbild1.jpg';
    let saveInspirationPostUserID = 8;
    */

/*Codeaxample sql-querys for later use, QRUD: 
    //// hämta alla posts ////    
    SELECT * FROM inspirationposts  
    //// lägga till en ny post ////                                   
    INSERT INTO inspirationposts (inspirationPostHeader, inspirationPostDescription, inspirationPostImg, inspirationPostUserID) VALUES (${mysql.escape(newInspiraionPost.inspirationPostHeader)}, ${mysql.escape(newInspiraionPost.inspirationPostDescription)}, ${mysql.escape(newInspiraionPost.inspirationPostImg)}, ${mysql.escape(newInspiraionPost.inspirationPostUserID)})       
    //// ändra värde i post (header) vald rad ////
    UPDATE inspirationposts SET inspirationPostHeader="Skidstugan" WHERE ID=5
    //// radera vald post /// 
    DELETE FROM inspirationposts WHERE ID=5 
*/