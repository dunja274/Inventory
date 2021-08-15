var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/assets"));
app.set('views', __dirname + "/assets");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

////////////////////////////////////////////

var secret = "neka-fraza";
var users = [];
var objects = [];
var state = [];
var category = [];
var ucionice = [];

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});


connection.connect(function (error) {
    if (error) {
        console.log("Error connecting to db", error);
    }
    else {
        console.log("Successfully connected to db!!!");
    }
});

var qusers = "SELECT * FROM users;";
connection.query(qusers, function (error, result, fields) {
    if (error != null) console.log("[SQL] Mysql query error", error);
    else {
        users = result;
        console.log('[SQL] Users successfully loaded!');
    }
});


var qstate = "SELECT * FROM stanje;";
connection.query(qstate, function (error, result, fields) {
    if (error != null) console.log("[SQL] Mysql query error", error);
    else {
        state = result;
        console.log('[SQL] States successfully loaded!');
    }
});

var qucionice = "SELECT * FROM ucionica;";
connection.query(qucionice, function (error, result, fields) {
    if (error != null) console.log("[SQL] Mysql query error", error);
    else {
        ucionice = result;
        console.log('[SQL] Ucionice successfully loaded!');
    }
});



var qobjects = "SELECT * FROM objekti;";
connection.query(qobjects, function (error, result, fields) {
    if (error != null) console.log("[SQL] Mysql query error", error);
    else {
        console.log('[SQL] Objects succcesfully loaded!')
        objects = result;
    }
});

var qcategory = "SELECT * FROM kategorije;";
connection.query(qcategory, function (error, result, fields) {
    if (error != null) console.log("[SQL] Mysql query error", error);
    else {
        console.log('[SQL] Cateogry succcesfully loaded!')
        category = result;
    }
});

////////////////////////////////////////////

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});

app.get("*", function (req, res) {
    res.render("index.html");
});

////////////////////////////////////////////

app.post('/auth', function (req, res) {
    var status = 401;
    var response = { "success": false };

    var user = getUser(req.body.ime, req.body.pass);
    console.log(user);
    if (user != null) {

        var token = jwt.sign(user, secret);
        console.log(user.ime + " logged");
        status = 200;
        response.success = true;
        response.userID = user.id;
        response.token = token;
        res.json(response);
    }
    else {
        res.json(response);
    }
});

app.post('/register', function (req, res) {
    console.log("Register", req.body.ime)
    var ime = req.body.ime;
    var password = req.body.pass;
    var success = false;
    if (!userExists(ime)) {
        var user = { 'ime': ime, 'password': password };
        var q = "INSERT INTO users SET ?;"
        var data =
            {
                ime: ime,
                password: password,
                admin: false
            }
        users.push(data);

        connection.query(q, [data], function (err, result) {
            if (err != null) {
                console.log("[SQL] MySQL register query Error!", err);
                status = 400;
                var status = success ? 200 : 400;
                res.status(status).json({ 'success': success });
            } else {
                status = 200;
                success = true;
                var status = success ? 200 : 400;
                res.status(status).json({ 'success': success });
            }
        });

    }
    else {
        console.log("user already exists");
        var status = success ? 200 : 400;
        res.status(status).json({ 'success': success });
    }

});

app.post('/home', function (req, res) {
    var response = { success: false };
    var status = 200;
    response.category = category;
    response.ucionice = ucionice;
    response.stanje = state;
    response.objekti = objects;
    res.status(status).json(response);
});

app.post('/new', function (req, res) {

    var success = false;
    var ime = req.body.ime;
    var ucionica = req.body.ucionica;
    var garancija = req.body.garancija;
    var datum = req.body.datum;
    var stanje = req.body.stanje;
    var kategorija = req.body.kategorija;

    var q = "INSERT INTO objekti SET ?;"
    var data =
        {
            ime: ime,
            ucionica_id: ucionica,
            garancija: garancija,
            datum_nabave: datum,
            stanje_id: stanje,
            kategorija_id: kategorija
        }
    objects.push(data);

    connection.query(q, [data], function (err, result) {
        if (err != null) {
            console.log("[SQL] MySQL query Error!", err);
            status = 400;
            var status = success ? 200 : 400;
            res.status(status).json({ 'success': success });
        } else {
            status = 200;
            success = true;
            
            
            var status = success ? 200 : 400;
            res.status(status).json({ 'success': success });
        }
    });
});

////////////////////////////////////////////


var apiRoute = express.Router();

apiRoute.use(function (req, res, next) {
    var token = req.query.token || req.headers['x-auth-token'];
    if (token) {
        jwt.verify(token, secret, function (err, payload) {
            if (err) {
                return res.status(401).json({ success: false, message: "Krivi token" });
            }
            else {
                next();
            }
        });
    }
    else {
        return res.status(401).json({ success: false, message: "Fali token" });
    }
});

apiRoute.get('/users', function (req, res) {
    res.status(200).json(users);
});

app.use('/api', apiRoute)


////////////////////////////////////////////

function getUser(ime, pass) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].ime == ime && users[i].password == pass) {
            return users[i];
        }
    }
    return null;
}

function verifyLogin(ime, pass) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].ime == ime && users[i].password == pass) return true;
    }
    return false;
}

function userExists(ime) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].ime == ime) return true;
    }
    return false;
}

function getUcionica(ucionica) {
    for (var i = 0; i < ucionice.length; i++) {
        if (ucionice[i].ucionica == ucionica) {
            return ucionice[i].id;
        }
    }
    return null;
}

function getStanje(stanje) {
    for (var i = 0; i < state.length; i++) {
        if (state[i].stanje == stanje) {
            return state[i].id;
        }
    }
    return null;
}

function getKategorija(kategorija) {
    for (var i = 0; i < category.length; i++) {
        if (category[i].kategorija == kategorija) {
            return category[i].id;
        }
    }
    return null;
}