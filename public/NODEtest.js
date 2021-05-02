var mysql = require('mysql');
var express = require('express');
var app = express();
var path = require('path');
var url = require('url');
var util = require('util'); // for async calls
var cors = require('cors');
var bodyParser = require('body-parser'); // Create application/x-www-form-urlencoded parser (for POST)
app.use(cors());
'use strict';



//tsekkaa et alla on oikeet tiedot host,user,password,database
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "omega3",
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
app.post("/api/event", urlencodedParser, function (req, res) {
    console.log("body: %j", req.body);
    // get JSON-object from the http-body
    let jsonObj = req.body;
    console.log("Arvo: "+jsonObj.nickName);
    // make updates to the database
    let responseString = JSON.stringify(jsonObj)
    res.send("POST succesful: "+ responseString);
});



    app.post("/api/POSTtest", urlencodedParser, function (req, res) {
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
                await query(sql,[jsonObj.nickName]);           //insert into table post
                sql = "INSERT INTO post (comment)"
                    + " VALUES (?)";
                await query(sql,[jsonObj.comment]);


                res.send("Post successful " + req.body);
            }
            catch (err) {
                console.log("insertion into database failed!.." + err);
                console.log("Database error!"+ err);
            }
        })()
    });

//GET method for searching the database. (This search is done with using the user's id as the search value)
app.get("/api/GET", urlencodedParser, function (req, res) {
    console.log("Got a GET request for the homepage!");
    var string;

    //get JSON-object from the http-body
    var jsonObj = req.body;

    //SQL-query with user's user_id. returns all values from all tables associated with the id.
    var sql = " SELECT user.user_id, user.nickname, post.post_id, post.comment, post.user_id, time.time_id, time.date, time.timestamp, time.post_id "
    + " FROM user "
    + " INNER JOIN post ON user.user_id = post.user_id "
    + " INNER JOIN time ON time.post_id = post.post_id "
    + " WHERE user.user_id = ? ";

    (async () => {
        try {
            const rows = await query(sql,[jsonObj.user_id]);
            string = JSON.stringify(rows);
            var alteredResult = '{"resultInJson":'+string+'}';
            console.log(rows);
            res.send(alteredResult);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
        finally {//conn.end();
        }
    })()
});

//GET method for searching the database.
app.get("/api/getallposts", urlencodedParser, function (req, res) {
    console.log("Got a GET request for the homepage!");
    var string;
    console.log("getallposts1:");

    //SQL-query with user's user_id. returns all values from all tables associated with the id.
    var sql = " SELECT user.user_id, user.nickname, post.post_id, post.comment, post.user_id, time.time_id, time.date, time.timestamp, time.post_id "
        + " FROM user "
        + " INNER JOIN post ON user.user_id = post.user_id "
        + " INNER JOIN time ON time.post_id = post.post_id ";




    (async () => {
        try {
            const rows = await query(sql);
            string = JSON.stringify(rows);
            console.log(string);
            res.send(string);
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
        finally {//conn.end();
        }
    })()
});

function contains(arr, key, val) {

    for (let i = 0; i < arr.length; i++) {
        if(arr[i][key] === val) return true;
    }
    return false;
}

app.post("/api/register", urlencodedParser, function (req, res) {
    console.log("Registering");
    console.log("body: %j", req.body);

    var jsonObj = req.body;
    console.log("Arvo: " + jsonObj.nickname + " " + jsonObj.password);


    (async () => {
        try {
            let check;
            let sql = "SELECT * FROM user";
            let userdb = JSON.stringify(await query(sql));
            if (userdb.includes(JSON.stringify(jsonObj.nickname))) {
                check = false;
            } else {
                check = true;
            }

            if(check)   {
                sql = "INSERT INTO user (nickname, password)"
                    + " VALUES (?, ?)";
                await query(sql,[jsonObj.nickname, jsonObj.password]);
                console.log("registration success");
                res.status(200).send({message: "registersuccess"});
            } else  {
                console.log("registration fail");
                res.status(200).send({message: "registerfail"});
            }


        }
        catch (err) {
            console.log("registration error.." + err);
        }
    })()
});





//POST method for adding values into database. all tables in use (user,post,time)
app.post("/api/login", urlencodedParser, function (req, res) {
    console.log("Logging in");
    console.log("body: %j", req.body);

    //get JSON-object from the http-body
    let nickname = JSON.stringify(req.body.nickname);
    let password = JSON.stringify(req.body.password);
    console.log("Arvo: " + nickname + " " + password);


    (async () => {
        try {
            //insert into table user
            var sql = "SELECT * FROM user";
            let userdb = JSON.stringify(await query(sql));
            if (userdb.includes(nickname) && userdb.includes(password)) {
                res.status(200).send({message: "loginsuccess"});
                console.log("login success");
            } else {
                res.status(200).send({message: "loginfail"});
                console.log("login fail");
            }
        }
        catch (err) {
            console.log("login error.." + err);
        }
    })()
});





//POST method for adding values into database. all tables in use (user,post,time)
app.post("/api/POST", urlencodedParser, function (req, res) {
    console.log("Got a POST request for the homepage");
    console.log("body: %j", req.body);

    //get JSON-object from the http-body
    var jsonObj = req.body;
    console.log("Arvo: " + jsonObj.nickname + " " + jsonObj.date + " " + jsonObj.comment + " " + jsonObj.timeStamp + " " +jsonObj.counter);


    (async () => {
        try {
            let sql;
            console.log("nickname on " + jsonObj.nickname)


            sql = " SELECT user.user_id FROM user WHERE nickname = ? ORDER BY user.user_id DESC LIMIT 1";
            let userid = await query(sql,[jsonObj.nickname]);
            userid = JSON.stringify(userid);
            userid = userid.split(':').pop().replace(/[^0-9]/g,'');

            //insert into table post
            sql = "INSERT INTO post (comment, user_id)"
                + " VALUES (?,?)";
            await query(sql,[jsonObj.comment, userid]);
            res.send(req.body);

            sql = " SELECT post.post_id FROM post ORDER BY post_id DESC LIMIT 1";
            let postid = await query(sql);
            postid = JSON.stringify(postid);
            postid = postid.split(':').pop().replace(/[^0-9]/g,'');


            //insert into table time
            sql = "INSERT INTO time (date, timestamp, post_id)"
                + " VALUES (?,?,?)";
            await query(sql,[jsonObj.date, jsonObj.timeStamp, postid]);
            console.log("post test3 " + req.body)
            res.send(req.body);
        }
        catch (err) {
            console.log("insertion into database failed!.." + err);
            console.log("Database error!"+ err);
        }
    })()
});



//method for deleting a user from database and all associated posts
//deletion is done from all three tables (user,post,time)
app.post("/api/DELETE", urlencodedParser, function (req, res) {
    console.log("Got a DELETE request for the homepage");
    console.log("body: %j", req.body);

    //get JSON-object from the http-body
    var jsonObj = req.body;
    console.log("Arvo: " + jsonObj.id_value);


    (async () => {
        try {

            //below deleting from all three tables
            //delete from table user, post, time
            sql = "DELETE FROM time"
                + " WHERE time.post_id = ? "
            await query(sql,[jsonObj.id_value]);

            sql = "DELETE FROM post"
                + " WHERE post.user_id = ? "
            await query(sql,[jsonObj.id_value]);

            var sql = "DELETE FROM user"
                + " WHERE user_id = ? "
            await query(sql,[jsonObj.id_value]);

            res.send("deleting successful " + req.body);
        }
        catch (err) {
            console.log("deleting from database failed!.." + err);
            console.log("Database error!"+ err);
        }
    })()
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})