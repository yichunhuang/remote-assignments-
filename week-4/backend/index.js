var express=require("express");
express.static("/");

var app=express();
app.use(express.static('public'));

var mysql = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var con = mysql.createConnection({
          host: "localhost",
          database: "assignment",
          user: "root",
          password: "123456"
        });

app.post('/sign_in', function(request, response) {
    var email = request.body.email;
    var password = request.body.password;
    if (email && password) {
        con.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            console.log(results);
            if (results.length > 0) {
                response.send('success');
            } else {
                response.send('Email and/or Password is wrong');
            }           
            response.end();
        });
    } else {
        response.send('Email and Password cannot be null');
        response.end();
    }
});

app.post('/sign_up', function(request, response) {
    var email = request.body.email;
    var password = request.body.password;
    if (email && password) {
        con.query('SELECT * FROM user WHERE email = ?', [email], function(error, results, fields) {
            console.log(results);
            if (results.length == 0) {
                  var sql = "INSERT INTO user (email, password) VALUES (?, ?)";
                  var values = [[email], [password]];
                  con.query(sql, values, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted, ID: " + result.insertId);
                  });
                response.send('success');
            } else {
                response.send('Email is taken');
            }           
            response.end();
        });
    } else {
        response.send('Email and Password cannot be null');
        response.end();
    }
});

app.listen(3000, function(){
	console.log('server running now on port 3000');
});
