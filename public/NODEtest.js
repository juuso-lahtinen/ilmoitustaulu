var mysql = require('mysql');
var express = require('express');
var app = express();
var path = require('path');
var url = require('url');
var util = require('util'); // for async calls
var cors = require('cors');
var bodyParser = require('body-parser'); // Create application/x-www-form-urlencoded parser (for POST)
app.use(cors());

//tsekkaa et alla on oikeet tiedot host,user,password,database
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

// node native promisify
const query = util.promisify(conn.query).bind(conn);

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON

//access in browser with; http://localhost:8081/commentPage
app.get('/commentPage', function (req,res) {
    res.sendFile(path.join(__dirname+'/HTMLtest.html'));
});

//POST method for testing database commands in Postman
app.post("/api/testingPost", urlencodedParser, function (req, res) {
    console.log("body: %j", req.body);
    // get JSON-object from the http-body
    let jsonObj = req.body;
    console.log("Arvo: "+jsonObj.nickName);
    // make updates to the database
    let responseString = JSON.stringify(jsonObj)
    res.send("POST succesful: "+ responseString);
});


//POST method for adding values into database. all tables in use (user,post,time)
app.post("/api/POST", urlencodedParser, function (req, res) {
    console.log("Got a POST request for the homepage");
    console.log("body: %j", req.body);

    //get JSON-object from the http-body
    var jsonObj = req.body;
    console.log("Arvo: " + jsonObj.nickName + " " + jsonObj.date + " " + jsonObj.comment + " " + jsonObj.timeStamp + " " +jsonObj.counter);


    (async () => {
        try {
            //insert into table user
            var sql = "INSERT INTO user (nickname)"
                + " VALUES (?)";
            await query(sql,[jsonObj.nickName]);

            //get the counter value for user_id
            var insertId = req.body.counter;
            //insert into table post
            sql = "INSERT INTO post (comment, user_id)"
                + " VALUES (?,?)";
            await query(sql,[jsonObj.comment, insertId]);

            //counter value for post_id
            insertId = req.body.counter;
            //insert into table time
            sql = "INSERT INTO time (date, timestamp, post_id)"
                + " VALUES (?,?,?)";
            await query(sql,[jsonObj.date, jsonObj.timeStamp, insertId]);

            res.send("Post successful " + req.body);
        }
        catch (err) {
            console.log("insertion into database failed!.." + err);
            console.log("Database error!"+ err);
        }
    })()
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})