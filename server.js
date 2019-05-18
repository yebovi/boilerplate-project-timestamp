// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/timestamp/:date",function(req,res){
 var givenDate=req.params.date;
var parsedDate= parseDate(givenDate);
  if(parsedDate){
    var unixTime= parsedDate.getTime();
    res.send({'unix':unixTime,'utc':parsedDate.toUTCString()})
  }
  else{res.send({'unix':null,'utc':"Invalid Date"})}
  res.end();
})

app.get("/api/timestamp/",function(req,res){
  var utcDate=new Date();
res.json({unix:utcDate.getTime(),utc:utcDate.toUTCString()})
})

function parseDate(dateStr){
  if(!isNaN(dateStr)){
  return new Date(parseInt(dateStr)) 
   }
else{
var millis=Date.parse(dateStr);
  if(isNaN(millis)){
     return false}
  else{
  return new Date(millis)
  }
}  
  
}



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
