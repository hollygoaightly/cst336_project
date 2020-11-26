const fetch = require('node-fetch');
const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));

// routes
app.get("/", function(req, res){
    res.render("index.html"); 
});

// app cant access browser because it runs on server side,
app.get("/api/trefle", async function(req, res){
    let apiUrl = "https://trefle.io/api/v1/plants?token=6t4ZVV4DE7bKaqSg1CDFPHq3r5giNXINF3qlk43Povk";
    let response = await fetch(apiUrl);
    let data = await response.json();
    res.send(data);
});

// database
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database name'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});