const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = '80d3aca485217bf1b83d2e454f96e343#';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey;

    https.get(url, (response) => {
        let responseData = '';

        response.on('data', (data) => {
            responseData += data;
        });

        response.on('end', () => {
            const weatherData = JSON.parse(responseData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            res.write('<h1>The Temperature in ' + query + " is " + temp + ' degrees Celsius</h1>');
            res.write('<p>The weather condition is: ' + description + '</p>');
            res.send();
        });
    });
});

app.get('/script.js', (req, res) => {
    fs.readFile(__dirname + '/script.js', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end(data);
    });
});

// Serve CSS file with correct MIME type
app.get('/styles.css', (req, res) => {
    fs.readFile(__dirname + '/styles.css', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
