var dogeContainer = document.getElementById("dogeResults");
var btn = document.getElementById("dogeBTN");

btn.addEventListener("click", function() {
    var Request = new XMLHttpRequest();
    Request.open('GET', 'https://api.cryptonator.com/api/ticker/doge-CAD');
    Request.onload = function() {
        var dogeData = Request.responseText;
        createJSON(dogeData);
    }
    Request.send();
});

function createJSON(data) {
    const dogeArr = JSON.parse(data);

    var Doge = new Object();
    Doge.base = dogeArr["ticker"]["base"];
    Doge.base = dogeArr["ticker"]["target"];
    Doge.base = dogeArr["ticker"]["CAD"];
    Doge.base = dogeArr["ticker"]["price"];
    Doge.base = dogeArr["ticker"]["change"];

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "jsonWriter.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    var str_json = "json_string=" + (JSON.stringify(Doge))
    xhr.send(str_json);


}