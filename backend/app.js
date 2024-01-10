require('dotenv').config();

var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var CryptoJS = require("crypto-js");

const mysql = require('mysql2');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inspirationPostRouter = require('./routes/inspirationPost');
var inspirationCommentRouter = require('./routes/inspirationComment');
var sellingPostRouter = require('./routes/sellingPost');
var sellingCommentRouter = require('./routes/sellingComment'); 

//import 'dotenv/config'


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inspirationPost', inspirationPostRouter);
app.use('/inspirationComment', inspirationCommentRouter);
app.use('/sellingPost.js', sellingPostRouter);
app.use('/sellingComment.js', sellingCommentRouter);

module.exports = app;
