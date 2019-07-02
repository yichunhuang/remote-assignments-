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
    // console.log(email);
    // console.log(password);
    if (email && password) {
        var con = mysql.createConnection({
          host: "localhost",
          database: "assignment",
          user: "root",
          password: "123456"
        });
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
    // console.log(email);
    // console.log(password);
    if (email && password) {
        var con = mysql.createConnection({
          host: "localhost",
          database: "assignment",
          user: "root",
          password: "123456"
        });
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

// var cookieParser = require('cookie-parser')
// app.use(cookieParser())
// var urlencodedParser = bodyParser.urlencoded({ extended: true });

// app.get("/", function(req, res){
// 	res.send("Hello <b>World</b>");
// });

// app.get('/getData', function(req, res) {
// 	var data = req.query.number;
// 	var positive_reg   = /^[0-9]*[1-9][0-9]*$/;
// 	if (data == null)
// 		data = "Lack of Parameter";
// 	else if (positive_reg.test(data))
// 		data = ((parseInt(data) + 1) * parseInt(data) / 2).toString();
// 	else
// 		data = "Wrong Patameter";
//     res.send(data);
// });

// app.post("/getData", (req, res) => {
// 	var data = req.body.number;
// 	var positive_reg   = /^[0-9]*[1-9][0-9]*$/;
// 	if (data == null)
// 		data = "Lack of Parameter";
// 	else if (positive_reg.test(data))
// 		data = ((parseInt(data) + 1) * parseInt(data) / 2).toString();
// 	else
// 		data = "Wrong Patameter";
//     res.send(data);
// });

// app.get('/clearCookie', function(req, res){
//     res.clearCookie("username");
//     return res.redirect('/myName');
// });

// app.get('/trackName', function(req, res){
//     // setting cookies
//     res.cookie('username', req.query.name, { maxAge: 900000, httpOnly: true });
//     return res.redirect('/myName');
// });

// app.get('/myName', function(req, res) {
//     var username = req.cookies['username'];
//     if (username) {
//         return res.send(username);        
//     }

//     var html='';
//     html +="<body>";
//     html += "<form action='/trackName'  method='get' name='form1'>";
//     html += "Name:</p><input type= 'text' name='name'>";
//     html += "<input type='submit' value='submit'>";
//     html += "<INPUT type='reset'  value='reset'>";
//     html += "</form>";
//     html += "</body>";
//     res.send(html);
// });
 
app.listen(3000, function(){
	console.log('server running now on port 3000');
});
