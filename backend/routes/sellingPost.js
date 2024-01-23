const { v4: uuidv4 } = require('uuid');

var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const CryptoJS = require('crypto-js');
const multer = require("multer");


router.post('/', function(req,res,next) {
    let newSellingPost = req.body;
    let userId = req.body.userID
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

        let sql = `INSERT INTO sellingposts (sellingPostHeader, sellingPostDescription, sellingPostUserID) VALUES (${mysql.escape(newSellingPost.sellingPostHeader)}, ${mysql.escape(newSellingPost.sellingPostDescription)}, ${mysql.escape(newSellingPost.userID)})`

        req.app.locals.con.query(sql, function(err, result) {
            if(err) {
                console.log(err);
                res.sendStatus(500);
                return
            }
            console.log('result', result);
            res.json({postID:result.insertId});
        })
    })
});

let storage = multer.diskStorage({
    destination:function(req,file, cb) {
        cb(null, "public/upload/selling")
    }, 
    filename: function(req, file, cb) {
        cb(null, uuidv4()+"."+file.originalname.split('.').pop())
    },
})
const upload = multer({storage: storage});

router.post("/:sellingPostID/sellimage", upload.single("image"), function(req,res){
    let userId = req.headers.userid
    let sellingPostID = req.params.sellingPostID
    let token = req.headers.token
    let sellingPostImage = req.file.filename

    let userToken = (CryptoJS.SHA3(userId + process.env.TOKEN).toString())

    if (userToken != token) {
        res.sendStatus(401);
        return
    }

    req.app.locals.con.connect(function (err) {
        if (err) {
          console.log(err);
        }

        let sql = `UPDATE sellingposts SET sellingPostImg =${mysql.escape(sellingPostImage)} WHERE sellingPostUserID=${mysql.escape(userId)} AND sellingPostID=${mysql.escape(sellingPostID)} `
    
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

        let sql = `SELECT * FROM sellingposts`

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

