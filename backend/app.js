require("dotenv").config();

var express = require("express");
var router = express.Router();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var CryptoJS = require("crypto-js");

const mysql = require("mysql2");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var inspirationPostRouter = require("./routes/inspirationPost");
var inspirationCommentRouter = require("./routes/inspirationComment");
var sellingPostRouter = require("./routes/sellingPost");
var sellingPostItemRouter = require("./routes/sellingPostItem");
var sellingPostItemCommentsRouter = require("./routes/sellingPostItemComments");
var chatUserRouter = require("./routes/chatUser");

var app = express();
app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: { origin: process.env.SOCKET_CORS},
});
io.listen(4000);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)
console.log(process.env.DB_USER)

app.locals.con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/inspirationPost", inspirationPostRouter);
app.use("/inspirationComment", inspirationCommentRouter);
app.use("/sellingPost", sellingPostRouter);
app.use("/sellingPostItem", sellingPostItemRouter);
app.use("/sellingPostItemComments", sellingPostItemCommentsRouter);
app.use("/chatUser", chatUserRouter);

let connectionUserList = [];

io.on("connection", function (socket) {
  //If you are logged in, the data below is handled.
  console.log("user connected");

  socket.on("chatLogin", function (msg) {
    //console.log(msg);
    let userToken = CryptoJS.SHA3(msg.userId + process.env.TOKEN).toString();
    if (userToken != msg.token) {
      return;
      //The user is authenticated with userId and token. If return not approved otherwise continue below.
    }
    if (
      connectionUserList.filter(
        (connection) =>
          connection.socket === socket && connection.userId == msg.userId
      ).length == 0
    ) {
      connectionUserList.push({ userId: msg.userId, socket });
    }
    //The user is added to connectUserList with their userID and private socket.
  });

  socket.on("chatmessage", function (msg) {
    //console.log(msg);
    const otherchatPersonSockets = connectionUserList.filter(
      (a) => msg.otherChatPersonID == a.userId
    );
    // Search for the other chatuser in the list. Search through all list where the user are register.
    // Maps to all matching sockets.
    if (otherchatPersonSockets.length != 0) {
      otherchatPersonSockets.map((otherChatPersonSocket) => {
        if (otherChatPersonSocket.socket.connected) {
          otherChatPersonSocket.socket.emit("chatmessage", {
            text: msg.text,
            userId: msg.userId,
            time: new Date(),
          });
        }
      });
    }
    // Send to the loged in user.
    socket.emit("chatmessage", {
      text: msg.text,
      userId: msg.userId,
      time: new Date(),
    });
    // Save each message to the database.
    app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }
      let sql = `INSERT INTO chatmessage (userID, messageText, chatID) VALUES (${mysql.escape(
        msg.userId
      )}, ${mysql.escape(msg.text)}, ${mysql.escape(msg.chatID)})`;

      app.locals.con.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log("result", result);
      });
    });
  });

  socket.on("newchat", function (msg) {
    console.log(msg);

    //Find the chat in the database
    app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }
      let sql = `SELECT chatID FROM chat WHERE (user1 = ${mysql.escape(
        msg.userId
      )} OR user2 = ${mysql.escape(msg.userId)}) AND (user1 = ${mysql.escape(
        msg.otherChatPersonID
      )} OR user2 = ${mysql.escape(msg.otherChatPersonID)})`;

      // If the chatmessage do not exist -> Save chat in mySQL database
      app.locals.con.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log("result", result);
        if (result.length == 0) {
          let sql = `INSERT INTO chat (user1, user2) VALUES (${mysql.escape(
            msg.userId
          )}, ${mysql.escape(msg.otherChatPersonID)})`;
          app.locals.con.query(sql, function (err, result) {
            if (err) {
              console.log(err);
            }
            console.log("result", result);
            socket.emit("chatID", { chatID: result.insertId });
          });
        } else {
          socket.emit("chatID", { chatID: result[0].chatID });
          // Fetch all messages from database.
          let sql = `SELECT * FROM chatmessage WHERE chatID = ${mysql.escape(
            result[0].chatID
          )}`;
          app.locals.con.query(sql, function (err, result) {
            if (err) {
              console.log(err);
            }
            // Return message, one at a time, with text, userID and time to frontend.
            result.map((message) => {
              socket.emit("chatmessage", {
                text: message.messageText,
                userId: message.userID,
                time: message.messageDate,
              });
            });
          });
        }
      });
    });
  });
});

module.exports = { app: app, server: server };
