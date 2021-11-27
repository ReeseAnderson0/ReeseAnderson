var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.Port || 8080

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());

// routes
app.post("/Doge", (dogeReq, response) => {
    console.log('you posted: \n');
    console.log(dogeReq.body);
    const fs = require('fs');
    let data = JSON.stringify(dogeReq.body);
    fs.writeFileSync('School/dogeJSON.json', data);
});

app.get("/", function(req, res) {
    res.render("index")
})

app.listen(port, function() {
    console.log("Online");
})
