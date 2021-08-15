var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/www"));

////////////////////////////////////////////

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});

app.get("*", function (req, res) {
    res.render("index.html");
});

////////////////////////////////////////////