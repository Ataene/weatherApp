const express = require("express");
const https = require("https");
// Body Parser Required for communcations
const bodyParser = require("body-parser");


const app = express();
// Body Parser in action
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
});

// Function executed from the app to post to the user on request.
app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "0dd2a3bc0629f3f7e5ea16391f097fb5";
    const unit = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

    https.get(url, function(response){

    console.log(response.statusCode);

    response.on("data", function(data){

      const weatherD = JSON.parse(data);

      const temp = Math.round(weatherD.main.temp);

      const tempFeel = weatherD.weather[0].description;

      const feelsLike = Math.round(weatherD.main.feels_like);

    //   const icon = weatherD.weather[0].icon;
    //   const imageURL = "http://openweathermap.org/img/w/" + icon + ".png";

      res.write("The temperature in " + query + " is " + temp + "C" + " and it currently " + tempFeel + "it feels like " + feelsLike);
    
      res.send();
    });

    });
})


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});