var express = require('express');
var router = express.Router();
const mysql = require('mysql2');


router.post('/', function(req,res,next) {
  let newSellingcomments = req.body;

  req.app.locals.con.connect(function(err){
      if (err) {
          console.log(err);
      }

      let sql = `INSERT INTO sellingcomments (sellingCommentsDescription, sellingCommentsImg, sellingCommentsUnserID , sellingCommentsPostID) VALUES (${mysql.escape(newSellingcomments.sellingCommentsDescription)}, ${mysql.escape(newSellingcomments.sellingCommentsImg)}, ${mysql.escape(newSellingcomments.sellingCommentsUnserID)}, ${mysql.escape(newSellingcomments.sellingCommentsPostID)})`

      req.app.locals.con.query(sql, function(err, result) {
          if(err) {
              console.log(err);
          }
          console.log('result', result);
      })
  })
  res.send(201);
});


router.get('/', function(req,res,next) {

  req.app.locals.con.connect(function(err){
      if (err) {
          console.log(err);
      }

      let sql = `SELECT * FROM sellingcomments`

      req.app.locals.con.query(sql, function(err, result) {
          if(err) {
              console.log(err);
          }
          console.log('result', result);
      })
  })
  res.send(200);
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