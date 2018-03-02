var express = require('express');
var MySQL = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var connection = MySQL.createConnection({
    host: 'localhost',
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

app.post('/signup', (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    connection.query("INSERT INTO users (username,password,email) VALUES ('"+username+"','"+password+"','"+email+"')", (err, reply, fields) => {
        if (err) throw err;

        res.json(reply);
    });
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

// API TESTING ROUTE
app.get("/getuser", function(req, res){

    res.send("<form action='/user' method='POST'> <input type='text' name='uid'><input type='submit'> </form>");
});
//TODO: DELETE ROUTE 

app.post('/writeMessage', function(req, res){
    
    var post = {
        message: request.body.message,
        uid_fk: request.body.uid_fk
    }

    connection.query("INSERT INTO messages SET ?", post, function(err, result){
        if (err) throw err;

        res.json(result);
    });

});

app.post('/messages', (req, res) => {
    var uid = req.body.uid;

    connection.query('SELECT * FROM messages WHERE uid_fk = "' + uid + '"', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.delete('/deleteMessage', (req, res) =>{
    var uid = req.body.uid;
    var mid = req.body.mid;

    connection.query('DELETE FROM messages WHERE uid_fk = "' + uid + '" AND mid = "' + mid + '"', (error, result, fields) => {
        if (error) throw error;

        if (result.affectedRows){
            res.json(true);
        } else {
            res.json(false);
        }
    })
})

app.listen(6969);