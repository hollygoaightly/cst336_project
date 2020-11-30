const fetch = require('node-fetch');
const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
//root
app.get("/", async (req, res) => {
	res.render("home", {
		"isHomeCurrent":"id=currentPage",
		"isYPCurrent":"",
		"isPTCurrent":"",
		"isSICurrent":"",
		"isRegCurrent":""
	}); //render
}); //root

//yourPlants
app.get("/yourplants", async (req, res) => {
	res.render("yourPlants", {
		"isHomeCurrent":"",
		"isYPCurrent":"id=currentPage",
		"isPTCurrent":"",
		"isSICurrent":"",
		"isRegCurrent":""
	}); //render
}); //yourPlants

//plantTalk
app.get("/plantTalk", async (req, res) => {
	res.render("plantTalk", {
		"isHomeCurrent":"",
		"isYPCurrent":"",
		"isPTCurrent":"id=currentPage",
		"isSICurrent":"",
		"isRegCurrent":""
	}); //render
}); //plantTalk

//signIn
app.get("/signIn", async (req, res) => {
	res.render("signIn", {
		"isHomeCurrent":"",
		"isYPCurrent":"",
		"isPTCurrent":"",
		"isSICurrent":"id=currentPage",
		"isRegCurrent":""
	}); //render
}); //signIn

//register
app.get("/register", async (req, res) => {
	res.render("register", {
		"isHomeCurrent":"",
		"isYPCurrent":"",
		"isPTCurrent":"",
		"isSICurrent":"",
		"isRegCurrent":"id=currentPage"
	}); //render
}); //register

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

app.get("/search", async function(req, res){
    let keyword = "";
    if (req.query.keyword){
        keyword = req.query.keyword;
        let apiUrl = `https://trefle.io/api/v1/plants/search?token=6t4ZVV4DE7bKaqSg1CDFPHq3r5giNXINF3qlk43Povk&q=${keyword}`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        data = data.data;
        let imageUrlArray = [];
        let commonNameArray = [];
        let scienceNameArray = [];
        for(let i = 0; i < data.length; i++)
        {
            imageUrlArray.push(data[i].image_url);
            commonNameArray.push(data[i].common_name);
            scienceNameArray.push(data[i].scientific_name);
        }
        res.render("results", {"imageUrlArray":imageUrlArray, "commonNameArray":commonNameArray, "scienceNameArray":scienceNameArray});
    }
});

// database
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'r1bsyfx4gbowdsis.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'qc0w3lq0xdqs5ny3',
    password: 'ea3ex48nw4hd4v3q',
    database: 'sn1qvahom0zodcij'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});