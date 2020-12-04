const fetch = require('node-fetch');
const express = require("express");
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

const validator = require('./public/js/validator.js');
const connection = require('./dbPool.js')

app.use(session({
  secret: 'aloe vera',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 20 * 60 * 1000 } // cookie life in milliseconds = 20 minutes here
}));

let plantData = new Map();


// DECLARING CUSTOM MIDDLEWARE
const ifNotLoggedin = (req, res, next) => {
    if(!req.session.logged_in){
        return res.redirect('/signIn');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.logged_in){
        return res.redirect('/');
    }
    next();
}
// END OF CUSTOM MIDDLEWARE

//routes
//root
app.get("/", async (req, res) => {
	res.render("home"); //render
}); //root

app.get("/api/insertPlant", function(req, res){
  let sql = "INSERT INTO `Plant` (TrefleId, Common_Name, Family, Genus, Image_Url) VALUES (?,?,?,?,?)";
  let sqlParams = [req.query.id, req.query.common_name, req.query.family, req.query.genus, req.query.image_url];
  connection.query(sql, sqlParams, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows.affectedRows.toString() + " inserted");
  });
});

//yourPlants : requires login
app.get("/yourplants", ifNotLoggedin, (req,res,next) => {
    connection.query("SELECT `FirstName` FROM `Login` WHERE `LoginId`= ?",
    [req.session.login_id], ( err, rows ) => {
    if (err) throw err;
	res.render("yourPlants", {name: rows[0].FirstName}); //render
    }); // connection query : get firstname from db
}); //yourPlants

//plantTalk
app.get("/plantTalk", async (req, res) => {
	res.render("plantTalk"); //render
}); //plantTalk

//signIn
app.get("/signIn", async (req, res) => {
	res.render("signIn"); //render
}); //signIn

app.post("/signIn", function(req, res) {
    
  let login = req.body.login;
  let password = req.body.password;

  if (!validator.lengthValid(login, 5, 200) || !validator.lengthValid(password, 8, 20)) {
    res.render('signIn', {error: 'login or pass invalid'});
  } else {
    connection.query("SELECT * FROM `Login` WHERE `LoginName` = ?", login, (error, result) => {
      if (error) throw error;
      if (result.length === 0) {
        res.render('signIn', {error: 'No such user'});
      } else {
        let user = result[0];
        bcrypt.compare(password, user['HashedPwd'], (error, result) => {
          if (error) throw error;
          if (result) {
            req.session.name = user['LoginName'];
            req.session.login_id = user['LoginId'];
            req.session.logged_in = true;
            res.redirect('/');
          } else {
            res.render('signIn', {error: 'Wrong password'});
          }
        })
      }
    });
  }
});

//register
app.get("/register", async (req, res) => {
	res.render("register"); //render
}); //register

app.post('/register', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let re_password = req.body.re_password;
  let login = req.body.login;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let gender = req.body.gender;
  let zip = req.body.zip;
  console.log(req.body);

  // an field is missing
  if (!validator.lengthValid(login, 5, 200) || !validator.lengthValid(password, 8, 20))
  {
    res.render('register', {error: 'Invalid login or password length'});
  } else if (!validator.lengthValid(email, 5, 200)) {
    res.render('register', {error: 'Invalid email length'});
  } else if (!validator.isEmail(email)) { // Wrong format
    res.render('register', {error: 'Wrong email format'});
  } else if (!validator.alphabetOnly(login)) {
    res.render('register', {error: 'Only alphanumeric logins allowed'});
  } else if (password !== re_password) {
    res.render('register', {error: 'Passwords do not match'});
  } else {
        // Check if email exists
        connection.query("SELECT * FROM Login WHERE Email=?", [email], function (error, result) {
            if (error) throw error;
            if (result.length > 0) { res.render('register', {error: 'This email already exists'}); }
            else {
              bcrypt.genSalt(10, function(error, salt) {
                if (error) throw error;
                bcrypt.hash(password, salt, function(error, hash) {
                  if (error) throw error;
                  connection.query("INSERT INTO Login (LoginName, HashedPwd, Email, FirstName, LastName, Gender, ZipCode) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  [login, hash, email, fname, lname, gender, zip], function(error, result) {
                  res.render('register', {message: `You have been registered, try logging in`});
                  });
                });
              });
            } });
  }
});

//api testing page
app.get("/test", function(req, res){
    res.render("index.html"); 
});//api testing page

/* old proof of concept code
app.get("/api/trefle", async function(req, res){
    let apiUrl = 'https://trefle.io/api/v1/plants?token=6t4ZVV4DE7bKaqSg1CDFPHq3r5giNXINF3qlk43Povk';
    let response = await fetch(apiUrl);
    let data = await response.json();
    res.send(data);
});
*/

app.get("/search", async (req, res) => {
    plantData.clear();
    let keyword = "";
    if (req.query.keyword){
        keyword = req.query.keyword;
        let apiUrl = `https://trefle.io/api/v1/plants/search?token=6t4ZVV4DE7bKaqSg1CDFPHq3r5giNXINF3qlk43Povk&q=${keyword}`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        data = data.data;
        let idArray = [];
        let imageUrlArray = [];
        let commonNameArray = [];
        let scienceNameArray = [];
        let genusArray = [];
        for(let i = 0; i < data.length; i++)
        {
            idArray.push(data[i].id);
            imageUrlArray.push(data[i].image_url);
            commonNameArray.push(data[i].common_name);
            scienceNameArray.push(data[i].scientific_name);
            genusArray.push(data[i].genus);
            
            // for database
            var plantObj = {
            	id: data[i].id,
            	common_name: data[i].common_name,
            	family: data[i].family,
            	genus: data[i].genus,
            	image_url: data[i].image_url
            };
            
            plantData.set(data[i].id, plantObj);
        }
        res.render("results", {"idArray":idArray, "imageUrlArray":imageUrlArray, "commonNameArray":commonNameArray, "scienceNameArray":scienceNameArray, "genusArray":genusArray});
    }
});

// starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});