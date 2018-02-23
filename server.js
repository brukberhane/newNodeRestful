var express = require('express');
var MySQL = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var connection = MySQL.createConnection({
    host: '127.0.0.1',
    user: 'bruk',
    password: 'pass12',
    database: 'test'
});

connection.connect(function (req, rep){
    console.log("Connected to database");
});

app.get("/helloworld", function (req, res){
    res.json({message: "Hello World!"});
});

app.get("/users", function(req, res){
    connection.query("SELECT uid, username, email FROM users", function(error, results, fields){
        if (error) throw error;

        res.json(results);
    });
});

app.post("/user", function(req, res){
    const uid = req.body.uid;

    connection.query("SELECT uid, username, email FROM users WHERE uid = '" + uid + "'", function(error, results, fields){
        if (error) throw error;

        res.json(results);
    });
});

app.listen(6969);