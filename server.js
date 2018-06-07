const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const api = require('./src/apiWeather');
const app = express();

let cities;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function( req, res){
    res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let state = req.body.state;
    let cities = api.cityInfo(city, state).then(response =>{
        let temperature = response.data.temperature;
        let condition = response.data.condition;
        let icon = response.data.icon;
        let weatherText = `${response.name},  ${state} 
        Temperatura: ${temperature}º 
        Condição: ${condition}`;
        res.render('index', {weather: weatherText, error: null});
    });

});

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server Start !!!')
});