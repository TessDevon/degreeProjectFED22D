var express = require('express');
var router = express.Router();
const mysql = require('mysql2');


router.post('/', function(req,res,next) {
  let newSellingpostitem = req.body;

  req.app.locals.con.connect(function(err){
      if (err) {
            console.log(err);
            res.send(500);
            return
      }

      let sql = `INSERT INTO sellingpostitems (sellingItemDescription, sellingItemImg, sellingItemUnserID, sellingItemPostID) VALUES (${mysql.escape(newSellingpostitem.sellingItemDescription)}, ${mysql.escape(newSellingpostitem.sellingItemImg )}, ${mysql.escape(newSellingpostitem.sellingItemUnserID)}, ${mysql.escape(newSellingpostitem.sellingItemPostID)})`

      req.app.locals.con.query(sql, function(err, result) {
          if(err) {
                console.log(err);
                res.send(500);
                return
          }
          console.log('result', result);
          res.send(201);
      })
    })
});


router.get('/', function(req,res,next) {

  req.app.locals.con.connect(function(err){
      if (err) {
            console.log(err);
            res.send(500);
            return
      }

      let sql = `SELECT * FROM sellingpostitems`

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