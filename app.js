var express = require("express");
var bodyParser = require("body-parser");
const cors = require('cors')
var fs = require("fs");
const path = require('path');
 
var app = express();
var jsonParser = bodyParser.json();
const port = process.env.PORT || 8081;

const corsConfig = function(req, res, next) {
    var allowedOrigins = ['http://localhost:8080', 'https://simple-bank-form.herokuapp.com'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

app.use(corsConfig);
 
//app.use(express.static(__dirname + "/public"));
// получение списка транзакций
app.get("/transactions-data", function(req, res){
    var content = fs.readFileSync("transaction-data.json", "utf8");
    var questionData = JSON.parse(content);
    res.send(questionData);
});

// добавление транзакции к списку транзакций
app.post("/transactions-data/add-transaction", jsonParser, function (req, res) {
    // нужно записывать в конец файла, а не читать полностью и полностью переписывать, а в идеале вобще должна быть база данных
    // но пока что сделаем такой костыль
    if(!req.body) return res.sendStatus(400);
    var content = fs.readFileSync("transaction-data.json", "utf8");
    var data = JSON.parse(content);
    var id = 1;
    if (data[data.length - 1] && data[data.length - 1].id) {
        id = data[data.length - 1].id + 1;
    }
    req.body.paymentSumm += ' руб.';
    req.body.id = id;
    data[data.length] = req.body;

    // перезаписываем файл с новыми данными
    fs.writeFileSync("transaction-data.json", JSON.stringify(data));
    res.send(data);
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/dist')));
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
    });
}
  
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});